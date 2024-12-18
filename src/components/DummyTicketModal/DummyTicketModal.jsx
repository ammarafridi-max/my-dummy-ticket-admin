import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { baseURL } from '../../utils/baseUrl';
import { formatDateShort } from '../../utils/formatDateShort';
import { formatMongoDBDate } from '../../utils/formatMongoDBDate';
import { HiOutlineXMark } from 'react-icons/hi2';
import { FaPlaneDeparture, FaPlaneArrival, FaUser, FaInfo } from 'react-icons/fa6';
import { AuthContext } from '../../context/AuthContext';
import styled from 'styled-components';
import Row from '../General/Row';
import IconWithText from '../Icons/IconWithText';
import DeleteButton from '../Buttons/DeleteButton';
import SuccessButton from '../Buttons/SuccessButton';
import SuccessPill from '../Pills/SuccessPill';
import NeutralPill from '../Pills/NeutralPill';
import SectionHeading from '../Typography/SectionHeading';
import DangerPill from '../Pills/DangerPill';

const StyledContainer = styled.div`
  height: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

// const StyledHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   gap: 30px;
// `;

const StyledBody = styled.div`
  border-radius: 20px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledFooter = styled.div`
  width: 100%;
`;

const StyledDeparture = styled.div`
  width: 50%;
`;

const StyledReturn = styled.div`
  width: 50%;
`;

export default function DummyTicketModal({ data }) {
  const { user } = useContext(AuthContext);
  const mutation = useMutation({
    mutationFn: async ({ method, orderStatus }) => {
      const url = `${baseURL}/api/admin/tickets/${data.sessionId}`;
      const options = { method, headers: { 'Content-Type': 'application/json' } };
      if (orderStatus) {
        options.body = JSON.stringify({ user: user.name, orderStatus });
      }
      const res = await fetch(url, options);
      if (!res.ok) {
        throw new Error('Something went wrong!');
      }
      return res.json();
    },
    onSuccess: () => {
      alert('Operation successful');
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleDeleteItem = () => mutation.mutate({ method: 'delete' });
  const updateStatus = (orderStatus) => mutation.mutate({ method: 'PUT', orderStatus });

  return (
    <StyledContainer onClick={(e) => e.stopPropagation()}>
      <Header data={data} />
      <Body data={data} />
      <Footer handleDeleteItem={handleDeleteItem} updateStatus={updateStatus} />
    </StyledContainer>
  );
}

const Header = ({ data }) => {
  return (
    <div>
      <SectionHeading mb="10px">
        Dummy Ticket Application For{' '}
        {`${data?.passengers[0].title} ${data?.passengers[0].firstName} ${data?.passengers[0].lastName}`}
      </SectionHeading>

      <Row justifyContent="left" gap="10px">
        {data?.status === 'PAYMENT_DONE' ? (
          <SuccessPill width="fit-content">PAID</SuccessPill>
        ) : (
          <NeutralPill width="fit-content">UNPAID</NeutralPill>
        )}

        {data?.orderStatus === 'PENDING' ? (
          <DangerPill>PENDING</DangerPill>
        ) : (
          data?.orderStatus === 'DELIVERED' && <SuccessPill>DELIVERED</SuccessPill>
        )}
      </Row>
    </div>
  );
};

const Body = ({ data }) => {
  return (
    <StyledBody>
      <Row className="mb-5">
        <div>
          <IconWithText icon={<FaInfo />} text="Basic Information" />
          <p className="mb-1">Type: {data?.type}</p>
          <p className="mb-1">Submitted On: {formatMongoDBDate(data?.createdAt)}</p>
          <p className="mb-1">
            Amount Paid: {data?.amountPaid?.currency} {data?.amountPaid?.amount}
          </p>
          <p className="mb-1">Validity: {data?.ticketValidity}</p>
          <p className="mb-1">
            Receipt Date:{' '}
            {data?.ticketAvailability?.immediate
              ? 'Immediate'
              : formatDateShort(data?.ticketAvailability?.receiptDate)}
          </p>
          <p className="mb-1">Email: {data?.email}</p>
          <p className="mb-1">Number: {`${data?.phoneNumber?.code}${data?.phoneNumber?.digits}`}</p>
        </div>
      </Row>
      <Row className="mb-5">
        <StyledDeparture>
          <IconWithText icon={<FaPlaneDeparture />} text="Departure" />
          <p className="mb-1">{data?.from}</p>
          <p className="mb-1">{data?.to}</p>
          <p className="mb-1">{formatDateShort(data?.departureDate)}</p>
          <p className="mb-1">{data?.flightDetails?.departureFlight}</p>
        </StyledDeparture>
        {data?.type === 'Return' && (
          <StyledReturn>
            <IconWithText icon={<FaPlaneArrival />} text="Return" />
            <p className="mb-1">{data?.to}</p>
            <p className="mb-1">{data?.from}</p>
            <p className="mb-1">{formatDateShort(data?.returnDate)}</p>
            <p className="mb-1">{data?.flightDetails?.returnFlight}</p>
          </StyledReturn>
        )}
      </Row>
      <div>
        <IconWithText icon={<FaUser />} text={`Passengers (${data?.passengers?.length})`} />
        {data?.passengers?.map((passenger) => (
          <p>
            ({passenger.type}) {passenger.title} {passenger.firstName} / {passenger.lastName}
          </p>
        ))}
      </div>
    </StyledBody>
  );
};

const Footer = ({ handleDeleteItem, updateStatus }) => {
  return (
    <StyledFooter>
      <DeleteButton onClick={handleDeleteItem}>Delete Record</DeleteButton>
      <SuccessButton onClick={() => updateStatus('DELIVERED')} ml="10px">
        Mark As Delivered
      </SuccessButton>
      <SuccessButton onClick={() => updateStatus('PENDING')} ml="10px">
        Mark As Pending
      </SuccessButton>
      <SuccessButton onClick={() => updateStatus('CONTACTED')} ml="10px">
        Mark As Contacted
      </SuccessButton>
    </StyledFooter>
  );
};
