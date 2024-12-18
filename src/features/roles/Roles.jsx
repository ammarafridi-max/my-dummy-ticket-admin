import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import Table from '../../components/Table/Table';
import PageHeading from '../../components/Typography/PageHeading';
import { baseURL } from '../../utils/baseUrl';

const CreateButton = styled.div`
  position: fixed;
  right: 100px;
  bottom: 100px;
`;

export default function Roles() {
  const navigate = useNavigate();
  const { data } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      try {
        const res = await fetch(`${baseURL}/api/roles`);
        const data = await res.json();
        return data.data;
      } catch (error) {
        alert(error.message);
      }
    },
  });

  return (
    <>
      <PageHeading>Roles</PageHeading>
      <Table columnTemplate="0.5fr 0.5fr 1fr">
        <Table.Head>
          <Table.Heading textAlign="left">Name</Table.Heading>
          <Table.Heading textAlign="left">Slug</Table.Heading>
          <Table.Heading textAlign="left">Permissions</Table.Heading>
        </Table.Head>
        {data?.map((item) => (
          <Table.Row>
            <Table.Item textAlign="left">{item.name}</Table.Item>
            <Table.Item textAlign="left">/{item.slug}</Table.Item>
            <Table.Item textAlign="left">
              <p>Dummy Tickets: {item.permissions.dummyTickets.read && 'Read'}</p>
            </Table.Item>
          </Table.Row>
        ))}
      </Table>
      <CreateButton>
        <PrimaryButton onClick={() => navigate('/roles/create')}>Create Role</PrimaryButton>
      </CreateButton>
    </>
  );
}
