import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetDummyTicket } from '../hooks/useGetDummyTicket';
import { useDeleteDummyTicket } from '../hooks/useDeleteDummyTicket';
import { useRefundDummyTicket } from '../hooks/useRefundDummyTicket';
import { useUpdateDummyTicket } from '../hooks/useUpdateDummyTicket';
import { convertToDubaiTime } from '../../../utils/timeFunctions';
import { convertToDubaiDate } from '../../../utils/dateFunctions';
import { extractIataCode } from '../../../utils/extractIataCode';
import { format } from 'date-fns';
import { capitalCase } from 'change-case';
import { confirmAlert } from 'react-confirm-alert';
import { MdWhatsapp } from 'react-icons/md';
import { Check, Pencil, Trash, Undo } from 'lucide-react';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Loading from '../../../components/Loading';
import ActionButtons from '../../../components/ActionButtons';
import toast from 'react-hot-toast';
import { useAuth } from '../../../context/AuthContext';

export default function DummyTicketDetail() {
  const { sessionId } = useParams();
  const { dummyTicket, isLoadingDummyTicket } = useGetDummyTicket(sessionId);
  const { deleteDummyTicket, isDeleting } = useDeleteDummyTicket();
  const { refundDummyTicket, isRefunding } = useRefundDummyTicket();
  const { updateDummyTicket, isUpdating } = useUpdateDummyTicket();
  const [activeTab, setActiveTab] = useState('information');
  const { isAdmin } = useAuth();

  if (isLoadingDummyTicket) return <Loading />;

  function handleShareWhatsApp() {
    if (!dummyTicket) return;

    const fromCode = extractIataCode(dummyTicket?.from);
    const toCode = extractIataCode(dummyTicket?.to);
    const fromText = `${dummyTicket?.from || ''} (${fromCode || '-'})`.trim();
    const toText = `${dummyTicket?.to || ''} (${toCode || '-'})`.trim();
    const departureDate = dummyTicket?.departureDate ? format(new Date(dummyTicket.departureDate), 'dd MMM yyyy') : '-';
    const returnDate =
      dummyTicket?.type?.toLowerCase() === 'return' && dummyTicket?.returnDate
        ? format(new Date(dummyTicket.returnDate), 'dd MMM yyyy')
        : null;

    const depFlight = dummyTicket?.flightDetails?.departureFlight?.segments?.[0];
    const retFlight = dummyTicket?.flightDetails?.returnFlight?.segments?.[0];
    const depFlightText = depFlight ? `${depFlight.carrierCode || ''} ${depFlight.flightNumber || ''}`.trim() : '-';
    const retFlightText =
      dummyTicket?.type?.toLowerCase() === 'return' && retFlight
        ? `${retFlight.carrierCode || ''} ${retFlight.flightNumber || ''}`.trim()
        : null;

    const deliveryText = dummyTicket?.ticketDelivery?.immediate
      ? 'Immediate'
      : dummyTicket?.ticketDelivery?.deliveryDate
        ? format(new Date(dummyTicket.ticketDelivery.deliveryDate), 'dd MMM yyyy')
        : '-';

    const phone =
      dummyTicket?.phoneNumber?.code && dummyTicket?.phoneNumber?.digits
        ? `${dummyTicket.phoneNumber.code}-${dummyTicket.phoneNumber.digits}`
        : '-';

    const passengerLines = dummyTicket?.passengers?.length
      ? dummyTicket.passengers.map((p, i) => `${i + 1}. ${p.title || ''} ${p.firstName || ''} ${p.lastName || ''}`.trim())
      : ['-'];

    const messageLines = [
      `From: ${fromText}`,
      `To: ${toText}`,
      `Departure: ${departureDate}`,
      ...(returnDate ? [`Return: ${returnDate}`] : []),
      '',
      `Departure Flight: ${depFlightText}`,
      ...(retFlightText ? [`Return Flight: ${retFlightText}`] : []),
      '',
      'Passengers:',
      ...passengerLines,
      '',
      `Ticket Validity: ${dummyTicket?.ticketValidity || '-'}`,
      `Ticket Delivery: ${deliveryText}`,
      '',
      `Email: ${dummyTicket?.email || '-'}`,
      `Mobile: ${phone}`,
    ];

    if (dummyTicket?.message) {
      messageLines.push('', `Message: *${dummyTicket.message}*`);
    }

    const text = messageLines.join('\n');
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <div>
          <Breadcrumb
            paths={[
              { label: 'Home', href: '/' },
              { label: 'Dummy Tickets', href: '/dummy-tickets' },
              { label: capitalCase(dummyTicket?.leadPassenger), href: `/dummy-tickets/${sessionId}` },
            ]}
          />
          <PageHeading>{capitalCase(dummyTicket?.leadPassenger)}</PageHeading>
        </div>

        <ActionButtons
          actions={[
            ...(dummyTicket?.orderStatus !== 'DELIVERED'
              ? [
                  {
                    text: 'Mark as done',
                    icon: Check,
                    loading: isDeleting || isRefunding || isUpdating,
                    onClick: () => updateDummyTicket({ sessionId, orderStatus: 'DELIVERED' }),
                  },
                ]
              : []),
            ...(dummyTicket?.orderStatus !== 'PROGRESS'
              ? [
                  {
                    text: 'Mark as progress',
                    icon: Pencil,
                    loading: isDeleting || isRefunding || isUpdating,
                    onClick: () => updateDummyTicket({ sessionId, orderStatus: 'PROGRESS' }),
                  },
                ]
              : []),
            ...(dummyTicket?.orderStatus !== 'PENDING'
              ? [
                  {
                    text: 'Mark as pending',
                    icon: Pencil,
                    loading: isDeleting || isRefunding || isUpdating,
                    onClick: () => updateDummyTicket({ sessionId, orderStatus: 'PENDING' }),
                  },
                ]
              : []),
            { text: 'Edit', icon: Pencil, loading: isDeleting || isRefunding || isUpdating, onClick: () => {} },
            {
              text: 'Share on WhatsApp',
              icon: MdWhatsapp,
              loading: isDeleting || isRefunding || isUpdating,
              onClick: handleShareWhatsApp,
            },
            ...(isAdmin
              ? [
                  {
                    text: 'Delete',
                    icon: Trash,
                    loading: isDeleting || isRefunding || isUpdating,
                    disabled: dummyTicket?.paymentStatus === 'PAID',
                    onClick: () => {
                      confirmAlert({
                        title: 'Confirm to delete',
                        message: 'Are you sure you want to delete this record?',
                        buttons: [
                          {
                            label: 'Delete',
                            onClick: () => deleteDummyTicket(sessionId),
                          },
                          {
                            label: 'Cancel',
                            onClick: () => toast.error('Delete cancelled'),
                          },
                        ],
                      });
                    },
                  },
                  {
                    text: 'Refund',
                    icon: Undo,
                    loading: isDeleting || isRefunding || isUpdating,
                    disabled: dummyTicket?.paymentStatus !== 'PAID' || !dummyTicket?.transactionId,
                    onClick: () => refundDummyTicket(dummyTicket?.transactionId),
                  },
                ]
              : []),
          ]}
        />
      </div>

      <div className="flex items-center gap-3">
        {[
          { label: 'Information', value: 'information' },
          { label: 'Trip', value: 'trip' },
          { label: 'Passengers', value: 'passengers' },
        ].map((item) => (
          <button
            key={item.value}
            className={`font-light text-[12px] px-4 py-2 shadow-sm rounded-md duration-200 cursor-pointer ${
              activeTab === item.value ? 'bg-primary-500 text-white' : 'bg-white hover:bg-primary-50'
            }`}
            onClick={() => setActiveTab(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {activeTab === 'information' && <BasicInfo dummyTicket={dummyTicket} isAdmin={isAdmin} />}
      {activeTab === 'trip' && <TripDetails dummyTicket={dummyTicket} />}
      {activeTab === 'passengers' && <Passengers dummyTicket={dummyTicket} />}
    </div>
  );
}

function BasicInfo({ dummyTicket, isAdmin }) {
  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-sm grid grid-cols-3 gap-x-6 gap-y-6 mt-6 text-sm">
      <Info
        label="Submitted"
        value={`${convertToDubaiDate(dummyTicket?.createdAt)} ${convertToDubaiTime(dummyTicket?.createdAt)}`}
      />
      <Info label="Lead Passenger" value={dummyTicket?.leadPassenger} />
      <Info label="Email" value={dummyTicket?.email} />
      <Info label="Phone" value={`${dummyTicket?.phoneNumber?.code}-${dummyTicket?.phoneNumber?.digits}`} />
      <Info label="Type" value={`${dummyTicket?.type} Flight`} />
      <Info label="Ticket Validity" value={dummyTicket?.ticketValidity} />
      <Info label="Order Status" value={dummyTicket?.orderStatus} />
      <Info label="Payment" value={dummyTicket?.paymentStatus} />
      {isAdmin && dummyTicket?.amountPaid && (
        <Info label="Amount" value={`${dummyTicket?.amountPaid?.currency} ${dummyTicket?.amountPaid?.amount}`} />
      )}
      <Info label="Handled By" value={dummyTicket?.handledBy?.name || '-'} />
      {dummyTicket?.message && <Info label="Message" value={dummyTicket?.message} />}
    </div>
  );
}

function TripDetails({ dummyTicket }) {
  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-sm mt-4 text-sm">
      <div className="grid grid-cols-3 gap-x-6 gap-y-6 mt-2">
        <Info label="From" value={dummyTicket?.from} />
        <Info label="To" value={dummyTicket?.to} />
        <Info label="Departure" value={format(new Date(dummyTicket?.departureDate), 'dd MMM yyyy')} />
        {dummyTicket?.type?.toLowerCase() === 'return' && (
          <Info label="Return" value={format(new Date(dummyTicket?.returnDate), 'dd MMM yyyy')} />
        )}
        <Info
          label="Departure Flight"
          value={`${dummyTicket?.flightDetails?.departureFlight?.segments[0]?.carrierCode} ${dummyTicket?.flightDetails?.departureFlight?.segments[0]?.flightNumber}`}
        />
        {dummyTicket?.type?.toLowerCase() === 'return' && (
          <Info
            label="Return Flight"
            value={`${dummyTicket?.flightDetails?.returnFlight?.segments[0]?.carrierCode} ${dummyTicket?.flightDetails?.returnFlight?.segments[0]?.flightNumber}`}
          />
        )}
      </div>
    </div>
  );
}

function Passengers({ dummyTicket }) {
  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-sm mt-4 text-sm">
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 mt-2">
        {dummyTicket?.passengers?.map((p, i) => (
          <Info
            key={i}
            label={`Passenger ${i + 1}`}
            value={`${p.title} ${capitalCase(p.firstName)} / ${capitalCase(p.lastName)}`}
          />
        ))}
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="font-extralight text-sm text-gray-500">{label}</span>
      <span className="font-light text-lg truncate">{value || '-'}</span>
    </div>
  );
}
