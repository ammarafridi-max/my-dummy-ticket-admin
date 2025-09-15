import Modal, { ModalContext } from './Modal/Modal';
import SectionHeading from './SectionHeading';
import DeleteButton from './Buttons/DeleteButton';
import LinkButton from './Buttons/LinkButton';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  gap: 20px;
  padding: 50px 50px;
`;

export default function DeleteModal() {
  return (
    <ModalContext.Provider>
      <Container>
        <Header />
        <Body />
        <Footer />
      </Container>
    </ModalContext.Provider>
  );
}

function Header() {
  return <SectionHeading>Delete user?</SectionHeading>;
}

function Body() {
  return <p>Are you sure you want to delete user obaid.afridi?</p>;
}

function Footer() {
  return (
    <BtnRow>
      <DeleteButton>Delete</DeleteButton>
      <LinkButton>Cancel</LinkButton>
    </BtnRow>
  );
}

const BtnRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
