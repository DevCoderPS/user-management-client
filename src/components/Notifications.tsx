import React from "react";
import { useNotificationStore } from "../store/notificationStore";
import { CircleCheck, Info, TriangleAlert, X, XCircle } from "lucide-react";

export const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotificationStore();

  const icons = {
    success: <CircleCheck className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <TriangleAlert className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />,
  };

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const iconColors = {
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
    info: "text-blue-400",
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((notification) => {
        const Icon = icons[notification.type];

        return (
          <div
            key={notification.id}
            className={`border rounded-lg p-4 shadow-lg transition-all duration-300 transform ${
              colors[notification.type]
            }`}
          >
            <div className="flex items-start">
              <div
                className={`flex-shrink-0 w-5 h-5 mt-0.5 mr-3 ${
                  iconColors[notification.type]
                }`}
              >
                {Icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-sm opacity-90 mt-1">
                  {notification.message}
                </p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 ml-2 opacity-60 hover:opacity-100 transition-opacity"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
