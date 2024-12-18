import { useContext } from 'react';
import { createContext } from 'react';
import styled from 'styled-components';

const StyledHead = styled.div`
  display: grid;
  grid-template-columns: ${({ columnTemplate }) => columnTemplate};
  background-color: var(--grey-color-200);
  gap: 10px;
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  align-items: center;
`;

const StyledHeading = styled.p`
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  text-align: ${({ textAlign = 'center' }) => textAlign};
`;

const StyledRow = styled.a`
  display: grid;
  grid-template-columns: ${({ columnTemplate }) => columnTemplate};
  gap: 10px;
  padding: 7.5px 20px;
  margin-bottom: 5px;
  border-radius: 5px;
  align-items: center;
  transition-duration: 0.2s;
  cursor: pointer;
  &:hover {
    background-color: var(--grey-color-100);
  }
`;

const StyledItem = styled.p`
  font-size: 13px;
  text-align: ${({ textAlign = 'center' }) => textAlign};
  text-transform: ${({ textTransform = 'none' }) => textTransform};
`;

const TableContext = createContext();

function Head({ children }) {
  const { columnTemplate } = useContext(TableContext);
  return <StyledHead columnTemplate={columnTemplate}>{children}</StyledHead>;
}

function Row({ children, onClick }) {
  const { columnTemplate } = useContext(TableContext);
  return (
    <StyledRow onClick={onClick} columnTemplate={columnTemplate}>
      {children}
    </StyledRow>
  );
}

function Table({ children, columnTemplate }) {
  return <TableContext.Provider value={{ columnTemplate }}>{children}</TableContext.Provider>;
}

Table = Table;
Table.Head = Head;
Table.Heading = StyledHeading;
Table.Row = Row;
Table.Item = StyledItem;

export default Table;
