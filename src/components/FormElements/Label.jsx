export default function Label({ children, className, htmlFor, textColor = 'text-gray-900' }) {
  return (
    <label htmlFor={htmlFor} className={`${textColor} uppercase font-medium text-[14px] ${className}`}>
      {children}
    </label>
  );
}
