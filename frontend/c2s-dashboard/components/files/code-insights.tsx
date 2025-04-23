"use client";

import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  Code, 
  Layers, 
  Server, 
  Briefcase,
  AlertTriangle,
  CheckCircle2,
  Info,
  BarChart3,
  GitBranch,
  FileCode
} from "lucide-react";

interface CodeInsightsProps {
  filePath: string | null;
}

interface InsightData {
  id: string;
  type: "engineering" | "architecture" | "infrastructure" | "business";
  severity: "info" | "warning" | "critical" | "success";
  title: string;
  description: string;
  recommendation: string;
  relatedFiles?: string[];
}

export function CodeInsights({ filePath }: CodeInsightsProps) {
  const [insights, setInsights] = useState<InsightData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");

  // Sample insights data - in a real app, this would come from an API
  useEffect(() => {
    if (!filePath) {
      setInsights([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    // Simulate API call to get insights for the selected file
    setTimeout(() => {
      const sampleInsights: InsightData[] = [
        // Engineering insights
        {
          id: "1",
          type: "engineering",
          severity: "warning",
          title: "High Cyclomatic Complexity",
          description: "This file has a cyclomatic complexity of 15, which is above the recommended threshold of 10.",
          recommendation: "Consider refactoring complex functions into smaller, more manageable pieces."
        },
        {
          id: "2",
          type: "engineering",
          severity: "info",
          title: "Test Coverage",
          description: "This file has 78% test coverage, which is good but could be improved.",
          recommendation: "Add tests for edge cases and error handling paths."
        },
        {
          id: "3",
          type: "engineering",
          severity: "success",
          title: "Well-Documented Code",
          description: "This file has good documentation with JSDoc comments for all public functions.",
          recommendation: "Continue maintaining documentation as the code evolves."
        },
        {
          id: "4",
          type: "engineering",
          severity: "warning",
          title: "Potential Memory Leak",
          description: "This component may have a memory leak due to unmanaged event listeners.",
          recommendation: "Ensure all event listeners are properly cleaned up in useEffect cleanup functions."
        },

        // Architecture insights
        {
          id: "5",
          type: "architecture",
          severity: "info",
          title: "Component Dependencies",
          description: "This component has 5 direct dependencies and is imported by 8 other components.",
          recommendation: "Consider the impact of changes to this component on dependent components."
        },
        {
          id: "6",
          type: "architecture",
          severity: "warning",
          title: "Circular Dependency",
          description: "This file is part of a circular dependency chain with 3 other modules.",
          recommendation: "Refactor to break the circular dependency, possibly by extracting shared code to a separate module.",
          relatedFiles: [
            "/src/components/Button.tsx",
            "/src/components/Form.tsx",
            "/src/utils/validation.ts"
          ]
        },
        {
          id: "7",
          type: "architecture",
          severity: "critical",
          title: "Tight Coupling",
          description: "This component is tightly coupled with business logic and data access code.",
          recommendation: "Separate concerns by moving business logic to services and data access to repositories."
        },
        {
          id: "8",
          type: "architecture",
          severity: "success",
          title: "Clean Architecture Pattern",
          description: "This file follows clean architecture principles with clear separation of concerns.",
          recommendation: "Continue using this pattern for new components."
        },

        // Infrastructure insights
        {
          id: "9",
          type: "infrastructure",
          severity: "info",
          title: "Deployment Impact",
          description: "Changes to this file will trigger a full application rebuild and deployment.",
          recommendation: "Consider the impact on CI/CD pipeline and deployment time."
        },
        {
          id: "10",
          type: "infrastructure",
          severity: "warning",
          title: "Environment Configuration",
          description: "This file contains hardcoded environment-specific configuration.",
          recommendation: "Move configuration to environment variables or configuration files."
        },
        {
          id: "11",
          type: "infrastructure",
          severity: "critical",
          title: "Security Vulnerability",
          description: "This file contains a potential security vulnerability in API request handling.",
          recommendation: "Implement proper input validation and sanitization."
        },
        {
          id: "12",
          type: "infrastructure",
          severity: "success",
          title: "Containerization Ready",
          description: "This component is properly configured for containerized environments.",
          recommendation: "Continue following containerization best practices."
        },

        // Business insights
        {
          id: "13",
          type: "business",
          severity: "info",
          title: "Feature Usage",
          description: "This component implements a feature used by 45% of users.",
          recommendation: "Consider the business impact of changes to this component."
        },
        {
          id: "14",
          type: "business",
          severity: "warning",
          title: "Business Logic in UI",
          description: "This component contains business logic that should be in a service layer.",
          recommendation: "Extract business logic to a dedicated service for better maintainability and testability."
        },
        {
          id: "15",
          type: "business",
          severity: "critical",
          title: "Regulatory Compliance",
          description: "This component handles user data and must comply with privacy regulations.",
          recommendation: "Ensure data handling follows all relevant privacy regulations (GDPR, CCPA, etc.)."
        },
        {
          id: "16",
          type: "business",
          severity: "success",
          title: "Business Capability Alignment",
          description: "This component is well-aligned with the core business capabilities.",
          recommendation: "Continue maintaining alignment with business capabilities as requirements evolve."
        }
      ];

      // Randomly select a subset of insights based on the file path
      // In a real app, this would be based on actual analysis of the file
      const fileHash = filePath.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const selectedInsights = sampleInsights.filter(() => Math.random() > 0.4);
      
      setInsights(selectedInsights);
      setIsLoading(false);
    }, 500);
  }, [filePath]);

  // Get icon for insight type
  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case 'engineering':
        return <Code className="h-5 w-5 text-blue-500" />;
      case 'architecture':
        return <Layers className="h-5 w-5 text-purple-500" />;
      case 'infrastructure':
        return <Server className="h-5 w-5 text-green-500" />;
      case 'business':
        return <Briefcase className="h-5 w-5 text-amber-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get icon for insight severity
  const getInsightSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  // Get badge color for insight type
  const getInsightTypeBadge = (type: string) => {
    switch (type) {
      case 'engineering':
        return "bg-blue-50 text-blue-700 border-blue-200";
      case 'architecture':
        return "bg-purple-50 text-purple-700 border-purple-200";
      case 'infrastructure':
        return "bg-green-50 text-green-700 border-green-200";
      case 'business':
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Get badge color for insight severity
  const getInsightSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return "bg-red-50 text-red-700 border-red-200";
      case 'warning':
        return "bg-amber-50 text-amber-700 border-amber-200";
      case 'success':
        return "bg-green-50 text-green-700 border-green-200";
      case 'info':
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  // Filter insights based on active tab
  const filteredInsights = activeTab === "all" 
    ? insights 
    : insights.filter(insight => insight.type === activeTab);

  // Count insights by type
  const engineeringCount = insights.filter(insight => insight.type === "engineering").length;
  const architectureCount = insights.filter(insight => insight.type === "architecture").length;
  const infrastructureCount = insights.filter(insight => insight.type === "infrastructure").length;
  const businessCount = insights.filter(insight => insight.type === "business").length;

  // Count insights by severity
  const criticalCount = insights.filter(insight => insight.severity === "critical").length;
  const warningCount = insights.filter(insight => insight.severity === "warning").length;
  const infoCount = insights.filter(insight => insight.severity === "info").length;
  const successCount = insights.filter(insight => insight.severity === "success").length;

  // Refresh insights
  const refreshInsights = () => {
    setIsLoading(true);
    // Simulate API call to refresh insights
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  if (!filePath) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-[400px] gap-2 text-muted-foreground">
          <FileCode className="h-8 w-8" />
          <p>Select a file to view insights</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Code Insights</CardTitle>
            <CardDescription>
              Analysis for {filePath.split('/').pop()}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={refreshInsights} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : insights.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] gap-2 text-muted-foreground">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
            <p>No insights found for this file</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Engineering</p>
                    <p className="text-2xl font-bold">{engineeringCount}</p>
                  </div>
                  <Code className="h-8 w-8 text-blue-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Architecture</p>
                    <p className="text-2xl font-bold">{architectureCount}</p>
                  </div>
                  <Layers className="h-8 w-8 text-purple-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Infrastructure</p>
                    <p className="text-2xl font-bold">{infrastructureCount}</p>
                  </div>
                  <Server className="h-8 w-8 text-green-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">Business</p>
                    <p className="text-2xl font-bold">{businessCount}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-amber-500" />
                </CardContent>
              </Card>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Critical: {criticalCount}
                </Badge>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  Warning: {warningCount}
                </Badge>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Info: {infoCount}
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Success: {successCount}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                {insights.length} insight{insights.length !== 1 ? 's' : ''} found
              </div>
            </div>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="engineering">Engineering</TabsTrigger>
                <TabsTrigger value="architecture">Architecture</TabsTrigger>
                <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {filteredInsights.map((insight) => (
                <Card key={insight.id} className="overflow-hidden">
                  <div className={`h-1 ${getInsightSeverityBadge(insight.severity)}`} />
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getInsightSeverityIcon(insight.severity)}
                        <h3 className="font-medium">{insight.title}</h3>
                      </div>
                      <Badge variant="outline" className={getInsightTypeBadge(insight.type)}>
                        {insight.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                    
                    <div className="bg-muted p-3 rounded-md">
                      <p className="text-sm">
                        <span className="font-medium">Recommendation:</span> {insight.recommendation}
                      </p>
                    </div>
                    
                    {insight.relatedFiles && insight.relatedFiles.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Related Files:</p>
                        <div className="space-y-1">
                          {insight.relatedFiles.map((file, index) => (
                            <div key={index} className="text-sm flex items-center gap-2">
                              <FileCode className="h-3 w-3 text-muted-foreground" />
                              <span className="text-muted-foreground">{file}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
