export default function NeutralPill({ children, width = 'fit-content' }) {
  return (
    <span className="bg-gray-100 text-gray-800 font-bold rounded-full text-[12px] py-2">
      {children}
    </span>
  );
}
