import { LayoutDashboard, FileText, BarChart2, Settings, Loader2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useGetProfileData } from '../../features/profile/hooks/profileDataHook';
import { useLogout } from '../../features/auth/hooks/authHook';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/dashboard' },
    { name: 'My Interviews', icon: <FileText size={18} />, path: '/interviews' },
    { name: 'Sessions', icon: <BarChart2 size={18} />, path: '/sessions' },
    { name: 'Settings', icon: <Settings size={18} />, path: '/settings' },
  ];

  const { firstName, lastName, loadingProfileData } = useGetProfileData();
  const { logout, loggingOut } = useLogout();

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <aside className="hidden lg:flex w-64 border-r border-gray-800 bg-[#0B0F19] flex-col justify-between h-screen sticky top-0">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="p-6 mb-4">
          <h2 className="text-xl font-bold tracking-tight text-white font-inter">
            Interviu<span className="text-[#00E599]">.</span>
          </h2>
          <p className="text-[10px] text-gray-400 font-medium tracking-widest mt-1 uppercase">
            Voice AI
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors border-l-2 border-[#00E599] text-[#00E599] bg-[#00E599]/5'
                  : 'flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors border-l-2 border-transparent text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
              }
            >
              {item.icon}
              <span className="text-sm font-semibold">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section - Profile & Logout */}
      <div className="p-6 space-y-4">
        {loadingProfileData ? (
          <div className="flex items-center justify-between border border-gray-800 bg-[#111623]/40 rounded-lg p-3 animate-pulse">
            <div className="h-4 bg-gray-800 rounded w-24"></div>
            <div className="w-8 h-8 rounded-full bg-gray-800"></div>
          </div>
        ) : (
          <div className="flex items-center justify-between border border-gray-800 bg-[#111623] rounded-lg p-3 cursor-pointer hover:border-gray-700 transition-colors">
            <span className="text-xs font-bold text-white truncate max-w-[140px]">
              {firstName} {lastName}
            </span>
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#00E599] to-blue-500 border border-gray-700 flex items-center justify-center text-[10px] font-black text-white uppercase select-none">
              {initials || '?'}
            </div>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={() => logout()}
          disabled={loggingOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-[10px] font-black tracking-widest text-rose-400 hover:text-rose-300 uppercase transition-all duration-300 disabled:opacity-50"
        >
          {loggingOut ? (
            <>
              <Loader2 size={12} className="animate-spin" />
              <span>Logging Out...</span>
            </>
          ) : (
            <span>Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
}
