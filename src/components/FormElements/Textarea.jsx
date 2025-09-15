function Textarea({
  value,
  id,
  placeholder,
  onChange,
  disabled,
  cols,
  rows,
  className,
}) {
  return (
    <textarea
      className={`bg-white rounded-sm w-full py-2.5 px-5 text-[14px] border-1 border-gray-300 outline-0 ${className}`}
      value={value}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      cols={cols}
      rows={rows || 10}
    />
  );
}

export default Textarea;
