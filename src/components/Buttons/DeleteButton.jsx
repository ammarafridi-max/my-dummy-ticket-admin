import styled from 'styled-components';
import Button from './Button';

const StyledButton = styled(Button)`
  color: white;
  background-color: var(--danger-color-500);
  margin-top: ${({ $mt }) => $mt};
  margin-bottom: ${({ $mb }) => $mb};
  margin-left: ${({ $ml }) => $ml};
  margin-right: ${({ $mr }) => $mr};

  &:hover {
    background-color: var(--danger-color-600);
  }
`;

export default function DeleteButton({
  children,
  onClick,
  $mb,
  $mt,
  $ml,
  $mr,
  type,
}) {
  return (
    <StyledButton
      onClick={onClick}
      $mb={$mb}
      $mt={$mt}
      $ml={$ml}
      $mr={$mr}
      type={type}
    >
      {children}
    </StyledButton>
  );
}
