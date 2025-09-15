export default function DangerPill({ children, width = 'fit-content' }) {
  return (
    <span className="bg-red-100 text-red-800 font-bold rounded-full text-[12px] py-2">
      {children}
    </span>
  );
}
