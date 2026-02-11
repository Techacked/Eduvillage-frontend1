import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import StatCard from '@/components/StatCard';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  UserPlus,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';

const recentUsers = [
  { name: 'John Doe', email: 'john@email.com', role: 'student', status: 'active', date: '2 hours ago' },
  { name: 'Sarah Smith', email: 'sarah@email.com', role: 'teacher', status: 'pending', date: '5 hours ago' },
  { name: 'Mike Johnson', email: 'mike@email.com', role: 'student', status: 'active', date: '1 day ago' },
  { name: 'Emily Brown', email: 'emily@email.com', role: 'student', status: 'active', date: '2 days ago' },
];

const systemAlerts = [
  { type: 'warning', message: '3 teacher accounts pending approval', action: 'Review' },
  { type: 'info', message: 'System backup completed successfully', action: 'View' },
  { type: 'success', message: 'All security checks passed', action: null },
];

const platformStats = [
  { label: 'Daily Active Users', value: '2,456', change: '+12%' },
  { label: 'Course Enrollments', value: '145', change: '+8%' },
  { label: 'Revenue Today', value: '$3,420', change: '+15%' },
  { label: 'Support Tickets', value: '12', change: '-5%' },
];

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />;
      default:
        return <Clock className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Admin Dashboard 🛡️
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor and manage the EduVillage platform.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/users">
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
            </Link>
            <Link to="/settings">
              <Button className="btn-primary-gradient">
                <Shield className="h-4 w-4 mr-2" />
                System Settings
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value="52,847"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Courses"
            value="1,248"
            icon={BookOpen}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Total Revenue"
            value="$847,620"
            icon={DollarSign}
            trend={{ value: 23, isPositive: true }}
          />
          <StatCard
            title="Growth Rate"
            value="15.8%"
            icon={TrendingUp}
            trend={{ value: 3, isPositive: true }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Platform Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="card-elevated p-6">
              <h3 className="font-semibold text-foreground mb-4">Today's Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {platformStats.map((stat, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    <p className={`text-xs font-medium mt-1 ${
                      stat.change.startsWith('+') ? 'text-success' : 'text-destructive'
                    }`}>
                      {stat.change} vs yesterday
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Users */}
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Recent Users</h3>
                <Link to="/users" className="text-sm text-primary hover:underline">
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user, index) => (
                      <tr key={index} className="border-b border-border last:border-0">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-foreground text-sm">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={user.status === 'active' 
                              ? 'bg-success/10 text-success border-success/20' 
                              : 'bg-warning/10 text-warning border-warning/20'
                            }
                          >
                            {user.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">
                          {user.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* System Alerts */}
            <div className="card-elevated p-6">
              <h3 className="font-semibold text-foreground mb-4">System Alerts</h3>
              <div className="space-y-4">
                {systemAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 pb-4 last:pb-0 last:border-0 border-b border-border"
                  >
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{alert.message}</p>
                      {alert.action && (
                        <button className="text-xs text-primary hover:underline mt-1">
                          {alert.action} →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-elevated p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link to="/users" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add New User
                  </Button>
                </Link>
                <Link to="/manage-courses" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Review Courses
                  </Button>
                </Link>
                <Link to="/analytics" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
                <Link to="/settings" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    System Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
