import { useContext, createContext } from 'react';

const TableContext = createContext();

function Table({ children, $columntemplate }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <TableContext.Provider value={{ $columntemplate }}>{children}</TableContext.Provider>
    </div>
  );
}

function Head({ children }) {
  const { $columntemplate } = useContext(TableContext);
  return (
    <div
      className="grid bg-primary-900 text-white text-sm font-medium py-3 px-6 items-center"
      style={{ gridTemplateColumns: $columntemplate.replace(/_/g, ' ') }}
    >
      {children}
    </div>
  );
}

function Heading({ children, textAlign = 'left' }) {
  const alignClass = textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left';
  return <p className={`tracking-wide ${alignClass} text-[14px] uppercase`}>{children}</p>;
}

function Row({ children, onClick, href }) {
  const { $columntemplate } = useContext(TableContext);
  const Component = href ? 'a' : 'p';

  return (
    <Component
      href={href}
      onClick={onClick}
      className="grid items-center py-3 px-6 gap-3 text-[15px] text-gray-800 border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
      style={{ gridTemplateColumns: $columntemplate.replace(/_/g, ' ') }}
    >
      {children}
    </Component>
  );
}

function Item({ children, textAlign = 'left', textTransform = 'none' }) {
  const alignClass = textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left';
  return <p className={`text-[15px] text-gray-700 ${alignClass} ${textTransform} flex flex-col`}>{children}</p>;
}

function Footer({ children }) {
  return <div className="bg-gray-50 text-gray-600 text-[14px] py-3 px-6 border-t border-gray-200">{children}</div>;
}

function Link({ href, children }) {
  return (
    <a href={href} className="text-black hover:underline font-extralight cursor-pointer transition-colors">
      {children}
    </a>
  );
}

function DeleteLink({ onClick, isDeleting }) {
  return (
    <button
      disabled={isDeleting}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      type="button"
      className="bg-red-100 text-red-700 text-[12px] px-3 py-1 rounded-md hover:underline font-normal transition-colors cursor-pointer"
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}

function DuplicateLink({ onClick, isDuplicating }) {
  return (
    <button
      disabled={isDuplicating}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onClick();
      }}
      type="button"
      className="bg-blue-100 text-blue-600 text-[12px] px-3 py-1 rounded-md hover:underline font-medium transition-colors cursor-pointer"
    >
      {isDuplicating ? 'Duplicating...' : 'Duplicate'}
    </button>
  );
}

Table.Head = Head;
Table.Heading = Heading;
Table.Row = Row;
Table.Item = Item;
Table.Footer = Footer;
Table.Link = Link;
Table.DeleteLink = DeleteLink;
Table.DuplicateLink = DuplicateLink;

export default Table;
