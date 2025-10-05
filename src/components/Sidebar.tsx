import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Home, 
  Upload, 
  FileText, 
  BarChart3, 
  Database, 
  Zap,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Folder,
  Sun,
  Moon,
  Crown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  user: any;
}

const iconMap = {
  home: Home,
  upload: Upload,
  test: FileText,
  results: BarChart3,
  generate: Zap,
  bank: Database,
  analytics: BarChart3,
  lightbulb: Lightbulb,
  folder: Folder,
  crown: Crown
};

export default function Sidebar({ menuItems, collapsed, onCollapse, user }: SidebarProps) {
  const { logout, toggleTheme } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-30 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">stud.ai</span>
              </div>
            )}
            <button
              onClick={() => onCollapse(!collapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* User Profile */}
        {user && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              {!collapsed && (
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              return (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/student' || item.path === '/educator'}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors group ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }`
                    }
                  >
                    <Icon className="h-5 w-5" />
                    {!collapsed && <span className="font-medium">{item.label}</span>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors w-full mb-2"
          >
            {user?.theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            {!collapsed && (
              <span className="font-medium">
                {user?.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            )}
          </button>
          <button
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors w-full"
          >
            <Settings className="h-5 w-5" />
            {!collapsed && <span className="font-medium">Settings</span>}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full mt-2"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
}