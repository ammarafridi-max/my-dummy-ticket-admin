import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SuccessButton from '../../components/Buttons/SuccessButton';
import DangerPill from '../../components/Pills/DangerPill';
import SuccessPill from '../../components/Pills/SuccessPill';
import PageHeading from '../../components/Typography/PageHeading';
import { baseURL } from '../../utils/baseUrl';

const StyledButton = styled(SuccessButton)`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  background-color: var(--grey-color-200);
  gap: 10px;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 10px 10px 2px 2px;
  align-items: center;
`;

const StyledHeaderTitles = styled.p`
  font-weight: 600;
`;

const StyledData = styled.a`
  color: black;
  text-decoration: none;
  font-size: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  align-items: center;
  gap: 10px;
  padding: 7.5px 20px;
  border-radius: 5px;

  &:hover {
    background-color: var(--grey-color-100);
  }
`;

export default function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`${baseURL}/api/admin/users`);
        const resData = await res.json();
        setUsers(resData.data);
      } catch (error) {
        alert(error.message);
      }
    }
    fetchUsers();
  }, []);

  return (
    <>
      <PageHeading>Users</PageHeading>
      <StyledHeader>
        <StyledHeaderTitles textAlign="left">Name</StyledHeaderTitles>
        <StyledHeaderTitles>Username</StyledHeaderTitles>
        <StyledHeaderTitles>Email</StyledHeaderTitles>
        <StyledHeaderTitles>Role</StyledHeaderTitles>
        <StyledHeaderTitles>Status</StyledHeaderTitles>
      </StyledHeader>
      {users.map((user) => (
        <StyledData href={`users/${user.username}`}>
          <p>{user.name}</p>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
          {user.status === 'ACTIVE' ? (
            <SuccessPill>{user.status}</SuccessPill>
          ) : (
            <DangerPill>{user.status}</DangerPill>
          )}
        </StyledData>
      ))}
    </>
  );
}
