import styled from 'styled-components';

const StyledRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap }) => gap};
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
  margin-right: ${({ mr }) => mr};
  margin-left: ${({ ml }) => ml};
`;

export default function Row({
  children,
  className,
  alignItems = 'center',
  justifyContent = 'space-between',
  gap = '0',
  flexDirection = 'row',
  mt,
  mb,
  my,
  mr,
  ml,
  mx,
}) {
  return (
    <StyledRow
      className={className}
      flexDirection={flexDirection}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
      mt={mt}
      mb={mb}
      my={my}
      ml={ml}
      mr={mr}
      mx={mx}
    >
      {children}
    </StyledRow>
  );
}
