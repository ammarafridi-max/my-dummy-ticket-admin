import { useContext } from 'react';
import { createContext } from 'react';

const TableContext = createContext();

function Table({ children, columnTemplate }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <TableContext.Provider value={{ columnTemplate }}>{children}</TableContext.Provider>
    </div>
  );
}

function Head({ children }) {
  const { columnTemplate } = useContext(TableContext);
  return (
    <div
      className={`grid bg-gray-800 text-white gap-2.5 py-2.5 px-5 mb-2.5 items-center`}
      style={{ gridTemplateColumns: columnTemplate.replace(/_/g, ' ') }}
    >
      {children}
    </div>
  );
}

function Heading({ children, textAlign = 'left' }) {
  return <p className={`font-semibold text-[14px] text-${textAlign}`}>{children}</p>;
}

function Row({ children, onClick, href }) {
  const { columnTemplate } = useContext(TableContext);
  return (
    <a
      className={`text-black grid gap-2.5 py-1.5 px-5 mb-1 rounded-sm items-center duration-200 cursor-pointer hover:bg-primary-200`}
      style={{ gridTemplateColumns: columnTemplate.replace(/_/g, ' ') }}
      href={href}
      onClick={onClick}
      columnTemplate={columnTemplate}
    >
      {children}
    </a>
  );
}

function Item({ children, textAlign = 'left', textTransform = 'none' }) {
  return <p className={`text-[14px] text-${textAlign} ${textTransform} flex flex-col`}>{children}</p>;
}

function Footer({ children }) {
  return <div className="bg-gray-800 text-white text-[14px] py-2.5 px-5">{children}</div>;
}

Table = Table;
Table.Head = Head;
Table.Heading = Heading;
Table.Row = Row;
Table.Item = Item;
Table.Footer = Footer;

export default Table;
