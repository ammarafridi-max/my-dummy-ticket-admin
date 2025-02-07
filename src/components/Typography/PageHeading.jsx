import styled from 'styled-components';

const PageHeading = styled.h1`
  font-weight: 500;
  font-size: 32px;
  margin-bottom: ${({ mb = '30px' }) => mb};
`;

export default PageHeading;

// export default function PageHeading({ children, mb = '30px' }) {
//   return <StyledHeading $mb={mb}>{children}</StyledHeading>;
// }
