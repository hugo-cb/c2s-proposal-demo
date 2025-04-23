"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw,
  Lightbulb,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap
} from "lucide-react";

interface AccuracyInsight {
  id: string;
  title: string;
  description: string;
  perspective: "engineering" | "architecture" | "infrastructure" | "business" | "cross-perspective";
  severity: "info" | "warning" | "critical" | "success";
  actionable: boolean;
  timestamp: string;
}

interface AccuracyInsightsPanelProps {
  className?: string;
  isFullPage?: boolean;
}

export function AccuracyInsightsPanel({ className, isFullPage = false }: AccuracyInsightsPanelProps) {
  // Sample data for accuracy insights
  const [accuracyInsights, setAccuracyInsights] = useState<AccuracyInsight[]>([
    {
      id: "i1",
      title: "Test Coverage Improvement Opportunity",
      description: "Engineering expectations for test coverage are not being met in 3 critical modules. Consider prioritizing test implementation for these areas.",
      perspective: "engineering",
      severity: "warning",
      actionable: true,
      timestamp: "2025-04-05T14:30:00Z"
    },
    {
      id: "i2",
      title: "Architecture Pattern Compliance Achieved",
      description: "All architecture patterns are now properly implemented across the codebase, resulting in a 15% improvement in architecture accuracy.",
      perspective: "architecture",
      severity: "success",
      actionable: false,
      timestamp: "2025-04-04T11:15:00Z"
    },
    {
      id: "i3",
      title: "Security Configuration Mismatch",
      description: "Infrastructure security expectations do not match detected configurations in 2 deployment environments. Review security settings immediately.",
      perspective: "infrastructure",
      severity: "critical",
      actionable: true,
      timestamp: "2025-04-05T09:45:00Z"
    },
    {
      id: "i4",
      title: "Business Capability Alignment Improving",
      description: "Business capability coverage has improved by 8% over the last 30 days, with 4 previously unimplemented capabilities now detected in the codebase.",
      perspective: "business",
      severity: "info",
      actionable: false,
      timestamp: "2025-04-03T16:20:00Z"
    },
    {
      id: "i5",
      title: "Cross-Perspective Inconsistency Detected",
      description: "Inconsistencies found between business expectations and engineering implementations in the payment processing module. Alignment review recommended.",
      perspective: "cross-perspective",
      severity: "warning",
      actionable: true,
      timestamp: "2025-04-05T10:10:00Z"
    }
  ]);

  // Refresh data
  const refreshData = () => {
    console.log("Refreshing insights data...");
    // In a real application, this would fetch updated data from an API
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get severity icon
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  // Get perspective badge
  const getPerspectiveBadge = (perspective: string) => {
    switch (perspective) {
      case "engineering":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Engineering</Badge>;
      case "architecture":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Architecture</Badge>;
      case "infrastructure":
        return <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">Infrastructure</Badge>;
      case "business":
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Business</Badge>;
      case "cross-perspective":
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Cross-Perspective</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get severity badge
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "info":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Info</Badge>;
      case "warning":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Warning</Badge>;
      case "critical":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
      case "success":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Success</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Accuracy Insights
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {accuracyInsights.length === 0 ? (
            <div className="text-center p-4 border rounded-lg bg-muted/40">
              <p className="text-muted-foreground">No insights available at this time.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {accuracyInsights.map((insight) => (
                <div key={insight.id} className="rounded-lg border p-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {getSeverityIcon(insight.severity)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{insight.title}</h3>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(insight.timestamp)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {insight.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          {getPerspectiveBadge(insight.perspective)}
                          {getSeverityBadge(insight.severity)}
                        </div>
                        {insight.actionable && (
                          <Button variant="ghost" size="sm" className="h-7 gap-1">
                            <span className="text-xs">Take Action</span>
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!isFullPage && accuracyInsights.length > 3 && (
            <Button variant="outline" size="sm" className="w-full">
              <Zap className="h-4 w-4 mr-2" />
              View All Insights
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
