import styled from 'styled-components';

const StyledButton = styled.button`
  color: white;
  font-size: 16px;
  background-color: var(--primary-color-500);
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
  cursor: pointer;
  transition-duration: 0.3s;

  &:hover {
    background-color: var(--primary-color-600);
  }
`;

export default function PrimaryButton({ children, onClick, mb, mt, ml, mr }) {
  return (
    <StyledButton onClick={onClick} mb={mb} mt={mt} ml={ml} mr={mr}>
      {children}
    </StyledButton>
  );
}
