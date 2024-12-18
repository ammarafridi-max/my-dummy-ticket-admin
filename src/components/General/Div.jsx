import styled from 'styled-components';

const StyledDiv = styled.div`
  width: ${({ width }) => width};
`;

export default function Div({ width, children }) {
  return <StyledDiv width={width}>{children}</StyledDiv>;
}
