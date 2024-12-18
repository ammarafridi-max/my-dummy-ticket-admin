import styled from "styled-components";

const StyledButton = styled.button`
  color: white;
  background-color: red;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
`;

export default function DeleteButton({ children, onClick, mb, mt, ml, mr }) {
  return (
    <StyledButton onClick={onClick} mb={mb} mt={mt} ml={ml} mr={mr}>
      {children}
    </StyledButton>
  );
}
