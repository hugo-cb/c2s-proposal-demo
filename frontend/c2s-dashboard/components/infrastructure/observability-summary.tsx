"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  BarChart2, 
  RefreshCw,
  ExternalLink,
  Check,
  AlertTriangle,
  Activity,
  Bell,
  FileText,
  Search,
  BarChart
} from "lucide-react";

interface ObservabilityMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: "good" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  change: number;
}

interface LoggingSystem {
  id: string;
  name: string;
  type: string;
  status: "active" | "inactive" | "degraded";
  retention: string;
  volume: string;
  lastChecked: string;
}

interface MonitoringAlert {
  id: string;
  name: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "active" | "acknowledged" | "resolved";
  source: string;
  timestamp: string;
  description: string;
}

interface ObservabilitySummaryProps {
  className?: string;
  isFullPage?: boolean;
}

export function ObservabilitySummary({ className, isFullPage = false }: ObservabilitySummaryProps) {
  // Sample data for observability metrics
  const [metrics, setMetrics] = useState<ObservabilityMetric[]>([
    {
      id: "m1",
      name: "API Response Time",
      value: 245,
      unit: "ms",
      status: "warning",
      trend: "up",
      change: 15
    },
    {
      id: "m2",
      name: "Error Rate",
      value: 0.5,
      unit: "%",
      status: "good",
      trend: "down",
      change: -0.2
    },
    {
      id: "m3",
      name: "CPU Utilization",
      value: 68,
      unit: "%",
      status: "warning",
      trend: "up",
      change: 12
    },
    {
      id: "m4",
      name: "Memory Usage",
      value: 72,
      unit: "%",
      status: "warning",
      trend: "up",
      change: 8
    },
    {
      id: "m5",
      name: "Disk Space",
      value: 45,
      unit: "%",
      status: "good",
      trend: "stable",
      change: 2
    },
    {
      id: "m6",
      name: "Request Rate",
      value: 1250,
      unit: "req/min",
      status: "good",
      trend: "up",
      change: 50
    }
  ]);

  // Sample data for logging systems
  const [loggingSystems, setLoggingSystems] = useState<LoggingSystem[]>([
    {
      id: "l1",
      name: "Application Logs",
      type: "ELK Stack",
      status: "active",
      retention: "30 days",
      volume: "15 GB/day",
      lastChecked: "2025-04-07T16:30:00Z"
    },
    {
      id: "l2",
      name: "Infrastructure Logs",
      type: "CloudWatch",
      status: "active",
      retention: "14 days",
      volume: "8 GB/day",
      lastChecked: "2025-04-07T16:30:00Z"
    },
    {
      id: "l3",
      name: "Security Logs",
      type: "Splunk",
      status: "active",
      retention: "90 days",
      volume: "5 GB/day",
      lastChecked: "2025-04-07T16:30:00Z"
    },
    {
      id: "l4",
      name: "Database Audit Logs",
      type: "CloudWatch",
      status: "degraded",
      retention: "7 days",
      volume: "2 GB/day",
      lastChecked: "2025-04-07T16:30:00Z"
    }
  ]);

  // Sample data for monitoring alerts
  const [alerts, setAlerts] = useState<MonitoringAlert[]>([
    {
      id: "a1",
      name: "High API Latency",
      severity: "high",
      status: "active",
      source: "API Gateway",
      timestamp: "2025-04-07T16:15:00Z",
      description: "API response time exceeding 200ms threshold for more than 5 minutes."
    },
    {
      id: "a2",
      name: "High CPU Usage",
      severity: "medium",
      status: "active",
      source: "Web Server",
      timestamp: "2025-04-07T16:00:00Z",
      description: "CPU utilization above 70% for more than 10 minutes."
    },
    {
      id: "a3",
      name: "Database Connection Errors",
      severity: "critical",
      status: "acknowledged",
      source: "Database",
      timestamp: "2025-04-07T15:45:00Z",
      description: "Multiple failed connection attempts to the primary database."
    },
    {
      id: "a4",
      name: "Low Disk Space",
      severity: "low",
      status: "resolved",
      source: "Log Server",
      timestamp: "2025-04-07T14:30:00Z",
      description: "Disk space below 20% on log server."
    }
  ]);

  // Refresh observability data
  const refreshData = () => {
    console.log("Refreshing observability data...");
    // In a real application, this would fetch updated data from an API
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
      case "active":
      case "resolved":
        return <Check className="h-5 w-5 text-green-500" />;
      case "warning":
      case "degraded":
      case "acknowledged":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "critical":
      case "inactive":
        return <Bell className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "good":
      case "active":
      case "resolved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          {status === "good" ? "Good" : status === "active" ? "Active" : "Resolved"}
        </Badge>;
      case "warning":
      case "degraded":
      case "acknowledged":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          {status === "warning" ? "Warning" : status === "degraded" ? "Degraded" : "Acknowledged"}
        </Badge>;
      case "critical":
      case "inactive":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          {status === "critical" ? "Critical" : "Inactive"}
        </Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
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

  // Get trend icon and class
  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up") {
      return {
        icon: <span className={`text-xs ${change > 0 ? "text-red-500" : "text-green-500"}`}>↑ {Math.abs(change)}</span>,
        class: change > 0 ? "text-red-500" : "text-green-500"
      };
    } else if (trend === "down") {
      return {
        icon: <span className={`text-xs ${change < 0 ? "text-green-500" : "text-red-500"}`}>↓ {Math.abs(change)}</span>,
        class: change < 0 ? "text-green-500" : "text-red-500"
      };
    } else {
      return {
        icon: <span className="text-xs text-gray-500">→ {Math.abs(change)}</span>,
        class: "text-gray-500"
      };
    }
  };

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Observability Summary
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="metrics" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="metrics" className="flex items-center gap-1">
              <BarChart2 className="h-4 w-4" />
              <span>Metrics</span>
            </TabsTrigger>
            <TabsTrigger value="logging" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Logging</span>
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              <span>Alerts</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="metrics" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {metrics.map((metric) => (
                <div 
                  key={metric.id} 
                  className={`rounded-lg border p-3 ${
                    metric.status === "good" ? "border-green-200 bg-green-50/50 dark:bg-green-900/10" : 
                    metric.status === "warning" ? "border-amber-200 bg-amber-50/50 dark:bg-amber-900/10" : 
                    "border-red-200 bg-red-50/50 dark:bg-red-900/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">{metric.name}</div>
                    {getStatusIcon(metric.status)}
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold">
                      {metric.value}{metric.unit}
                    </div>
                    <div className="flex items-center">
                      {getTrendIcon(metric.trend, metric.change).icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {!isFullPage && (
              <div className="flex justify-center">
                <Button variant="outline" size="sm" className="w-full md:w-auto" asChild>
                  <span>
                    <BarChart className="h-4 w-4 mr-2" />
                    View Detailed Metrics
                  </span>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="logging" className="space-y-4">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="px-4 py-2 text-left font-medium">Logging System</th>
                      <th className="px-4 py-2 text-left font-medium">Type</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                      <th className="px-4 py-2 text-left font-medium">Retention</th>
                      <th className="px-4 py-2 text-left font-medium">Volume</th>
                      <th className="px-4 py-2 text-right font-medium">Last Checked</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loggingSystems.map((system) => (
                      <tr key={system.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-2 font-medium">{system.name}</td>
                        <td className="px-4 py-2">{system.type}</td>
                        <td className="px-4 py-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(system.status)}
                            {getStatusBadge(system.status)}
                          </div>
                        </td>
                        <td className="px-4 py-2">{system.retention}</td>
                        <td className="px-4 py-2">{system.volume}</td>
                        <td className="px-4 py-2 text-right text-xs text-muted-foreground">
                          {formatDate(system.lastChecked)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {!isFullPage && (
              <div className="flex justify-center">
                <Button variant="outline" size="sm" className="w-full md:w-auto" asChild>
                  <span>
                    <Search className="h-4 w-4 mr-2" />
                    Search Logs
                  </span>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-4">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`rounded-lg border p-3 ${
                    alert.status === "resolved" ? "border-gray-200 bg-gray-50/50 dark:bg-gray-900/10" :
                    alert.severity === "critical" ? "border-red-200 bg-red-50/50 dark:bg-red-900/10" : 
                    alert.severity === "high" ? "border-amber-200 bg-amber-50/50 dark:bg-amber-900/10" : 
                    alert.severity === "medium" ? "border-yellow-200 bg-yellow-50/50 dark:bg-yellow-900/10" :
                    "border-blue-200 bg-blue-50/50 dark:bg-blue-900/10"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      {getStatusIcon(alert.status === "resolved" ? "resolved" : alert.severity)}
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{alert.name}</h3>
                          {getSeverityBadge(alert.severity)}
                          {getStatusBadge(alert.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <span>Source: {alert.source}</span>
                          <span>•</span>
                          <span>{formatDate(alert.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {!isFullPage && (
              <div className="flex justify-center">
                <Button variant="outline" size="sm" className="w-full md:w-auto" asChild>
                  <span>
                    <Bell className="h-4 w-4 mr-2" />
                    View All Alerts
                  </span>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
