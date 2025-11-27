export default function LinkButton({ children, className, type = 'button', ...props }) {
  return (
    <button
      className={`bg-transparent duration-300 text-primary-500 text-[14px] font-regular px-5 py-2 rounded cursor-pointer disabled:bg-primary-300 disabled:hover:bg-primary-300 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
