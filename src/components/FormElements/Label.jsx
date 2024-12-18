import styled from 'styled-components';

const StyledLabel = styled.label`
  color: var(--primary-color-500);
  text-transform: uppercase;
  font-weight: 800;
  font-size: 14px;
`;

export default function Label({ children, htmlFor }) {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
}
