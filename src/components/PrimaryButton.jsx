export default function accentButton({
  children,
  className = '',
  size = 'medium',
  color = 'primary',
  ...props
}) {
  let newClassName =
    'text-center no-underline font-outfit rounded-sm capitalize border border-solid cursor-pointer duration-300 disabled:opacity-60 disabled:cursor-auto ' +
    className;

  if (color === 'success') {
    newClassName =
      newClassName +
      ' text-white bg-green-600 hover:bg-green-700 border-green-600 disabled:bg-green-500 disabled:hover:bg-green-700';
  } else if (color === 'primary') {
    newClassName =
      newClassName +
      ' text-white bg-accent-500 hover:bg-accent-600 border-accent-500 disabled:bg-accent-500 disabled:hover:bg-accent-500';
  }

  if (size === 'large') {
    newClassName =
      newClassName + `  text-[15px] md:text-[18px] font-medium  py-3 px-5`;
  } else if (size === 'small') {
    newClassName =
      newClassName + ` text-[12px] md:text-[14px] font-light py-2 px-4`;
  } else {
    newClassName =
      newClassName + ` text-[14px] md:text-[16px] font-regular py-2.5 px-5`;
  }

  return (
    <button className={newClassName} {...props}>
      {children}
    </button>
  );
}
