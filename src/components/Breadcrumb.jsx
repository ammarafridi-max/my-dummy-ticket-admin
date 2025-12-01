import { Link } from 'react-router-dom';

export default function Breadcrumb({ paths = [] }) {
  return (
    <nav className="flex items-center text-sm text-gray-600 gap-3">
      {paths.map((path, index) => (
        <div key={index} className="flex items-center gap-3">
          {index !== 0 && <span className="text-gray-400">/</span>}
          {index === paths.length - 1 ? (
            <span className="font-normal text-gray-900">{path.label}</span>
          ) : (
            <Link to={path.href} className="font-light text-gray-500 hover:text-primary-600 transition-colors">
              {path.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
