import { useState } from 'react';
import { extractIataCode } from '../utils/extractIataCode';
import { formatDateShort } from '../utils/formatDateShort';
import DummyTicketModal from '../features/dummyTickets/DummyTicketModal';
import DangerPill from './Pills/DangerPill';
import NeutralPill from './Pills/NeutralPill';
import SuccessPill from './Pills/SuccessPill';
import WarningPill from './Pills/WarningPill';

const DataItem = ({ children }) => {
  return <p className="text-[13px] text-center">{children}</p>;
};

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
      <a
        className="grid grid-cols-[2fr_0.5fr_0.5fr_1fr_1fr_1fr_1fr_1.25fr_1fr] gap-2.5 py-1.75 px-5 mb-1 rounded-lg items-center cursor-pointer"
        onClick={openModal}
      >
        <DataItem textAlign="left" textTransform="capitalize">
          {`${passengerName[0].title} ${passengerName[0].firstName} ${passengerName[0].lastName}`}
          <br />
        </DataItem>
        <DataItem>{data.from && extractIataCode(data?.from)}</DataItem>
        <DataItem>{data?.to && extractIataCode(data?.to)}</DataItem>
        <DataItem>{data?.type}</DataItem>

        <DataItem>
          {data?.ticketAvailability?.immediate
            ? 'Immediate'
            : formatDateShort(data?.ticketAvailability?.receiptDate)}
        </DataItem>

        <DataItem>
          {data?.status === 'PAYMENT_DONE'
            ? `${data?.amountPaid?.currency} ${data?.amountPaid?.amount}`
            : ''}
        </DataItem>

        <DataItem>{data?.handledBy}</DataItem>

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
      </a>
    </>
  );
}
