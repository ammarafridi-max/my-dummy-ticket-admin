export default function DeleteButton({ children, className, type = 'button', ...props }) {
  return (
    <button
      className={`bg-red-500 hover:bg-red-600 duration-300 text-white text-[14px] font-regular px-3 py-2 rounded cursor-pointer disabled:bg-red-300 disabled:hover:bg-red-300 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
