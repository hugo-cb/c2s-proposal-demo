"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Link as LinkIcon, 
  RefreshCw,
  ExternalLink,
  Check,
  AlertTriangle,
  XCircle,
  Globe,
  Database,
  Cloud,
  Clock,
  ArrowUpDown
} from "lucide-react";

interface Dependency {
  id: string;
  name: string;
  type: "api" | "database" | "storage" | "service" | "cdn";
  provider: string;
  endpoint: string;
  status: "healthy" | "degraded" | "down" | "unknown";
  latency: number; // in ms
  lastChecked: string;
  usedIn: string[];
}

interface ExternalDependenciesProps {
  className?: string;
  isFullPage?: boolean;
}

export function ExternalDependencies({ className, isFullPage = false }: ExternalDependenciesProps) {
  // Sample data for external dependencies
  const [dependencies, setDependencies] = useState<Dependency[]>([
    {
      id: "d1",
      name: "Payment Gateway API",
      type: "api",
      provider: "Stripe",
      endpoint: "https://api.stripe.com/v1",
      status: "healthy",
      latency: 120,
      lastChecked: "2025-04-07T16:45:00Z",
      usedIn: ["Checkout Service", "Subscription Service"]
    },
    {
      id: "d2",
      name: "User Authentication",
      type: "service",
      provider: "Auth0",
      endpoint: "https://myapp.auth0.com",
      status: "healthy",
      latency: 85,
      lastChecked: "2025-04-07T16:45:00Z",
      usedIn: ["Login Service", "User Management"]
    },
    {
      id: "d3",
      name: "Primary Database",
      type: "database",
      provider: "AWS RDS",
      endpoint: "myapp-db.cluster-abc123.us-east-1.rds.amazonaws.com",
      status: "healthy",
      latency: 15,
      lastChecked: "2025-04-07T16:45:00Z",
      usedIn: ["User Service", "Product Service", "Order Service"]
    },
    {
      id: "d4",
      name: "Object Storage",
      type: "storage",
      provider: "AWS S3",
      endpoint: "s3://myapp-uploads",
      status: "healthy",
      latency: 45,
      lastChecked: "2025-04-07T16:45:00Z",
      usedIn: ["Media Service", "Document Service"]
    },
    {
      id: "d5",
      name: "Email Service",
      type: "service",
      provider: "SendGrid",
      endpoint: "https://api.sendgrid.com/v3",
      status: "degraded",
      latency: 350,
      lastChecked: "2025-04-07T16:45:00Z",
      usedIn: ["Notification Service", "User Service"]
    },
    {
      id: "d6",
      name: "Content Delivery Network",
      type: "cdn",
      provider: "Cloudflare",
      endpoint: "https://myapp.com",
      status: "healthy",
      latency: 25,
      lastChecked: "2025-04-07T16:45:00Z",
      usedIn: ["Frontend", "Media Service"]
    },
    {
      id: "d7",
      name: "SMS Gateway",
      type: "api",
      provider: "Twilio",
      endpoint: "https://api.twilio.com/2010-04-01",
      status: "down",
      latency: 500,
      lastChecked: "2025-04-07T16:45:00Z",
      usedIn: ["Notification Service"]
    },
    {
      id: "d8",
      name: "Cache Service",
      type: "service",
      provider: "Redis Cloud",
      endpoint: "redis://myapp.redis.cache.windows.net:6380",
      status: "healthy",
      latency: 5,
      lastChecked: "2025-04-07T16:45:00Z",
      usedIn: ["API Gateway", "Product Service"]
    }
  ]);

  const [sortField, setSortField] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Refresh dependency data
  const refreshData = () => {
    console.log("Refreshing external dependencies data...");
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

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Sort dependencies
  const sortedDependencies = [...dependencies].sort((a, b) => {
    const fieldA = a[sortField as keyof Dependency];
    const fieldB = b[sortField as keyof Dependency];
    
    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc" 
        ? fieldA.localeCompare(fieldB) 
        : fieldB.localeCompare(fieldA);
    }
    
    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return sortDirection === "asc" 
        ? fieldA - fieldB 
        : fieldB - fieldA;
    }
    
    return 0;
  });

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Healthy</Badge>;
      case "degraded":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Degraded</Badge>;
      case "down":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Down</Badge>;
      case "unknown":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Unknown</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <Check className="h-5 w-5 text-green-500" />;
      case "degraded":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "down":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "unknown":
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "api":
        return <Globe className="h-4 w-4" />;
      case "database":
        return <Database className="h-4 w-4" />;
      case "storage":
        return <Cloud className="h-4 w-4" />;
      case "service":
        return <LinkIcon className="h-4 w-4" />;
      case "cdn":
        return <Globe className="h-4 w-4" />;
      default:
        return <LinkIcon className="h-4 w-4" />;
    }
  };

  // Get latency class
  const getLatencyClass = (latency: number) => {
    if (latency < 50) return "text-green-600";
    if (latency < 200) return "text-amber-600";
    return "text-red-600";
  };

  // Count dependencies by status
  const healthyCount = dependencies.filter(d => d.status === "healthy").length;
  const degradedCount = dependencies.filter(d => d.status === "degraded").length;
  const downCount = dependencies.filter(d => d.status === "down").length;
  const totalCount = dependencies.length;

  // Display dependencies based on full page or card view
  const displayDependencies = isFullPage ? sortedDependencies : sortedDependencies.slice(0, 5);

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              External Dependencies
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{totalCount}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{healthyCount}</div>
                <div className="text-xs text-muted-foreground">Healthy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{degradedCount}</div>
                <div className="text-xs text-muted-foreground">Degraded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{downCount}</div>
                <div className="text-xs text-muted-foreground">Down</div>
              </div>
            </div>
          </div>
          
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th 
                      className="px-4 py-2 text-left font-medium cursor-pointer hover:bg-muted/80"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        Dependency
                        {sortField === "name" && (
                          <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-2 text-left font-medium cursor-pointer hover:bg-muted/80"
                      onClick={() => handleSort("type")}
                    >
                      <div className="flex items-center">
                        Type
                        {sortField === "type" && (
                          <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-2 text-left font-medium cursor-pointer hover:bg-muted/80"
                      onClick={() => handleSort("provider")}
                    >
                      <div className="flex items-center">
                        Provider
                        {sortField === "provider" && (
                          <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-2 text-left font-medium cursor-pointer hover:bg-muted/80"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center">
                        Status
                        {sortField === "status" && (
                          <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-2 text-left font-medium cursor-pointer hover:bg-muted/80"
                      onClick={() => handleSort("latency")}
                    >
                      <div className="flex items-center">
                        Latency
                        {sortField === "latency" && (
                          <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-2 text-right font-medium">
                      Last Checked
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayDependencies.map((dependency) => (
                    <tr key={dependency.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          {getTypeIcon(dependency.type)}
                          <div>
                            <div className="font-medium">{dependency.name}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {dependency.endpoint}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2 capitalize">{dependency.type}</td>
                      <td className="px-4 py-2">{dependency.provider}</td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(dependency.status)}
                          {getStatusBadge(dependency.status)}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span className={getLatencyClass(dependency.latency)}>
                          {dependency.latency} ms
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right text-xs text-muted-foreground">
                        <div className="flex items-center justify-end gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>{formatDate(dependency.lastChecked)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {!isFullPage && dependencies.length > 5 && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <span>
                <ExternalLink className="h-4 w-4 mr-2" />
                View All Dependencies
              </span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
