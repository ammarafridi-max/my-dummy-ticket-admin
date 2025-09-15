import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetDummyTicket } from './useGetDummyTicket';
import { useDeleteDummyTicket } from './useDeleteDummyTicket';
import { convertToDubaiTime } from '../../utils/timeFunctions';
import { convertToDubaiDate } from '../../utils/dateFunctions';
import { useJwtData } from '../../services/jwt';
import { format } from 'date-fns';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeading from '../../components/PageHeading';
import Label from '../../components/FormElements/Label';
import Input from '../../components/FormElements/Input';
import SectionHeading from '../../components/SectionHeading';
import Loading from '../../components/Loading';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import DeleteButton from '../../components/Buttons/DeleteButton';

function FormRow({ children }) {
  return (
    <div className="grid grid-cols-[4fr_8fr] items-center">{children}</div>
  );
}

export default function DummyTicketDetail({}) {
  const { sessionId } = useParams();
  const { dummyTicket, isLoadingDummyTicket } = useGetDummyTicket(sessionId);

  if (isLoadingDummyTicket) return <Loading />;

  return (
    <div>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Dummy Tickets', href: '/dummy-tickets' },
          {
            label: `${dummyTicket?.leadPassenger}`,
            href: `/dummy-tickets/${sessionId}`,
          },
        ]}
      />
      <PageHeading>{dummyTicket?.leadPassenger}</PageHeading>
      <BasicInfo dummyTicket={dummyTicket} />
      <TripDetails dummyTicket={dummyTicket} />
      <Passengers dummyTicket={dummyTicket} />
      <Actions dummyTicket={dummyTicket} />
    </div>
  );
}

function BasicInfo({ dummyTicket }) {
  const jwtData = useJwtData();
  return (
    <div className="bg-white px-10 py-6 rounded-lg shadow-md grid grid-cols-2 gap-x-10 gap-y-4 mt-10">
      <FormRow>
        <Label>Submission</Label>
        <Input
          value={`${convertToDubaiTime(dummyTicket?.createdAt)} ${convertToDubaiDate(dummyTicket?.createdAt, 'long')}`}
          disabled={true}
        />
      </FormRow>
      <FormRow>
        <Label>Delivery Date</Label>
        <Input
          value={
            dummyTicket?.ticketDelivery?.immediate
              ? 'Immediate'
              : format(
                  dummyTicket?.ticketDelivery?.deliveryDate,
                  'dd MMMM yyyy'
                )
          }
          disabled={true}
        />
      </FormRow>
      <FormRow>
        <Label>Type</Label>
        <Input
          value={`${dummyTicket?.type} Flight Reservation`}
          disabled={true}
        />
      </FormRow>
      <FormRow>
        <Label>Ticket Validity</Label>
        <Input value={dummyTicket?.ticketValidity} disabled={true} />
      </FormRow>
      <FormRow>
        <Label>Payment Status</Label>
        <Input
          value={dummyTicket?.paymentStatus === 'PAID' ? 'Paid' : 'Unpaid'}
          disabled={true}
        />
      </FormRow>
      {dummyTicket?.paymentStatus === 'PAID' &&
      jwtData?.role?.toLowerCase() === 'admin' ? (
        <FormRow>
          <Label>Amount Paid</Label>
          <Input
            value={`${dummyTicket?.amountPaid?.currency} ${dummyTicket?.amountPaid?.amount}`}
            disabled={true}
          />
        </FormRow>
      ) : (
        <FormRow></FormRow>
      )}
      <FormRow>
        <Label>Order Status</Label>
        <Input
          className="capitalize"
          value={dummyTicket?.orderStatus?.toLowerCase()}
          disabled={true}
        />
      </FormRow>
      <FormRow>
        <Label>Handled By</Label>
        <Input
          className="capitalize"
          value={dummyTicket?.handledBy?.name || ''}
          disabled={true}
        />
      </FormRow>
      <FormRow>
        <Label>Lead Passenger</Label>
        <Input
          className="capitalize"
          value={dummyTicket?.leadPassenger?.toLowerCase()}
          disabled={true}
        />
      </FormRow>
      <FormRow>
        <Label>Email Address</Label>
        <Input value={dummyTicket?.email} disabled={true} />
      </FormRow>
      <FormRow>
        <Label>Phone Number</Label>
        <Input
          value={`${dummyTicket?.phoneNumber.code}-${dummyTicket?.phoneNumber?.digits}`}
          disabled={true}
        />
      </FormRow>
      {dummyTicket?.message && (
        <FormRow>
          <Label>Message</Label>
          <Input value={dummyTicket?.message || ''} disabled={true} />
        </FormRow>
      )}
    </div>
  );
}

