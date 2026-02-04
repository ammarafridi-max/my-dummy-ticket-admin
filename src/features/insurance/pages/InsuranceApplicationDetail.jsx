import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetInsuranceApplication } from '../hooks/useGetInsuranceApplication';
import { useDownloadInsurancePolicy } from '../hooks/useDownloadInsurancePolicy';
import { convertToDubaiTime } from '../../../utils/timeFunctions';
import { convertToDubaiDate } from '../../../utils/dateFunctions';
import { format } from 'date-fns';
import { capitalCase } from 'change-case';
import { MdWhatsapp } from 'react-icons/md';
import { Undo } from 'lucide-react';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import SectionHeading from '../../../components/SectionHeading';
import Loading from '../../../components/Loading';
import PrimaryButton from '../../../components/PrimaryButton';
import ActionButtons from '../../../components/ActionButtons';
import { useAuth } from '../../../context/AuthContext';
import toast from 'react-hot-toast';

export default function InsuranceApplicationDetail() {
  const { sessionId } = useParams();
  const { application, isLoadingApplication } = useGetInsuranceApplication(sessionId);
  const [activeTab, setActiveTab] = useState('information');
  const { isAdmin } = useAuth();

  if (isLoadingApplication) return <Loading />;

  function handleShareWhatsApp() {
    if (!application) return;

    const startDate = application?.startDate ? format(new Date(application.startDate), 'dd MMM yyyy') : '-';
    const endDate = application?.endDate ? format(new Date(application.endDate), 'dd MMM yyyy') : '-';

    const passengers = application?.passengers?.length
      ? application.passengers.map((p, i) => `Passenger ${i + 1}: ${p.firstName} ${p.lastName} • ${p.nationality}`)
      : ['Passengers: -'];

    const message = `
Insurance Application
Name: ${application?.leadPassenger || '-'}
Email: ${application?.email || '-'}
Mobile: ${application?.mobile?.code || ''}-${application?.mobile?.digits || ''}

Journey: ${capitalCase(application?.journeyType || '')}
Region: ${application?.region?.name || '-'}
Dates: ${startDate} → ${endDate}

${passengers.join('\n')}

Policy #: ${application?.policyNumber || 'Pending'}
Payment: ${application?.paymentStatus || '-'}
${isAdmin ? `Amount: ${application?.amountPaid?.currency || ''} ${application?.amountPaid?.amount || ''}` : ''}
    `.trim();

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened) window.location.href = url;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-5">
        <div>
          <Breadcrumb
            paths={[
              { label: 'Home', href: '/' },
              { label: 'Insurance Applications', href: '/insurance-applications' },
              { label: capitalCase(application?.leadPassenger), href: `/insurance-applications/${sessionId}` },
            ]}
          />
          <PageHeading>{capitalCase(application?.leadPassenger)}</PageHeading>
        </div>
        <div>
          <ActionButtons
            actions={[
              { text: 'Share on WhatsApp', icon: MdWhatsapp, onClick: handleShareWhatsApp },
              ...(isAdmin
                ? [
                    {
                      text: 'Refund',
                      icon: Undo,
                      onClick: () => toast.error('Refund not implemented yet'),
                    },
                  ]
                : []),
            ]}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {[
          { label: 'Information', value: 'information' },
          { label: 'Documents', value: 'documents' },
        ].map((item, i) => (
          <button
            className={`font-light text-[12px] px-4 py-2 shadow-sm rounded-md cursor-pointer duration-200 ${activeTab === item.value ? 'bg-primary-500 text-white' : 'bg-white hover:bg-primary-50'}`}
            onClick={() => setActiveTab(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {activeTab === 'information' && (
        <>
          <BasicInfo application={application} isAdmin={isAdmin} />
          <TripDetails application={application} />
          <Passengers application={application} />
        </>
      )}

      {activeTab === 'documents' && <Documents policyId={application.policyId} />}
    </div>
  );
}

function BasicInfo({ application, isAdmin }) {
  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-sm grid grid-cols-3 gap-x-6 gap-y-6 mt-6 text-sm">
      <Info
        label="Submitted"
        value={`${convertToDubaiDate(application?.createdAt)} ${convertToDubaiTime(application?.createdAt)}`}
      />
      <Info label="Lead Passenger" value={application?.leadPassenger} />
      <Info label="Email" value={application?.email} />
      <Info label="Phone" value={`${application?.mobile?.code}-${application?.mobile?.digits}`} />
      <Info label="Journey" value={capitalCase(application?.journeyType)} />
      <Info label="Region" value={application?.region?.name} />
      <Info
        label="Travel Dates"
        value={`${format(new Date(application?.startDate), 'dd MMM')} → ${format(new Date(application?.endDate), 'dd MMM')}`}
      />
      <Info label="Policy #" value={application?.policyNumber} />
      {isAdmin && <Info label="Amount" value={`${application?.amountPaid?.currency} ${application?.amountPaid?.amount}`} />}
      <Info label="Payment" value={application?.paymentStatus} />
    </div>
  );
}

function TripDetails({ application }) {
  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-sm mt-4 text-sm">
      <SectionHeading>Trip</SectionHeading>
      <div className="grid grid-cols-3 gap-x-6 gap-y-6 mt-2">
        <Info label="Adults" value={application?.quantity?.adults} />
        <Info label="Children" value={application?.quantity?.children} />
        <Info label="Region Desc" value={application?.region?.description} />
      </div>
    </div>
  );
}

function Passengers({ application }) {
  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-sm mt-4 text-sm">
      <SectionHeading>Passengers</SectionHeading>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 mt-2">
        {application?.passengers?.map((p, i) => (
          <Info key={i} label={`Passenger ${i + 1}`} value={`${p.firstName} ${p.lastName} • ${p.nationality} • ${p.passport}`} />
        ))}
      </div>
    </div>
  );
}

function Documents({ policyId }) {
  const { downloadPolicy } = useDownloadInsurancePolicy();

  return (
    <div className="bg-white px-6 py-4 rounded-lg shadow-sm mt-4 text-sm">
      <SectionHeading>Documents</SectionHeading>
      <div className="grid grid-cols-3 gap-4">
        <PrimaryButton onClick={() => downloadPolicy({ policyId, index: 0 })}>Download Certificate of Insurance</PrimaryButton>
        <PrimaryButton onClick={() => downloadPolicy({ policyId, index: 1 })}>Download Policy Wording</PrimaryButton>
        <PrimaryButton onClick={() => downloadPolicy({ policyId, index: 2 })}>Download Policy Wording (Arabic)</PrimaryButton>
        <PrimaryButton onClick={() => downloadPolicy({ policyId, index: 3 })}>Download Policy Summary</PrimaryButton>
        <PrimaryButton onClick={() => downloadPolicy({ policyId, index: 4 })}>Policy Tax Invoice</PrimaryButton>
      </div>
    </div>
  );
}

// function Actions({ application }) {
//   const { deleteInsuranceApplication, isDeleting } = useDeleteInsuranceApplication();

//   return (
//     <div className="bg-white px-6 py-4 rounded-md shadow-sm mt-4">
//       <SectionHeading>Actions</SectionHeading>
//       <div className="flex gap-2 mt-2">
//         <PrimaryButton className="h-9 px-3 text-sm">Send Policy</PrimaryButton>
//         <DeleteButton
//           onClick={() => deleteInsuranceApplication(application?.sessionId)}
//           disabled={isDeleting}
//           className="h-9 px-3 text-sm"
//         >
//           Delete
//         </DeleteButton>
//       </div>
//     </div>
//   );
// }

function Info({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="font-extralight text-sm text-gray-500">{label}</span>
      <span className="font-light text-lg truncate">{value || '-'}</span>
    </div>
  );
}
