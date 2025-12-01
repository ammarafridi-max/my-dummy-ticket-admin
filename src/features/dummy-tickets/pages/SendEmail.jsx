import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { capitalCase } from 'change-case';
import { useGetDummyTicket } from '../hooks/useGetDummyTicket';
import { useSendEmail } from '../hooks/useSendEmail';
import toast from 'react-hot-toast';
import FormRow from '../../../components/FormElements/FormRow';
import Input from '../../../components/FormElements/Input';
import Label from '../../../components/FormElements/Label';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Textarea from '../../../components/FormElements/Textarea';
import PrimaryButton from '../../../components/PrimaryButton';
import Loading from '../../../components/Loading';

const templates = [
  {
    name: 'createReservation',
    subject: 'Your Flight Reservation',
    body: 'Hi {leadPassenger}, \n\nThank you for booking your dummy ticket with MyDummyTicket.ae. \n\nPlease find attached your flight reservation to this email. \n\nIf you need a hotel booking or travel insurance, do let us know. \n\nKindly review your booking details and let us know if you require any corrections. \n\nBest regards,\n{agent}\nwww.mydummyticket.ae',
  },
];

function generateEmailTemplate(templateName) {
  const { subject, body } = templates.find((temp) => temp.name === templateName);
  return { subject, body };
}

export default function MDTSendEmail() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [reservation, setReservation] = useState(null);
  const { dummyTicket, isLoadingDummyTicket } = useGetDummyTicket(searchParams.get('sessionId'));
  const { sendEmail, isSendingEmail } = useSendEmail();
  const btnDisabled = !email || !subject || !body || !reservation?.name;
  const jwtData = useJwtData();

  useEffect(() => {
    if (searchParams.get('template')) {
      const { subject, body } = generateEmailTemplate(searchParams.get('template'));
      const updatedBody = body
        .replace('{leadPassenger}', capitalCase(dummyTicket?.passengers[0]?.firstName || '') || '')
        .replace('{agent}', capitalCase(jwtData?.name?.split(' ')[0]));
      setSubject(subject);
      setBody(updatedBody);
    }
  }, []);

  useEffect(() => {
    if (searchParams.get('sessionId')) {
      setEmail(dummyTicket?.email);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if ((!email, !subject, !body)) {
      return toast.error('Please fill the email, subject, and body fields');
    }

    if (!reservation?.name) {
      return toast.error('Please attach a reservation file');
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('body', body);
    if (reservation) {
      formData.append('reservation', reservation);
    }

    sendEmail(formData);
  }

  if (isLoadingDummyTicket || isSendingEmail) return <Loading />;

  return (
    <div>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Send Email', href: '/send-email' },
        ]}
      />
      <PageHeading>Send Email</PageHeading>
      <div className="bg-white px-10 py-6 rounded-lg shadow-md">
        <FormRow>
          <Label>Email Address</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormRow>
        <FormRow>
          <Label>Subject</Label>
          <Input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </FormRow>
        <FormRow>
          <Label>Body</Label>
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </FormRow>
        <FormRow>
          <Label>Reservation</Label>
          <div>
            <Input type="file" accept="application/pdf" onChange={(e) => setReservation(e.target.files[0]) || null} />
            {reservation && <p className="text-sm mt-2">Selected: {reservation?.name}</p>}
          </div>
        </FormRow>
        <PrimaryButton type="submit" onClick={handleSubmit} disabled={isSendingEmail}>
          Send Email
        </PrimaryButton>
      </div>
    </div>
  );
}
