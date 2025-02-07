import styled from 'styled-components';
import Button from './Button';
import PrimaryButton from './PrimaryButton';

const StyledButton = styled(Button)`
  color: white;
  background-color: var(--danger-color);
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
