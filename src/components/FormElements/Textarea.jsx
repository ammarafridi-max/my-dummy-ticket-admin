import { forwardRef } from 'react';

const Textarea = forwardRef(function Textarea({ className = '', ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={`font-light bg-white rounded-sm w-full py-2 px-3 text-[14px] border-1 border-gray-300 outline-0 ${className}`}
      {...props}
    />
  );
});

export default Textarea;
