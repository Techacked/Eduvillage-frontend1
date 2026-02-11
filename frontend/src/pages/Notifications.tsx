import React from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from "@/components/DashboardLayout";
import { Bell, CheckCircle2, Clock } from "lucide-react";

const Notifications = () => {
  const { notifications, isLoading, unreadCount } = useNotifications();

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400">Loading notifications...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="h-8 w-8 text-blue-600" />
            Notifications
          </h1>
          {unreadCount > 0 && (
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {notifications.length === 0 ? (
          <Card className="dark:bg-[#1E293B] dark:border-gray-700">
            <CardContent className="py-12 text-center">
              <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No notifications yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notifications.map((n) => (
              <Card
                key={n._id}
                className={`dark:bg-[#1E293B] dark:border-gray-700 ${
                  !n.read ? "border-l-4 border-l-blue-600" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg dark:text-white flex items-center gap-2">
                      {!n.read && (
                        <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                      )}
                      {n.title}
                    </CardTitle>
                    {!n.read ? (
                      <Badge className="bg-blue-600">New</Badge>
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {n.message}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(n.createdAt).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
