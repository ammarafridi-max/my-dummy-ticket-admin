import styled from 'styled-components';

export const StyledNeutralPill = styled.p`
  width: ${({ width }) => width};
  height: fit-content;
  font-size: 12px;
  font-weight: 800;
  color: var(--grey-color-900);
  background-color: var(--grey-color-200);
  border-radius: 100px;
  padding: 5px 20px;
  text-align: center;
`;

export default function NeutralPill({ children, width = 'fit-content' }) {
  return <StyledNeutralPill width={width}>{children}</StyledNeutralPill>;
}
