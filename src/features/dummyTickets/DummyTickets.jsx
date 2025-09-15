import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDummyTickets } from './useDummyTickets';
import { extractIataCode } from '../../utils/extractIataCode';
import { convertToDubaiDate } from '../../utils/dateFunctions';
import { useSearchParams } from 'react-router-dom';
import PageHeading from '../../components/PageHeading';
import Table from '../../components/Table';
import SuccessPill from '../../components/SuccessPill';
import NeutralPill from '../../components/NeutralPill';
import DangerPill from '../../components/DangerPill';
import WarningPill from '../../components/WarningPill';
import Filter from './Filter';
import Breadcrumb from '../../components/Breadcrumb';
import Loading from '../../components/Loading';
import { FaStar } from 'react-icons/fa6';
import { Tooltip } from 'react-tooltip';
import { useUpdateDummyTicket } from './useUpdateDummyTicket';
import { useJwtData } from '../../services/jwt';

export default function DummyTickets() {
  const [searchParams, setSearchParams] = useSearchParams();
  const jwtData = useJwtData();
  const { updateDummyTicket, isUpdating } = useUpdateDummyTicket();
  const {
    dummyTickets,
    pagination,
    isLoadingDummyTickets,
    isErrorDummyTickets,
  } = useDummyTickets();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 100;

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage);
    newParams.set('limit', limit);
    setSearchParams(newParams);
  };

  return (
    <>
      <Helmet>
        <title>Dummy Tickets</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Dummy Tickets', href: '/dummy-tickets' },
        ]}
      />
      <PageHeading mb="15px">Dummy Tickets</PageHeading>
      <Filter />
      {isLoadingDummyTickets && <Loading />}
      {isErrorDummyTickets && <p>Error loading dummy tickets</p>}
      {dummyTickets && (
        <Table columnTemplate="0.75fr_2fr_1fr_1fr_1fr_1fr_1.25fr_1fr">
          <Table.Head>
            <Table.Heading>Date</Table.Heading>
            <Table.Heading textAlign="left">Name</Table.Heading>
            <Table.Heading>Route</Table.Heading>
            <Table.Heading>Type</Table.Heading>
            <Table.Heading>Receive Date</Table.Heading>
            <Table.Heading>Handled By</Table.Heading>
            <Table.Heading>Payment</Table.Heading>
            <Table.Heading>Status</Table.Heading>
          </Table.Head>
          {dummyTickets?.map((item, i) => (
            <React.Fragment key={i}>
              <Table.Row href={`/dummy-tickets/${item?.sessionId}`}>
                <Table.Item>{convertToDubaiDate(item?.updatedAt)}</Table.Item>
                <Table.Item textAlign="left" textTransform="capitalize">
                  {`${item?.leadPassenger}`.toLowerCase()}
                  <span className="text-[12px] text-gray-400 lowercase">
                    {item?.passengers?.length > 1 &&
                      `and ${item?.passengers?.length - 1} other(s)`}
                  </span>
                </Table.Item>
                <Table.Item>
                  {extractIataCode(item?.from)} - {extractIataCode(item?.to)}
                </Table.Item>
                <Table.Item>{item?.type}</Table.Item>
                <Table.Item>
                  {item?.ticketDelivery?.immediate
                    ? 'Immediate'
                    : convertToDubaiDate(item?.ticketDelivery?.deliveryDate)}
                </Table.Item>

                <Table.Item>{item?.handledBy?.name.split(' ')[0]}</Table.Item>
                <Table.Item>
                  {item?.paymentStatus === 'PAID' ? (
                    <SuccessPill width="auto">
                      <span>PAID</span>
                    </SuccessPill>
                  ) : item?.paymentStatus === 'UNPAID' ? (
                    <NeutralPill width="auto">UNPAID</NeutralPill>
                  ) : (
                    ''
                  )}
                </Table.Item>
                <Table.Item>
                  {item?.orderStatus === 'PENDING' ? (
                    <DangerPill width="auto">{item?.orderStatus}</DangerPill>
                  ) : item?.orderStatus === 'DELIVERED' ? (
                    <SuccessPill width="auto">{item?.orderStatus}</SuccessPill>
                  ) : item?.orderStatus === 'PROGRESS' ? (
                    <WarningPill width="auto">{item?.orderStatus}</WarningPill>
                  ) : (
                    ''
                  )}
                </Table.Item>
              </Table.Row>
            </React.Fragment>
          ))}
          <Table.Footer>
            <div className="flex justify-between">
              <div>
                {pagination ? (
                  <p>
                    Showing{' '}
                    {pagination.total > 0 ? (currentPage - 1) * limit + 1 : 0} -{' '}
                    {pagination.total > 0
                      ? Math.min(currentPage * limit, pagination.total)
                      : 0}{' '}
                    of {pagination.total} results
                  </p>
                ) : (
                  <p>Loading...</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <PageButton
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination?.hasPrevPage}
                >
                  Previous Page
                </PageButton>
                <span className="font-extralight">
                  {currentPage} / {pagination?.totalPages || 1}
                </span>
                <PageButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination?.hasNextPage}
                >
                  Next Page
                </PageButton>
              </div>
            </div>
          </Table.Footer>
        </Table>
      )}
    </>
  );
}

function PageButton({ children, onClick, disabled }) {
  return (
    <button
      className="bg-transparent border-0 cursor-pointer disabled:opacity-50"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
