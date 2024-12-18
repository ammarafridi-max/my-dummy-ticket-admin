import {
  HiOutlineUsers,
  HiOutlineTicket,
  HiOutlineHome,
  HiOutlineBriefcase,
  HiArrowRightOnRectangle,
} from 'react-icons/hi2';

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledNavigation = styled.nav`
  height: 100%;
  /* background-color: rgb(245, 245, 245); */
  background-color: var(--grey-color-100);
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 300;
  font-size: 20px;
  padding: 10px 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  text-decoration: none;
  color: black;

  & span {
    font-size: 16px;
  }

  &:hover {
    background-color: var(--grey-color-300);
  }

  &:active,
  &.active:link,
  &.active:visited {
    background-color: var(--grey-color-300);
    font-weight: 500;
  }
`;

export default function Navigation() {
  return (
    <StyledNavigation>
      <div>
        <StyledNavLink to="/dashboard">
          <HiOutlineHome />
          <span>Dashboard</span>
        </StyledNavLink>

        <StyledNavLink to="/dummy-tickets">
          <HiOutlineTicket />
          <span>Dummy Tickets</span>
        </StyledNavLink>

        <StyledNavLink to="/users">
          <HiOutlineUsers />
          <span>Users</span>
        </StyledNavLink>

        <StyledNavLink to="/roles">
          <HiOutlineBriefcase />
          <span>Roles</span>
        </StyledNavLink>

        <StyledNavLink to="/login">
          <HiArrowRightOnRectangle />
          <span>Logout</span>
        </StyledNavLink>
      </div>
      <div></div>
    </StyledNavigation>
  );
}
