import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  FileText,
  Users,
  BarChart3,
  Settings,
  Bell,
  PlusCircle,
  FolderOpen,
  ClipboardList,
  TrendingUp,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  // Student items
  { label: 'Dashboard', href: '/dashboard/student', icon: LayoutDashboard, roles: ['student'] },
  { label: 'All Courses', href: '/courses', icon: BookOpen, roles: ['student'] },
  { label: 'School Courses', href: '/school-courses', icon: GraduationCap, roles: ['student'] },
  { label: 'My Courses', href: '/enrolled-courses', icon: FolderOpen, roles: ['student'] },
  { label: 'Assignments', href: '/assignments', icon: ClipboardList, roles: ['student'] },
  { label: 'Assessments', href: '/assessments', icon: FileText, roles: ['student'] },
  { label: 'Community', href: '/community', icon: MessageCircle, roles: ['student'] },
  { label: 'Progress', href: '/progress', icon: TrendingUp, roles: ['student'] },
  
  // Teacher items
  { label: 'Dashboard', href: '/dashboard/teacher', icon: LayoutDashboard, roles: ['teacher'] },
  { label: 'Create Course', href: '/create-course', icon: PlusCircle, roles: ['teacher'] },
  { label: 'My Courses', href: '/manage-courses', icon: FolderOpen, roles: ['teacher'] },
  { label: 'Students', href: '/teacher/students', icon: Users, roles: ['teacher'] },
  
  // Admin items
  { label: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard, roles: ['admin'] },
  { label: 'Users', href: '/users', icon: Users, roles: ['admin'] },
  { label: 'Courses', href: '/manage-courses', icon: BookOpen, roles: ['admin'] },
  { label: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['admin'] },
  
  // Common items
  { label: 'Notifications', href: '/notifications', icon: Bell, roles: ['student', 'teacher', 'admin'] },
  { label: 'Settings', href: '/settings', icon: Settings, roles: ['student', 'teacher', 'admin'] },
  { label: 'Help', href: '/help', icon: HelpCircle, roles: ['student', 'teacher', 'admin'] },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const filteredItems = navItems.filter((item) => item.roles.includes(user.role));

  // Group items by category
  const mainItems = filteredItems.filter(
    (item) => !['Notifications', 'Settings', 'Help'].includes(item.label)
  );
  const bottomItems = filteredItems.filter((item) =>
    ['Notifications', 'Settings', 'Help'].includes(item.label)
  );

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-sidebar overflow-y-auto',
        className
      )}
    >
      <div className="flex flex-col h-full py-6">
        {/* User Info */}
        <div className="px-4 mb-6">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Main Menu
          </p>
          {mainItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="px-3 pt-4 border-t border-sidebar-border mt-auto">
          <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Support
          </p>
          {bottomItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
