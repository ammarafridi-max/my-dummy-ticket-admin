import {
  HiOutlineUsers,
  HiOutlineTicket,
  HiOutlineHome,
  HiArrowRightOnRectangle,
  HiOutlineUser,
  HiOutlineRss,
} from 'react-icons/hi2';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HiOutlineHome,
    accessTo: ['admin', 'agent', 'blog-manager'],
  },
  {
    name: 'Orders',
    href: '/dummy-tickets',
    icon: HiOutlineTicket,
    accessTo: ['admin', 'agent'],
  },
  {
    name: 'Blogs',
    href: '/blogs',
    icon: HiOutlineRss,
    accessTo: ['admin', 'blog-manager'],
  },
  { name: 'Users', href: '/users', icon: HiOutlineUsers, accessTo: ['admin', 'userManager'] },
  {
    name: 'My Account',
    href: '/account',
    icon: HiOutlineUser,
    accessTo: ['admin', 'agent', 'blog-manager'],
  },
  {
    name: 'Log Out',
    icon: HiArrowRightOnRectangle,
    action: 'logout',
  },
];

function SidebarLink({ name, href, Icon, accessTo, action }) {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const isActive = href && pathname.startsWith(href);

  if (action === 'logout') {
    return (
      <button
        onClick={() => logout()}
        className={`w-full flex items-center gap-2.5 font-light text-xl p-2.5 mb-1.25 rounded-sm duration-150 cursor-pointer bg-transparent text-white hover:bg-primary-500/60`}
      >
        <Icon className="w-5 h-5" />
        <span className="text-[15px]">{name}</span>
      </button>
    );
  }

  if (!accessTo?.includes(user?.role)) return null;

  return (
    <NavLink
      to={href}
      className={`flex items-center gap-2.5 font-light text-xl p-2.5 mb-1.25 rounded-sm duration-150
        ${isActive ? 'bg-primary-500/100 text-white hover:bg-primary-500/100' : 'bg-transparent text-white hover:bg-primary-500/60'}`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[15px]">{name}</span>
    </NavLink>
  );
}

export default function Navigation() {
  return (
    <div className="h-full bg-primary-900 p-4 flex flex-col justify-center">
      <div>
        {links.map((link, i) => (
          <SidebarLink key={i} name={link.name} href={link.href} Icon={link.icon} accessTo={link.accessTo} action={link.action} />
        ))}
      </div>
    </div>
  );
}
