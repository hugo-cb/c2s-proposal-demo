"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  XCircle,
  AlertTriangle,
  RefreshCw,
  Download,
  Rocket,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react";

interface ChecklistItem {
  id: string;
  name: string;
  description: string;
  status: "passed" | "failed" | "warning" | "pending";
  category: "security" | "performance" | "reliability" | "compliance" | "configuration";
  details?: string;
  recommendation?: string;
}

interface ChecklistCategory {
  name: string;
  items: ChecklistItem[];
}

interface DeploymentChecklistProps {
  className?: string;
  isFullPage?: boolean;
}

export function DeploymentChecklist({ className, isFullPage = false }: DeploymentChecklistProps) {
  // Sample data for deployment checklist
  const [categories, setCategories] = useState<ChecklistCategory[]>([
    {
      name: "security",
      items: [
        {
          id: "s1",
          name: "Secrets Management",
          description: "Check if secrets are properly managed and not hardcoded",
          status: "passed",
          category: "security",
          details: "All secrets are stored in environment variables or secret management services."
        },
        {
          id: "s2",
          name: "Dependency Vulnerabilities",
          description: "Check for known vulnerabilities in dependencies",
          status: "warning",
          category: "security",
          details: "3 low severity vulnerabilities found in dependencies.",
          recommendation: "Update the affected packages to their latest versions."
        },
        {
          id: "s3",
          name: "HTTPS Configuration",
          description: "Verify that HTTPS is properly configured",
          status: "passed",
          category: "security",
          details: "HTTPS is properly configured with valid certificates."
        }
      ]
    },
    {
      name: "performance",
      items: [
        {
          id: "p1",
          name: "Resource Limits",
          description: "Check if resource limits are defined for containers",
          status: "failed",
          category: "performance",
          details: "No resource limits defined for containers in Kubernetes deployment.",
          recommendation: "Define CPU and memory limits for all containers to prevent resource exhaustion."
        },
        {
          id: "p2",
          name: "Database Indexes",
          description: "Verify that database indexes are properly configured",
          status: "passed",
          category: "performance",
          details: "Database indexes are properly configured for optimal query performance."
        }
      ]
    },
    {
      name: "reliability",
      items: [
        {
          id: "r1",
          name: "Backup Configuration",
          description: "Check if backups are properly configured",
          status: "warning",
          category: "reliability",
          details: "Backups are configured but not tested in the last 30 days.",
          recommendation: "Schedule regular backup testing to ensure recoverability."
        },
        {
          id: "r2",
          name: "High Availability",
          description: "Verify that the application is configured for high availability",
          status: "passed",
          category: "reliability",
          details: "Application is deployed across multiple availability zones with proper load balancing."
        },
        {
          id: "r3",
          name: "Health Checks",
          description: "Check if health checks are properly configured",
          status: "passed",
          category: "reliability",
          details: "Health checks are properly configured for all services."
        }
      ]
    },
    {
      name: "compliance",
      items: [
        {
          id: "c1",
          name: "Data Encryption",
          description: "Verify that data is encrypted at rest and in transit",
          status: "passed",
          category: "compliance",
          details: "Data is encrypted both at rest and in transit using industry-standard encryption."
        },
        {
          id: "c2",
          name: "Access Controls",
          description: "Check if proper access controls are in place",
          status: "warning",
          category: "compliance",
          details: "Some IAM roles have overly permissive policies.",
          recommendation: "Review and restrict IAM policies following the principle of least privilege."
        }
      ]
    },
    {
      name: "configuration",
      items: [
        {
          id: "cf1",
          name: "Environment Variables",
          description: "Check if all required environment variables are defined",
          status: "passed",
          category: "configuration",
          details: "All required environment variables are properly defined."
        },
        {
          id: "cf2",
          name: "Configuration Validation",
          description: "Verify that configuration files are valid",
          status: "passed",
          category: "configuration",
          details: "All configuration files are valid and properly formatted."
        },
        {
          id: "cf3",
          name: "Logging Configuration",
          description: "Check if logging is properly configured",
          status: "warning",
          category: "configuration",
          details: "Logging is configured but log rotation is not enabled.",
          recommendation: "Enable log rotation to prevent disk space issues."
        }
      ]
    }
  ]);

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    security: true,
    performance: true,
    reliability: true,
    compliance: true,
    configuration: true
  });

  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryName]: !expandedCategories[categoryName]
    });
  };

  // Refresh checklist data
  const refreshData = () => {
    console.log("Refreshing deployment checklist data...");
    // In a real application, this would fetch updated data from an API
  };

  // Export checklist as PDF
  const exportChecklist = () => {
    console.log("Exporting deployment checklist as PDF...");
    // In a real application, this would generate and download a PDF report
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "pending":
        return <Square className="h-5 w-5 text-gray-500" />;
      default:
        return <Square className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Passed</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      case "warning":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Warning</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get category badge
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "security":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Security</Badge>;
      case "performance":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Performance</Badge>;
      case "reliability":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Reliability</Badge>;
      case "compliance":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Compliance</Badge>;
      case "configuration":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Configuration</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Calculate overall readiness
  const allItems = categories.flatMap(category => category.items);
  const passedItems = allItems.filter(item => item.status === "passed").length;
  const warningItems = allItems.filter(item => item.status === "warning").length;
  const failedItems = allItems.filter(item => item.status === "failed").length;
  const totalItems = allItems.length;
  
  const readinessPercentage = Math.round((passedItems / totalItems) * 100);
  
  // Determine if deployment is ready
  const isDeploymentReady = failedItems === 0;

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              Deployment Readiness Checklist
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={exportChecklist}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={refreshData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-muted/20">
            <div className="text-center mb-2">
              <h3 className="text-lg font-semibold">Deployment Readiness</h3>
              <div className="text-3xl font-bold mt-1">{readinessPercentage}%</div>
            </div>
            
            <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  readinessPercentage >= 90 ? "bg-green-500" : 
                  readinessPercentage >= 70 ? "bg-amber-500" : 
                  "bg-red-500"
                }`} 
                style={{ width: `${readinessPercentage}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">{passedItems} Passed</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm">{warningItems} Warnings</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">{failedItems} Failed</span>
              </div>
            </div>
            
            <div className="mt-4">
              {isDeploymentReady ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-sm px-3 py-1">
                  Ready for Deployment
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-sm px-3 py-1">
                  Not Ready for Deployment
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name} className="rounded-lg border overflow-hidden">
                <div 
                  className="flex items-center justify-between p-3 bg-muted/40 cursor-pointer"
                  onClick={() => toggleCategory(category.name)}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium capitalize">{category.name}</h3>
                    <div className="text-xs text-muted-foreground">
                      {category.items.filter(item => item.status === "passed").length} / {category.items.length} passed
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {expandedCategories[category.name] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
                
                {expandedCategories[category.name] && (
                  <div className="p-3 space-y-3">
                    {category.items.map((item) => (
                      <div 
                        key={item.id} 
                        className={`rounded-lg border p-3 ${
                          item.status === "passed" ? "border-green-200 bg-green-50 dark:bg-green-900/10" : 
                          item.status === "failed" ? "border-red-200 bg-red-50 dark:bg-red-900/10" : 
                          item.status === "warning" ? "border-amber-200 bg-amber-50 dark:bg-amber-900/10" : 
                          "border-gray-200 bg-gray-50 dark:bg-gray-900/10"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            {getStatusIcon(item.status)}
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                              
                              {item.details && (
                                <div className="mt-2 text-sm">
                                  <span className="font-medium">Details: </span>
                                  {item.details}
                                </div>
                              )}
                              
                              {item.recommendation && (
                                <div className="mt-1 text-sm">
                                  <span className="font-medium">Recommendation: </span>
                                  {item.recommendation}
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            {getStatusBadge(item.status)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {!isDeploymentReady && (
            <div className="rounded-lg border p-4 bg-muted/40">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">Deployment Blocked</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    There are {failedItems} critical issues that need to be resolved before deployment. 
                    Please address these issues to proceed with the deployment.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
