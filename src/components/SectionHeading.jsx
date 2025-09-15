export default function SectionHeading({ className, children }) {
  return (
    <h2 className={`font-medium text-2xl capitalize mb-4 ${className}`}>
      {children}
    </h2>
  );
}
