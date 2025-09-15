import styled from 'styled-components';
import Button from './Button';

const StyledButton = styled(Button)`
  color: var(--primary-color-600);
  background-color: white;
  font-weight: 600;
  margin-top: ${({ $mt }) => $mt};
  margin-bottom: ${({ $mb }) => $mb};
  margin-left: ${({ $ml }) => $ml};
  margin-right: ${({ $mr }) => $mr};

  &:hover {
    color: var(--primary-color-700);
    text-decoration: underline;
  }
`;

export default function LinkButton({
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
