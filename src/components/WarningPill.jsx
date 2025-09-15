export default function WarningPill({ children, width = 'fit-content' }) {
  return (
    <span className="bg-orange-100 text-orange-800 font-bold rounded-full text-[12px] py-2">
      {children}
    </span>
  );
}
