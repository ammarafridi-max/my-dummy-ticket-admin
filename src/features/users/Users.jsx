import { useUsers } from './useUsers';
import DangerPill from '../../components/Pills/DangerPill';
import SuccessPill from '../../components/Pills/SuccessPill';
import Table from '../../components/Table/Table';
import PageHeading from '../../components/Typography/PageHeading';

export default function Users() {
  const { users } = useUsers();

  return (
    <>
      <PageHeading>Users</PageHeading>
      <Table columnTemplate="1fr 1fr 1.5fr 1fr 0.5fr">
        <Table.Head>
          <Table.Heading textAlign="left">Name</Table.Heading>
          <Table.Heading textAlign="left">Username</Table.Heading>
          <Table.Heading textAlign="left">Email</Table.Heading>
          <Table.Heading>Role</Table.Heading>
          <Table.Heading>Status</Table.Heading>
        </Table.Head>
        {users?.map((user) => (
          <Table.Row href={`/users/${user.username}`}>
            <Table.Item textAlign="left">{user.name}</Table.Item>
            <Table.Item textAlign="left">{user.username}</Table.Item>
            <Table.Item textAlign="left">{user.email}</Table.Item>
            <Table.Item>{user.role}</Table.Item>
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
    </>
  );
}
