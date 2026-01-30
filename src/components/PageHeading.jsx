export default function PageHeading({ children, className }) {
  return <h1 className={`font-medium text-[28px] mb-3 ${className}`}>{children}</h1>;
}
