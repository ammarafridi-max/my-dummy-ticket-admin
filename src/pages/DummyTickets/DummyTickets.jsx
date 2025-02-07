import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { baseURL } from '../../utils/baseUrl';
import { extractIataCode } from '../../utils/extractIataCode';
import { formatDateShort } from '../../utils/formatDateShort';
import styled from 'styled-components';
import DangerPill from '../../components/Pills/DangerPill';
import NeutralPill from '../../components/Pills/NeutralPill';
import SuccessPill from '../../components/Pills/SuccessPill';
import WarningPill from '../../components/Pills/WarningPill';
import SearchBar from '../../components/SearchBar/SearchBar';
import Table from '../../components/Table/Table';
import PageHeading from '../../components/Typography/PageHeading';
import Modal from '../../components/Modal/Modal';
import DummyTicketModal from '../../components/DummyTicketModal/DummyTicketModal';

const StyledFilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

function FilterBar({ searchQuery, onSearchChange }) {
  return (
    <StyledFilterBar>
      <div></div>
      <SearchBar searchQuery={searchQuery} onChange={onSearchChange} />
    </StyledFilterBar>
  );
}

export default function DummyTickets() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['dummytickets'],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseURL}/api/admin/tickets`);
        const data = await res.json();
        console.log(data);
        return data.data;
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  // async function handleSearchChange(e) {
  //   const query = e.target.value;
  //   setSearchQuery(query);
  //   try {
  //     const res = await fetch(
  //       query
  //         ? `${baseURL}/api/admin/tickets?name=${encodeURIComponent(query)}`
  //         : `${baseURL}/api/admin/tickets`
  //     );
  //     const resData = await res.json();
  //     setTickets(resData.data);
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // }

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      <PageHeading>Dummy Tickets</PageHeading>
      {/* <FilterBar onSearchChange={handleSearchChange} searchQuery={searchQuery} /> */}
      <Table columnTemplate="2fr 0.5fr 0.5fr 1fr 1fr 1fr 1fr 1.25fr 1fr">
        <Table.Head>
          <Table.Heading textAlign="left">Name</Table.Heading>
          <Table.Heading>From</Table.Heading>
          <Table.Heading>To</Table.Heading>
          <Table.Heading>Type</Table.Heading>
          <Table.Heading>Receipt</Table.Heading>
          <Table.Heading>Amt Paid</Table.Heading>
          <Table.Heading>Handled By</Table.Heading>
          <Table.Heading>Status</Table.Heading>
          <Table.Heading>OrderStatus</Table.Heading>
        </Table.Head>

        <Modal>
          {data?.map((item) => (
            <>
              <Modal.Opens openWindowName={item._id}>
                <Table.Row onClick={() => alert('I got clicked')}>
                  <Table.Item textAlign="left">
                    {item.passengers[0].title} {item.passengers[0].firstName}{' '}
                    {item.passengers[0].lastName}
                  </Table.Item>
                  <Table.Item>{extractIataCode(item.from)}</Table.Item>
                  <Table.Item>{extractIataCode(item.to)}</Table.Item>
                  <Table.Item>{item.type}</Table.Item>
                  <Table.Item>
                    {item.ticketAvailability.immediate
                      ? 'Immediate'
                      : formatDateShort(item.ticketAvailability.receiptDate)}
                  </Table.Item>
                  <Table.Item>
                    {item.status === 'PAYMENT_DONE'
                      ? `${item?.amountPaid?.currency} ${item?.amountPaid?.amount}`
                      : ''}
                  </Table.Item>
                  <Table.Item>{item.handledBy}</Table.Item>
                  <Table.Item>
                    {item?.status === 'PAYMENT_DONE' ? (
                      <SuccessPill width="auto">PAID</SuccessPill>
                    ) : item?.status === 'REVIEW_ORDER' ? (
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
                    ) : item?.orderStatus === 'CONTACTED' ? (
                      <WarningPill width="auto">{item?.orderStatus}</WarningPill>
                    ) : (
                      ''
                    )}
                  </Table.Item>
                </Table.Row>
              </Modal.Opens>
              <Modal.Window openWindowName={item._id}>
                <DummyTicketModal data={item} />
              </Modal.Window>
            </>
          ))}
        </Modal>
      </Table>
      {/* <StyledHeader>
        <StyledHeaderTitles textAlign="left">Name</StyledHeaderTitles>
        <StyledHeaderTitles>From</StyledHeaderTitles>
        <StyledHeaderTitles>To</StyledHeaderTitles>
        <StyledHeaderTitles>Type</StyledHeaderTitles>
        <StyledHeaderTitles>Receipt Date</StyledHeaderTitles>
        <StyledHeaderTitles>Amt Paid</StyledHeaderTitles>
        <StyledHeaderTitles>Handled By</StyledHeaderTitles>
        <StyledHeaderTitles>Status</StyledHeaderTitles>
        <StyledHeaderTitles>Order Status</StyledHeaderTitles>
      </StyledHeader>
      {data?.map((item) => (
        <TicketItem
          key={item._id} // Assuming tickets have a unique `_id`
          data={item}
          passengerName={item.passengers}
        />
      ))} */}
    </div>
  );
}
