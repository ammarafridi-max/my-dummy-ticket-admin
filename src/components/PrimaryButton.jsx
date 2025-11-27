export default function PrimaryButton({ children, className, type = 'button', ...props }) {
  return (
    <button
      className={`bg-primary-500 hover:bg-primary-600 duration-300 text-white text-[14px] font-regular px-5 py-2 rounded cursor-pointer disabled:bg-primary-300 disabled:hover:bg-primary-300 ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
