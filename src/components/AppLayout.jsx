import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

export default function AppLayout() {
  return (
    <div className="h-dvh w-full grid grid-cols-[2fr_10fr] bg-black m-0 p-0">
      <Navigation />
      <div className="bg-gray-100 p-10 overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
}
