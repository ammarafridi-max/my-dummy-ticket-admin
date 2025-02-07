import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from '../Navigation/Navigation';

const StyledLayout = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  background-color: black;
  margin: 0;
  padding: 0;
`;

const StyledMain = styled.main`
  background-color: white;
  padding: 75px 75px;
  overflow: scroll;
`;

export default function AppLayout() {
  return (
    <StyledLayout>
      <Navigation />
      <Main>
        <Outlet />
      </Main>
    </StyledLayout>
  );
}

function Main({ children }) {
  return <StyledMain>{children}</StyledMain>;
}
