export default function PrimaryButtonOutline({
  children,
  className = '',
  size = 'medium',
  ...props
}) {
  let newClassName = className;

  if (size === 'large') {
    newClassName =
      newClassName +
      `text-center text-accent-500 text-[15px] md:text-[18px] no-underline font-medium font-outfit py-3 px-5 rounded-sm capitalize border-2 border-solid border-accent-500 bg-transparent hover:bg-accent-600 hover:text-white hover:border-accent-600 cursor-pointer duration-300 shadow disabled:bg-accent-600 disabled:text-white disabled:opacity-50 disabled:cursor-auto`;
  } else if (size === 'small') {
    newClassName =
      newClassName +
      `text-center text-accent-500 text-[12px] md:text-[14px] no-underline font-medium font-outfit py-2 px-4 rounded-sm capitalize border-2 border-solid border-accent-500 bg-transparent hover:bg-accent-600 hover:text-white hover:border-accent-600 cursor-pointer duration-300 shadow disabled:bg-accent-600 disabled:text-white disabled:opacity-50 disabled:cursor-auto`;
  } else {
    newClassName =
      newClassName +
      `text-center text-accent-500 text-[14px] md:text-[16px] no-underline font-medium font-outfit py-2.5 px-5 rounded-sm capitalize border-2 border-solid border-accent-500 bg-transparent hover:bg-accent-600 hover:text-white hover:border-accent-600 cursor-pointer duration-300 shadow disabled:bg-accent-600 disabled:text-white disabled:opacity-50 disabled:cursor-auto`;
  }

  return (
    <button className={newClassName} {...props}>
      {children}
    </button>
  );
}
