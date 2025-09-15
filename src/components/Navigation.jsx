import {
  HiOutlineUsers,
  HiOutlineTicket,
  HiOutlineHome,
  HiArrowRightOnRectangle,
  HiOutlineUser,
} from 'react-icons/hi2';
import { NavLink, useLocation } from 'react-router-dom';
import { PiAirplane } from 'react-icons/pi';
import { useLogout } from '../features/auth/useLogout';
import { useJwtData } from '../services/jwt';

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HiOutlineHome,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Orders',
    href: '/dummy-tickets',
    icon: HiOutlineTicket,
    accessTo: ['admin', 'agent'],
  },
  { name: 'Users', href: '/users', icon: HiOutlineUsers, accessTo: ['admin'] },
  {
    name: 'Airlines',
    href: '/airlines',
    icon: PiAirplane,
    accessTo: ['admin'],
  },
  {
    name: 'My Account',
    href: '/account',
    icon: HiOutlineUser,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Log Out',
    icon: HiArrowRightOnRectangle,
    accessTo: ['admin', 'agent'],
    action: 'logout', // 👈 new flag
  },
];

function SidebarLink({ name, href, Icon, accessTo, action }) {
  const jwtData = useJwtData();
  const { pathname } = useLocation();
  const isActive = href && pathname.startsWith(href);
  const isAllowed = jwtData && accessTo?.includes(jwtData?.role);
  const { logout } = useLogout();

  if (action === 'logout') {
    return (
      <button
        onClick={() => logout()}
        disabled={!isAllowed}
        className={`w-full flex items-center gap-2.5 font-light text-xl p-2.5 mb-1.25 rounded-sm duration-150 hover:bg-gray-100 hover:text-black cursor-pointer ${
          !isAllowed
            ? 'opacity-50 cursor-not-allowed'
            : 'bg-transparent text-white'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="text-[15px]">{name}</span>
      </button>
    );
  }

  return (
    <NavLink
      to={isAllowed ? href : '#'}
      className={`flex items-center gap-2.5 font-light text-xl p-2.5 mb-1.25 rounded-sm duration-150 hover:bg-gray-100 hover:text-black ${
        isActive ? 'bg-gray-100 text-black' : 'bg-transparent text-white'
      } ${!isAllowed ? 'opacity-50' : ''}`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[15px]">{name}</span>
    </NavLink>
  );
}

export default function Navigation() {
  return (
    <div className="h-full bg-gray-900 p-4 flex flex-col justify-center">
      <div>
        {links.map((link, i) => (
          <SidebarLink
            key={i}
            name={link.name}
            href={link.href}
            Icon={link.icon}
            accessTo={link.accessTo}
            action={link.action}
          />
        ))}
      </div>
    </div>
  );
}