function TripDetails({ dummyTicket }) {
  return (
    <div className="bg-white px-10 py-6 rounded-lg shadow-md mt-10">
      <SectionHeading>Trip Details</SectionHeading>
      <div className="grid grid-cols-2 gap-x-10 gap-y-4 ">
        <FormRow>
          <Label>Traveling From</Label>
          <Input value={dummyTicket?.from} disabled={true} />
        </FormRow>
        <FormRow>
          <Label>Traveling To</Label>
          <Input value={dummyTicket?.to} disabled={true} />
        </FormRow>
        <FormRow>
          <Label>Departure Date</Label>
          <Input
            value={format(dummyTicket?.departureDate, 'dd MMMM yyyy')}
            disabled={true}
          />
        </FormRow>
        {dummyTicket?.type.toLowerCase() === 'return' && (
          <FormRow>
            <Label>Return Date</Label>
            <Input
              value={format(dummyTicket?.returnDate, 'dd MMMM yyyy')}
              disabled={true}
            />
          </FormRow>
        )}
        <FormRow>
          <Label>Departure Flight</Label>
          <Input
            value={`${dummyTicket?.flightDetails?.departureFlight?.segments[0]?.carrierCode} ${dummyTicket?.flightDetails?.departureFlight?.segments[0]?.flightNumber}`}
            disabled={true}
          />
        </FormRow>
        {dummyTicket?.type?.toLowerCase() === 'return' && (
          <FormRow>
            <Label>Return Flight</Label>
            <Input
              value={`${dummyTicket?.flightDetails?.returnFlight?.segments[0]?.carrierCode} ${dummyTicket?.flightDetails?.returnFlight?.segments[0]?.flightNumber}`}
              disabled={true}
            />
          </FormRow>
        )}
      </div>
    </div>
  );
}

function Passengers({ dummyTicket }) {
  return (
    <div className="bg-white px-10 py-6 rounded-lg shadow-md mt-10">
      <SectionHeading>Passengers</SectionHeading>
      <div className="grid grid-cols-2 gap-x-10 gap-y-4 ">
        {dummyTicket?.passengers.map((passenger, i) => (
          <FormRow key={i}>
            <Label>{passenger?.type}</Label>
            <Input
              className="capitalize"
              value={`${passenger?.title} ${passenger?.firstName?.toLowerCase()} / ${passenger?.lastName?.toLowerCase()}`}
              disabled={true}
            />
          </FormRow>
        ))}
      </div>
    </div>
  );
}

function Actions({ dummyTicket }) {
  const navigate = useNavigate();
  const { deleteDummyTicket, isDeleting } = useDeleteDummyTicket();
  const [searchParams] = useSearchParams();
  const jwtData = useJwtData();

  const handleSendReservation = () => {
    navigate(
      `/send-email?template=createReservation&sessionId=${dummyTicket?.sessionId}`
    );
  };

  return (
    <div className="bg-white px-10 py-6 rounded-lg shadow-md mt-10">
      <SectionHeading>Quick Actions</SectionHeading>
      <div className="flex gap-3">
        {dummyTicket?.paymentStatus === 'PAID' && (
          <PrimaryButton
            onClick={() =>
              navigate(
                `/send-email?template=createReservation&sessionId=${dummyTicket?.sessionId}`
              )
            }
            disabled={isDeleting}
          >
            Send Reservation
          </PrimaryButton>
        )}
        {/* {dummyTicket?.paymentStatus === 'PAID' &&
          (dummyTicket?.orderStatus === 'PENDING' ||
            (dummyTicket?.orderStatus === 'PROGRESS' &&
              jwtData?.id === dummyTicket?.handledBy?._id)) && (
            <PrimaryButton
              onClick={() =>
                navigate(
                  `/send-email?template=createReservation&sessionId=${dummyTicket?.sessionId}`
                )
              }
              disabled={isDeleting}
            >
              Send Reservation
            </PrimaryButton>
          )} */}

        {jwtData?.role.toLowerCase() === 'admin' &&
          dummyTicket?.paymentStatus !== 'PAID' && (
            <DeleteButton
              onClick={() => deleteDummyTicket(dummyTicket?.sessionId)}
              disabled={isDeleting}
            >
              Delete Reservation
            </DeleteButton>
          )}
      </div>
    </div>
  );
}
