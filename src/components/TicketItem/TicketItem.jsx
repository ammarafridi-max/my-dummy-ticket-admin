import { useState } from 'react';
import styled from 'styled-components';
import { extractIataCode } from '../../utils/extractIataCode';
import { formatDateShort } from '../../utils/formatDateShort';
import DummyTicketModal from '../DummyTicketModal/DummyTicketModal';
import DangerPill from '../Pills/DangerPill';
import NeutralPill from '../Pills/NeutralPill';
import SuccessPill from '../Pills/SuccessPill';
import WarningPill from '../Pills/WarningPill';

const StyledItem = styled.a`
  display: grid;
  grid-template-columns: 2fr 0.5fr 0.5fr 1fr 1fr 1fr 1fr 1.25fr 1fr;
  gap: 10px;
  padding: 7.5px 20px;
  margin-bottom: 5px;
  border-radius: 10px;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: rgb(245, 245, 245);
  }
`;

const StyledData = styled.p`
  font-size: 13px;
  text-align: ${({ textAlign = 'center' }) => textAlign};
  text-transform: ${({ textTransform = 'none' }) => textTransform};
`;

export default function TicketItem({ data, passengerName }) {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      {showModal && <DummyTicketModal data={data} onClose={closeModal} />}
      <StyledItem onClick={openModal}>
        <StyledData
          textAlign="left"
          textTransform="capitalize"
        >{`${passengerName[0].title} ${passengerName[0].firstName} ${passengerName[0].lastName}`}</StyledData>
        <StyledData>{data.from && extractIataCode(data?.from)}</StyledData>
        <StyledData>{data?.to && extractIataCode(data?.to)}</StyledData>
        <StyledData>{data?.type}</StyledData>
        {/* <StyledData>{data?.departureDate && formatDateShort(data?.departureDate)}</StyledData> */}
        {/* <StyledData>
          {data?.type === 'Return' && data?.returnDate && formatDateShort(data?.returnDate)}
        </StyledData> */}

        <StyledData>
          {data?.ticketAvailability?.immediate
            ? 'Immediate'
            : formatDateShort(data?.ticketAvailability?.receiptDate)}
        </StyledData>

        <StyledData>
          {data?.status === 'PAYMENT_DONE'
            ? `${data?.amountPaid?.currency} ${data?.amountPaid?.amount}`
            : ''}
        </StyledData>

        <StyledData>{data?.handledBy}</StyledData>

        {data?.status === 'PAYMENT_DONE' ? (
          <SuccessPill width="auto">PAID</SuccessPill>
        ) : data?.status === 'REVIEW_ORDER' ? (
          <NeutralPill width="auto">UNPAID</NeutralPill>
        ) : (
          ''
        )}

        {data?.orderStatus === 'PENDING' ? (
          <DangerPill width="auto">{data?.orderStatus}</DangerPill>
        ) : data?.orderStatus === 'DELIVERED' ? (
          <SuccessPill width="auto">{data?.orderStatus}</SuccessPill>
        ) : data?.orderStatus === 'CONTACTED' ? (
          <WarningPill width="auto">{data?.orderStatus}</WarningPill>
        ) : (
          ''
        )}
      </StyledItem>
    </>
  );
}
