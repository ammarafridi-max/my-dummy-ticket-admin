export default function SuccessPill({ children, width = 'fit-content' }) {
  return (
    <span className="bg-green-100 text-green-800 font-bold rounded-full text-[12px] py-2">
      {children}
    </span>
  );
}
