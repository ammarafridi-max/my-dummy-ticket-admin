import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { useInsuranceApplications } from '../hooks/useInsuranceApplications';
import { convertToDubaiDate } from '../../../utils/dateFunctions';
import PageHeading from '../../../components/PageHeading';
import Table from '../../../components/Table';
import SuccessPill from '../../../components/SuccessPill';
import NeutralPill from '../../../components/NeutralPill';
import WarningPill from '../../../components/WarningPill';
import Filter from '../components/Filter';
import Breadcrumb from '../../../components/Breadcrumb';
import Loading from '../../../components/Loading';
import { useAuth } from '../../../context/AuthContext';

export default function InsuranceApplications() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { applications, pagination, isLoadingApplications, isErrorApplications } = useInsuranceApplications();
  const { isAdmin } = useAuth();

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
        <title>Insurance Applications</title>
      </Helmet>
      <div className="flex items-center justify-between gap-5">
        <div>
          <Breadcrumb
            paths={[
              { label: 'Home', href: '/' },
              { label: 'Insurance Applications', href: '/insurance' },
            ]}
          />
          <PageHeading mb="15px">Insurance Applications</PageHeading>
        </div>
        <div></div>
      </div>
      <Filter />
      {isLoadingApplications && <Loading />}
      {isErrorApplications && <p>Error loading insurance applications</p>}
      {applications && (
        <Table $columntemplate={isAdmin ? '1fr 2fr 1fr 1fr 1fr 1fr' : '1fr 2fr 1fr 1fr 1fr'}>
          <Table.Head>
            <Table.Heading textAlign="left">Date</Table.Heading>
            <Table.Heading textAlign="left">Name</Table.Heading>
            <Table.Heading textAlign="center">Region</Table.Heading>
            <Table.Heading textAlign="center">Journey</Table.Heading>
            {isAdmin && <Table.Heading textAlign="center">Amount</Table.Heading>}
            <Table.Heading textAlign="center">Payment</Table.Heading>
          </Table.Head>

          {applications.map((app, i) => (
            <Table.Row key={i} href={`/insurance/${app.sessionId}`}>
              <Table.Item>{convertToDubaiDate(app.createdAt)}</Table.Item>

              <Table.Item textAlign="left" textTransform="capitalize">
                {`${app.passengers?.[0]?.firstName} ${app.passengers?.[0]?.lastName}`.toLowerCase()}
                <span className="text-[12px] text-gray-400 lowercase">
                  {app.passengers?.length > 1 && ` and ${app.passengers.length - 1} other(s)`}
                </span>
              </Table.Item>

              <Table.Item textAlign="center">{app.region?.name}</Table.Item>

              <Table.Item textAlign="center">{app.journeyType}</Table.Item>

              {isAdmin && (
                <Table.Item textAlign="center">
                  {app.amountPaid?.currency} {app.amountPaid?.amount}
                </Table.Item>
              )}

              <Table.Item textAlign="center">
                {app.paymentStatus === 'PAID' ? (
                  <SuccessPill width="auto">PAID</SuccessPill>
                ) : (
                  <NeutralPill width="auto">{app.paymentStatus}</NeutralPill>
                )}
              </Table.Item>
            </Table.Row>
          ))}

          <Table.Footer>
            <div className="flex justify-between">
              <div>
                {pagination ? (
                  <p>
                    Showing {pagination.total > 0 ? (currentPage - 1) * limit + 1 : 0} -{' '}
                    {pagination.total > 0 ? Math.min(currentPage * limit, pagination.total) : 0} of {pagination.total} results
                  </p>
                ) : (
                  <p>Loading...</p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <PageButton onClick={() => handlePageChange(currentPage - 1)} disabled={!pagination?.hasPrevPage}>
                  Previous Page
                </PageButton>
                <span className="font-extralight">
                  {currentPage} / {pagination?.totalPages || 1}
                </span>
                <PageButton onClick={() => handlePageChange(currentPage + 1)} disabled={!pagination?.hasNextPage}>
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
    <button className="bg-transparent border-0 cursor-pointer disabled:opacity-50" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
