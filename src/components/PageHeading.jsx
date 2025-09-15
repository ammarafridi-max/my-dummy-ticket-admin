export default function PageHeading({ children, className }) {
  return <h1 className={`font-medium text-[32px] ${className}`}>{children}</h1>;
}
