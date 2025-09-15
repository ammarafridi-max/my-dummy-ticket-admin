export default function Label({ children, className, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-gray-900 uppercase font-medium text-[14px] ${className}`}
    >
      {children}
    </label>
  );
}
