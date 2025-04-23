"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldAlert, 
  RefreshCw,
  ExternalLink,
  XCircle,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Key
} from "lucide-react";

interface SecurityIssue {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  category: "vulnerability" | "misconfiguration" | "secret" | "compliance";
  resource: string;
  status: "open" | "in_progress" | "resolved";
  createdAt: string;
}

interface SecurityAlertsProps {
  className?: string;
  isFullPage?: boolean;
}

export function SecurityAlerts({ className, isFullPage = false }: SecurityAlertsProps) {
  // Sample data for security alerts
  const [issues, setIssues] = useState<SecurityIssue[]>([
    {
      id: "sec-1",
      title: "Exposed API key in configuration file",
      description: "An API key was found in a configuration file that is not encrypted or secured.",
      severity: "critical",
      category: "secret",
      resource: "/config/production.env",
      status: "open",
      createdAt: "2025-04-06T10:30:00Z"
    },
    {
      id: "sec-2",
      title: "Container running as root",
      description: "Docker container is configured to run as root, which is a security risk.",
      severity: "high",
      category: "misconfiguration",
      resource: "/Dockerfile",
      status: "in_progress",
      createdAt: "2025-04-05T14:15:00Z"
    },
    {
      id: "sec-3",
      title: "Outdated dependency with known vulnerabilities",
      description: "The application is using a dependency with known security vulnerabilities.",
      severity: "high",
      category: "vulnerability",
      resource: "/package.json",
      status: "open",
      createdAt: "2025-04-07T09:45:00Z"
    },
    {
      id: "sec-4",
      title: "Insecure S3 bucket configuration",
      description: "S3 bucket has public read access enabled, which could expose sensitive data.",
      severity: "critical",
      category: "misconfiguration",
      resource: "/terraform/storage.tf",
      status: "open",
      createdAt: "2025-04-06T16:20:00Z"
    },
    {
      id: "sec-5",
      title: "Missing HTTPS configuration",
      description: "Application is configured to use HTTP instead of HTTPS for communication.",
      severity: "medium",
      category: "compliance",
      resource: "/k8s/ingress.yaml",
      status: "resolved",
      createdAt: "2025-04-04T11:10:00Z"
    }
  ]);

  // Refresh security alerts data
  const refreshData = () => {
    console.log("Refreshing security alerts data...");
    // In a real application, this would fetch updated data from an API
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Get severity badge
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
      case "high":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get category badge
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "vulnerability":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Vulnerability</Badge>;
      case "misconfiguration":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Misconfiguration</Badge>;
      case "secret":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Secret</Badge>;
      case "compliance":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Compliance</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Open</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "in_progress":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case "resolved":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  // Filter issues by status
  const openIssues = issues.filter(issue => issue.status === "open");
  const inProgressIssues = issues.filter(issue => issue.status === "in_progress");
  const resolvedIssues = issues.filter(issue => issue.status === "resolved");

  // Count issues by severity
  const criticalCount = issues.filter(issue => issue.severity === "critical" && issue.status !== "resolved").length;
  const highCount = issues.filter(issue => issue.severity === "high" && issue.status !== "resolved").length;
  const mediumCount = issues.filter(issue => issue.severity === "medium" && issue.status !== "resolved").length;
  const lowCount = issues.filter(issue => issue.severity === "low" && issue.status !== "resolved").length;

  // Display issues based on full page or card view
  const displayIssues = isFullPage ? issues : issues.filter(issue => issue.status !== "resolved").slice(0, 3);

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Security Alerts
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-sm font-medium">{criticalCount} Critical</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-amber-500"></div>
              <span className="text-sm font-medium">{highCount} High</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm font-medium">{mediumCount} Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-sm font-medium">{lowCount} Low</span>
            </div>
          </div>
          
          {displayIssues.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {displayIssues.map((issue) => (
                <div 
                  key={issue.id} 
                  className={`rounded-lg border p-3 ${
                    issue.status === "resolved" ? "bg-gray-50 dark:bg-gray-900/10" :
                    issue.severity === "critical" ? "border-red-200 bg-red-50 dark:bg-red-900/10" : 
                    issue.severity === "high" ? "border-amber-200 bg-amber-50 dark:bg-amber-900/10" :
                    "border-gray-200 bg-gray-50 dark:bg-gray-900/10"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      {issue.category === "secret" ? 
                        <Key className={`h-5 w-5 ${issue.status === "resolved" ? "text-gray-400" : "text-red-500"} mt-0.5`} /> : 
                        <Lock className={`h-5 w-5 ${issue.status === "resolved" ? "text-gray-400" : 
                          issue.severity === "critical" ? "text-red-500" : 
                          issue.severity === "high" ? "text-amber-500" : 
                          "text-yellow-500"} mt-0.5`} />
                      }
                      <div>
                        <h3 className={`font-medium ${issue.status === "resolved" ? "text-gray-500" : ""}`}>{issue.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {getSeverityBadge(issue.severity)}
                          {getCategoryBadge(issue.category)}
                          {getStatusBadge(issue.status)}
                          <span className="text-xs text-muted-foreground">{issue.resource}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-1">
                      {getStatusIcon(issue.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <ShieldAlert className="h-10 w-10 text-muted-foreground mb-3 opacity-50" />
              <h3 className="text-sm font-medium mb-1">No Security Issues</h3>
              <p className="text-xs text-muted-foreground max-w-xs">
                There are no security issues detected in your infrastructure at this time.
              </p>
            </div>
          )}
          
          {!isFullPage && issues.length > 3 && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <span>
                <ExternalLink className="h-4 w-4 mr-2" />
                View All Security Alerts
              </span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
