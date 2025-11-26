import { forwardRef } from 'react';

const Textarea = forwardRef(function Textarea({ className = '', ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={`bg-white rounded-sm w-full py-2.5 px-5 text-[14px] border-1 border-gray-300 outline-0 ${className}`}
      {...props}
    />
  );
});

export default Textarea;
