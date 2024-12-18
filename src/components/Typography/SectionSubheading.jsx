import styled from 'styled-components';

const StyledSectionSubheading = styled.h3`
  margin-bottom: ${({ mb }) => mb};
  margin-top: ${({ mt }) => mt};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
`;

export default function SectionSubheading({
  children,
  className,
  fontWeight = 400,
  fontSize = '20px',
  mb,
  mt,
  my,
  ml,
  mr,
  mx,
}) {
  return (
    <StyledSectionSubheading
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
    </StyledSectionSubheading>
  );
}
