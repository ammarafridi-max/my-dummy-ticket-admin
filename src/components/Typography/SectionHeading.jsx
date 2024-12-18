import styled from 'styled-components';

const StyledSectionHeading = styled.h2`
  margin-bottom: ${({ mb }) => mb};
  margin-top: ${({ mt }) => mt};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
`;

export default function SectionHeading({
  children,
  className,
  fontWeight = 500,
  fontSize = '28px',
  mb,
  mt,
  my,
  ml,
  mr,
  mx,
}) {
  return (
    <StyledSectionHeading
      mt={mt}
      mb={mb}
      my={my}
      ml={ml}
      mr={mr}
      mx={mx}
      fontWeight={fontWeight}
      fontSize={fontSize}
      className={className}
    >
      {children}
    </StyledSectionHeading>
  );
}
