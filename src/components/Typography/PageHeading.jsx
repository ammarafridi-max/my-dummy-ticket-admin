import styled from 'styled-components';

const StyledHeading = styled.h1`
  margin-bottom: ${({ mb }) => mb};
`;

export default function PageHeading({ children, mb = '30px' }) {
  return <StyledHeading mb={mb}>{children}</StyledHeading>;
}
