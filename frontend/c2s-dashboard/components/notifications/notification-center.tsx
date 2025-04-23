"use client";

import { useState } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Example notification data
const notifications = [
  {
    id: "1",
    title: "Architecture analysis completed",
    description: "Architecture analysis for E-commerce Platform was successfully completed.",
    timestamp: "30 minutes ago",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "Code quality alert",
    description: "Detected 5 new critical code smells in the payment module.",
    timestamp: "2 hours ago",
    read: false,
    type: "warning",
  },
  {
    id: "3",
    title: "New critical artifact detected",
    description: "Identified new critical artifact in the authentication module.",
    timestamp: "5 hours ago",
    read: false,
    type: "info",
  },
  {
    id: "4",
    title: "Infrastructure analysis failed",
    description: "Infrastructure analysis for CRM System failed. Check logs for details.",
    timestamp: "1 day ago",
    read: true,
    type: "error",
  },
  {
    id: "5",
    title: "Business expectation updated",
    description: "Business expectations for Mobile Banking App have been updated.",
    timestamp: "2 days ago",
    read: true,
    type: "info",
  },
];

const typeColors = {
  success: "bg-green-500/10 text-green-500 border-green-500/20",
  warning: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  error: "bg-red-500/10 text-red-500 border-red-500/20",
  info: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

export function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [notificationState, setNotificationState] = useState(notifications);
  
  const unreadCount = notificationState.filter((n) => !n.read).length;
  
  const markAllAsRead = () => {
    setNotificationState(notificationState.map(n => ({ ...n, read: true })));
  };
  
  const markAsRead = (id: string) => {
    setNotificationState(
      notificationState.map(n => 
        n.id === id ? { ...n, read: true } : n
      )
    );
  };
  
  const dismissNotification = (id: string) => {
    setNotificationState(notificationState.filter(n => n.id !== id));
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>Notifications</SheetTitle>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
          )}
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {notificationState.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No notifications</h3>
              <p className="text-sm text-muted-foreground mt-1">
                You don't have any notifications at the moment.
              </p>
            </div>
          ) : (
            notificationState.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "relative rounded-lg border p-4",
                  notification.read ? "bg-background" : "bg-muted/40",
                  typeColors[notification.type as keyof typeof typeColors]
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {notification.timestamp}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => dismissNotification(notification.id)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute bottom-2 right-2 h-6 text-xs"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
