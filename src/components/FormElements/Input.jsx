import { forwardRef } from 'react';

const Input = forwardRef(function Input({ className = '', error = false, readOnly, ...props }, ref) {
  return (
    <input
      ref={ref}
      readOnly={readOnly} // make sure readOnly works properly
      aria-invalid={error ? 'true' : 'false'}
      className={`
        bg-white w-full rounded-md text-[14px] font-light
        py-2.5 px-3 border outline-none transition-all duration-150
        ${error ? 'border-red-500 focus:border-red-500' : 'border-gray-300'}
        ${readOnly ? 'bg-gray-50 cursor-not-allowed' : ''}
        ${props.disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
        focus:ring-2 focus:ring-blue-200 focus:border-blue-500
        ${className}
      `}
      {...props}
    />
  );
});

export default Input;
