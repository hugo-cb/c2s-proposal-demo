"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  RefreshCw,
  Shield,
  Server,
  GitBranch
} from "lucide-react";

interface ReadinessCategory {
  name: string;
  score: number;
  maxScore: number;
  status: "success" | "warning" | "error";
  icon: React.ReactNode;
}

interface InfrastructureReadinessGaugeProps {
  className?: string;
  isFullPage?: boolean;
}

export function InfrastructureReadinessGauge({ className, isFullPage = false }: InfrastructureReadinessGaugeProps) {
  // Sample data for the readiness gauge
  const [categories, setCategories] = useState<ReadinessCategory[]>([
    {
      name: "Security",
      score: 85,
      maxScore: 100,
      status: "success",
      icon: <Shield className="h-4 w-4" />
    },
    {
      name: "Configuration",
      score: 70,
      maxScore: 100,
      status: "warning",
      icon: <Server className="h-4 w-4" />
    },
    {
      name: "CI/CD Pipeline",
      score: 90,
      maxScore: 100,
      status: "success",
      icon: <GitBranch className="h-4 w-4" />
    },
    {
      name: "Artifacts",
      score: 60,
      maxScore: 100,
      status: "warning",
      icon: <Server className="h-4 w-4" />
    }
  ]);

  // Calculate overall readiness score
  const overallScore = Math.round(
    categories.reduce((acc, category) => acc + (category.score / category.maxScore), 0) / 
    categories.length * 100
  );

  // Determine overall status
  const getOverallStatus = () => {
    if (overallScore >= 80) return "success";
    if (overallScore >= 60) return "warning";
    return "error";
  };

  const overallStatus = getOverallStatus();

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Ready</Badge>;
      case "warning":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Needs Attention</Badge>;
      case "error":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Not Ready</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Refresh readiness data
  const refreshData = () => {
    console.log("Refreshing infrastructure readiness data...");
    // In a real application, this would fetch updated data from an API
  };

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Infrastructure Readiness
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center p-4">
            <div className="relative h-32 w-32">
              {/* Gauge background */}
              <div className="absolute inset-0 rounded-full bg-gray-100 dark:bg-gray-800"></div>
              
              {/* Gauge fill */}
              <div 
                className={`absolute inset-0 rounded-full 
                  ${overallStatus === "success" ? "bg-green-100 dark:bg-green-900/30" : 
                    overallStatus === "warning" ? "bg-amber-100 dark:bg-amber-900/30" : 
                    "bg-red-100 dark:bg-red-900/30"}`}
                style={{ 
                  clipPath: `polygon(50% 50%, 50% 0%, ${overallScore <= 50 ? 
                    `${50 + Math.sin(Math.PI * 2 * (overallScore / 100)) * 50}% ${50 - Math.cos(Math.PI * 2 * (overallScore / 100)) * 50}%` : 
                    `100% 0%, 100% ${overallScore <= 75 ? 
                      `${Math.tan(Math.PI * 2 * ((overallScore - 50) / 100)) * 50}%` : 
                      "100%"}, ${overallScore <= 75 ? "100%" : 
                      `${50 + Math.sin(Math.PI * 2 * (overallScore / 100)) * 50}% ${50 - Math.cos(Math.PI * 2 * (overallScore / 100)) * 50}%`}`
                  })`
                }}
              ></div>
              
              {/* Gauge center and text */}
              <div className="absolute inset-2 flex items-center justify-center rounded-full bg-background">
                <div className="text-center">
                  <span className="text-2xl font-bold">{overallScore}%</span>
                  <div className="mt-1">
                    {getStatusIcon(overallStatus)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <h3 className="text-sm font-medium">Overall Readiness</h3>
              <div className="mt-1">
                {getStatusBadge(overallStatus)}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Category Breakdown</h3>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      <div 
                        className={`h-full rounded-full ${
                          category.status === "success" ? "bg-green-500" : 
                          category.status === "warning" ? "bg-amber-500" : 
                          "bg-red-500"
                        }`}
                        style={{ width: `${(category.score / category.maxScore) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{category.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {!isFullPage && (
            <div className="rounded-lg border p-2 bg-muted/40">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  This gauge shows the overall readiness of your infrastructure for deployment. Address warnings and errors to improve readiness.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
