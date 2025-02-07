import styled from 'styled-components';
import Button from './Button';

const StyledButton = styled(Button)`
  color: white;
  background-color: var(--primary-color-500);
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};

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
