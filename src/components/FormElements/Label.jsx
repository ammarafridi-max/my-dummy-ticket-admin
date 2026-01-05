export default function Label({
  children,
  className = '',
  htmlFor,
  required = false,
  error = false,
  textColor = 'text-gray-800',
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={`
        block mb-1 tracking-wide
        text-[13px] font-normal uppercase
        ${error ? 'text-red-600' : textColor}
        ${className}
      `}
    >
      {children}
      {required && <span className="text-red-600 ml-1">*</span>}
    </label>
  );
}
