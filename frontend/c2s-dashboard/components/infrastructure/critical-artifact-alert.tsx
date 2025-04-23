"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  XCircle, 
  Bell,
  BellOff,
  ExternalLink,
  FileWarning,
  Clock
} from "lucide-react";

interface CriticalArtifact {
  id: string;
  name: string;
  type: string;
  path: string;
  severity: "high" | "critical";
  message: string;
  timestamp: string;
}

interface CriticalArtifactAlertProps {
  className?: string;
  isFullPage?: boolean;
}

export function CriticalArtifactAlert({ className, isFullPage = false }: CriticalArtifactAlertProps) {
  // Sample data for critical artifact alerts
  const [artifacts, setArtifacts] = useState<CriticalArtifact[]>([
    {
      id: "1",
      name: "Dockerfile",
      type: "docker",
      path: "/Dockerfile",
      severity: "high",
      message: "Using deprecated base image. Update to the latest version.",
      timestamp: "2025-04-07T14:30:00Z"
    },
    {
      id: "2",
      name: "deployment.yaml",
      type: "kubernetes",
      path: "/k8s/deployment.yaml",
      severity: "critical",
      message: "No resource limits defined. This could lead to resource exhaustion.",
      timestamp: "2025-04-07T15:45:00Z"
    },
    {
      id: "3",
      name: "main.tf",
      type: "terraform",
      path: "/terraform/main.tf",
      severity: "high",
      message: "Insecure configuration detected. S3 bucket has public access enabled.",
      timestamp: "2025-04-07T16:20:00Z"
    }
  ]);

  const [notifications, setNotifications] = useState(true);

  // Toggle notifications
  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  // Dismiss an alert
  const dismissAlert = (id: string) => {
    setArtifacts(artifacts.filter(artifact => artifact.id !== id));
  };

  // Format timestamp to relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hr ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day ago`;
  };

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <FileWarning className="h-5 w-5" />
              Critical Artifact Alerts
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleNotifications}
              title={notifications ? "Disable notifications" : "Enable notifications"}
            >
              {notifications ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {artifacts.length > 0 ? (
            <div className="space-y-3">
              {artifacts.map((artifact) => (
                <div 
                  key={artifact.id} 
                  className={`rounded-lg border p-3 ${
                    artifact.severity === "critical" ? "border-red-200 bg-red-50 dark:bg-red-900/10" : 
                    "border-amber-200 bg-amber-50 dark:bg-amber-900/10"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      {artifact.severity === "critical" ? 
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" /> : 
                        <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                      }
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{artifact.name}</h3>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              artifact.severity === "critical" ? "bg-red-50 text-red-700 border-red-200" : 
                              "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {artifact.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{artifact.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground">{artifact.path}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatRelativeTime(artifact.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0"
                        title="View details"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-7 w-7 p-0"
                        title="Dismiss"
                        onClick={() => dismissAlert(artifact.id)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <FileWarning className="h-10 w-10 text-muted-foreground mb-3 opacity-50" />
              <h3 className="text-sm font-medium mb-1">No Critical Alerts</h3>
              <p className="text-xs text-muted-foreground max-w-xs">
                There are no critical issues with your infrastructure artifacts at this time.
              </p>
            </div>
          )}
          
          {!isFullPage && artifacts.length > 0 && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <span>
                <ExternalLink className="h-4 w-4 mr-2" />
                View All Alerts
              </span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
