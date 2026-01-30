import { Link } from 'react-router-dom';

export default function PrimaryLink({
  children,
  className,
  size = 'medium',
  ...props
}) {
  let newClassName = className;

  if (size === 'large') {
    newClassName =
      newClassName +
      ` text-center text-white text-[15px] md:text-[18px] no-underline font-medium font-outfit py-3 px-5 rounded-sm capitalize bg-accent-500 hover:bg-accent-600 border border-solid border-accent-500 cursor-pointer duration-300 rounded-sm disabled:bg-accent-500 disabled:opacity-60 disabled:cursor-auto disabled:hover:bg-accent-500`;
  } else if (size === 'small') {
    newClassName =
      newClassName +
      ` text-center text-white text-[12px] md:text-[14px] no-underline font-light font-outfit py-2 px-4 rounded-sm capitalize bg-accent-500 hover:bg-accent-600 border border-solid border-accent-500 cursor-pointer duration-300 rounded-sm disabled:bg-accent-500 disabled:opacity-60 disabled:cursor-auto disabled:hover:bg-accent-500`;
  } else {
    newClassName =
      newClassName +
      ` text-center text-white text-[14px] md:text-[16px] no-underline font-regular font-outfit py-2.5 px-5 rounded-sm capitalize bg-accent-500 hover:bg-accent-600 border border-solid border-accent-500 cursor-pointer duration-300 rounded-sm disabled:bg-accent-500 disabled:opacity-60 disabled:cursor-auto disabled:hover:bg-accent-500`;
  }

  return (
    <Link className={newClassName} {...props}>
      {children}
    </Link>
  );
}
