import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useJwtData } from '../../services/jwt';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa6';
import { useUsers } from './useUsers';
import DangerPill from '../../components/DangerPill';
import SuccessPill from '../../components/SuccessPill';
import Table from '../../components/Table';
import PageHeading from '../../components/PageHeading';
import Breadcrumb from '../../components/Breadcrumb';
import Loading from '../../components/Loading';

export default function Users() {
  const { users, isLoadingUsers } = useUsers();
  const navigate = useNavigate();
  const jwtData = useJwtData();

  useEffect(() => {
    if (jwtData?.role?.toLowerCase() !== 'admin') {
      toast.error('You are not allowed to access this page');
      navigate('/dummy-tickets');
    }
  }, [navigate]);

  if (isLoadingUsers) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Users', href: '/users' },
        ]}
      />
      <PageHeading>Users</PageHeading>
      <Table columnTemplate="1fr_1fr_1.5fr_1fr_0.5fr">
        <Table.Head>
          <Table.Heading textAlign="left">Name</Table.Heading>
          <Table.Heading textAlign="left">Username</Table.Heading>
          <Table.Heading textAlign="left">Email</Table.Heading>
          <Table.Heading>Role</Table.Heading>
          <Table.Heading>Status</Table.Heading>
        </Table.Head>
        {users?.map((user, i) => (
          <Table.Row
            key={i}
            href={
              jwtData.id === user._id ? `account` : `/users/${user.username}`
            }
          >
            <Table.Item textAlign="left">{user.name}</Table.Item>
            <Table.Item textAlign="left">{user.username}</Table.Item>
            <Table.Item textAlign="left">{user.email}</Table.Item>
            <Table.Item textTransform="capitalize">{user.role}</Table.Item>
            <Table.Item textAlign="center">
              {user.status === 'ACTIVE' ? (
                <SuccessPill>{user.status}</SuccessPill>
              ) : (
                <DangerPill>{user.status}</DangerPill>
              )}
            </Table.Item>
          </Table.Row>
        ))}
      </Table>
      <button
        className="absolute bottom-10 right-10 bg-primary-600 hover:bg-primary-700 cursor-pointer duration-300 p-4 text-white text-2xl rounded-full"
        onClick={() => navigate('/users/create')}
      >
        <FaPlus />
      </button>
    </>
  );
}
