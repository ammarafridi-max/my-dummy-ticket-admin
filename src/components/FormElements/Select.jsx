import { forwardRef } from 'react';

const Select = forwardRef(function Select(
  { children, className = '', ...props },
  ref
) {
  return (
    <select
      ref={ref}
      className={`bg-white rounded-sm w-full py-2 px-5 text-[14px] border border-gray-300 outline-0 disabled:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
});

// const Select = styled.select`
//   background-color: white;
//   box-sizing: border-box;
//   outline: none;
//   border: none;
//   border-radius: 3px;
//   width: 100%;
//   padding: 10px 20px;
//   font-size: 15px;

//   &:disabled {
//     background-color: var(--grey-color-200);
//   }
// `;

export default Select;
