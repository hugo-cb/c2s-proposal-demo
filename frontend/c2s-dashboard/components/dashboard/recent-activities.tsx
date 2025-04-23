"use client";

import { 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  XCircle,
  AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Example data for recent activities
const activities = [
  {
    id: "1",
    project: "E-commerce Platform",
    activity: "Architecture Analysis",
    timestamp: "30 minutes ago",
    status: "completed",
  },
  {
    id: "2",
    project: "Banking System",
    activity: "Code Quality Check",
    timestamp: "2 hours ago",
    status: "in-progress",
  },
  {
    id: "3",
    project: "CRM System",
    activity: "Infrastructure Scan",
    timestamp: "5 hours ago",
    status: "failed",
  },
  {
    id: "4",
    project: "Mobile Banking App",
    activity: "Business Alignment",
    timestamp: "1 day ago",
    status: "warning",
  },
  {
    id: "5",
    project: "Healthcare Portal",
    activity: "Full Analysis",
    timestamp: "2 days ago",
    status: "completed",
  },
];

const statusMap = {
  "completed": {
    label: "Completed",
    icon: CheckCircle2,
    variant: "success",
  },
  "in-progress": {
    label: "In Progress",
    icon: Clock,
    variant: "default",
  },
  "failed": {
    label: "Failed",
    icon: XCircle,
    variant: "destructive",
  },
  "warning": {
    label: "Warning",
    icon: AlertTriangle,
    variant: "warning",
  },
};

export function RecentActivities() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Activities</h2>
        <a href="#" className="flex items-center text-sm text-primary">
          View all
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </a>
      </div>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Activity</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => {
              const status = statusMap[activity.status as keyof typeof statusMap];
              const StatusIcon = status.icon;
              
              return (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.project}</TableCell>
                  <TableCell>{activity.activity}</TableCell>
                  <TableCell>{activity.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant={status.variant as any} className="flex items-center gap-1">
                      <StatusIcon className="h-3 w-3" />
                      <span>{status.label}</span>
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
