"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw,
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";

interface AccuracyScoreCardProps {
  className?: string;
  perspective?: "engineering" | "architecture" | "infrastructure" | "business";
  isFullPage?: boolean;
}

export function AccuracyScoreCard({ className, perspective = "engineering", isFullPage = false }: AccuracyScoreCardProps) {
  // Sample data for accuracy scores
  const [accuracyData, setAccuracyData] = useState({
    engineering: {
      currentScore: 87,
      previousScore: 82,
      trend: "up",
      lastUpdated: "2025-04-05T10:30:00Z",
      categories: [
        { name: "Code Quality", score: 92, trend: "up" },
        { name: "Test Coverage", score: 78, trend: "up" },
        { name: "Documentation", score: 85, trend: "down" },
        { name: "Performance", score: 90, trend: "stable" }
      ]
    },
    architecture: {
      currentScore: 82,
      previousScore: 85,
      trend: "down",
      lastUpdated: "2025-04-05T10:30:00Z",
      categories: [
        { name: "Modularity", score: 88, trend: "stable" },
        { name: "Dependency Management", score: 75, trend: "down" },
        { name: "Pattern Adherence", score: 80, trend: "down" },
        { name: "Scalability", score: 85, trend: "stable" }
      ]
    },
    infrastructure: {
      currentScore: 91,
      previousScore: 86,
      trend: "up",
      lastUpdated: "2025-04-05T10:30:00Z",
      categories: [
        { name: "Deployment Readiness", score: 95, trend: "up" },
        { name: "Security", score: 88, trend: "up" },
        { name: "Observability", score: 90, trend: "stable" },
        { name: "Resource Efficiency", score: 92, trend: "up" }
      ]
    },
    business: {
      currentScore: 79,
      previousScore: 74,
      trend: "up",
      lastUpdated: "2025-04-05T10:30:00Z",
      categories: [
        { name: "Capability Coverage", score: 82, trend: "up" },
        { name: "Requirement Traceability", score: 75, trend: "up" },
        { name: "Domain Alignment", score: 85, trend: "stable" },
        { name: "Process Implementation", score: 74, trend: "up" }
      ]
    }
  });

  // Refresh data
  const refreshData = () => {
    console.log("Refreshing accuracy data...");
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

  // Get perspective data
  const perspectiveData = accuracyData[perspective];
  
  // Get trend icon
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <BarChart3 className="h-4 w-4 text-blue-500" />;
    }
  };

  // Get score color class
  const getScoreColorClass = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };

  // Get score badge
  const getScoreBadge = (score: number) => {
    if (score >= 90) {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Excellent</Badge>;
    }
    if (score >= 80) {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Good</Badge>;
    }
    if (score >= 70) {
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Fair</Badge>;
    }
    return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Needs Improvement</Badge>;
  };

  // Get perspective title
  const getPerspectiveTitle = () => {
    switch (perspective) {
      case "engineering":
        return "Engineering Accuracy";
      case "architecture":
        return "Architecture Accuracy";
      case "infrastructure":
        return "Infrastructure Accuracy";
      case "business":
        return "Business Accuracy";
      default:
        return "Accuracy";
    }
  };

  // Get perspective icon
  const getPerspectiveIcon = () => {
    switch (perspective) {
      case "engineering":
        return <CheckCircle className="h-5 w-5" />;
      case "architecture":
        return <BarChart3 className="h-5 w-5" />;
      case "infrastructure":
        return <AlertTriangle className="h-5 w-5" />;
      case "business":
        return <Info className="h-5 w-5" />;
      default:
        return <BarChart3 className="h-5 w-5" />;
    }
  };

  // Calculate score difference
  const scoreDifference = perspectiveData.currentScore - perspectiveData.previousScore;
  const scoreDifferenceClass = scoreDifference >= 0 ? "text-green-600" : "text-red-600";

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              {getPerspectiveIcon()}
              {getPerspectiveTitle()}
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
            <div>
              <div className={`text-3xl font-bold ${getScoreColorClass(perspectiveData.currentScore)}`}>
                {perspectiveData.currentScore}%
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className={`text-sm font-medium ${scoreDifferenceClass}`}>
                  {scoreDifference > 0 ? "+" : ""}{scoreDifference}%
                </span>
                {getTrendIcon(perspectiveData.trend)}
              </div>
            </div>
            <div className="text-right">
              {getScoreBadge(perspectiveData.currentScore)}
              <div className="text-xs text-muted-foreground mt-1">
                Last updated: {formatDate(perspectiveData.lastUpdated)}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Category Breakdown</h3>
            <div className="space-y-2">
              {perspectiveData.categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTrendIcon(category.trend)}
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <div className={`text-sm font-medium ${getScoreColorClass(category.score)}`}>
                    {category.score}%
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {!isFullPage && (
            <Button variant="outline" size="sm" className="w-full">
              View Detailed Analysis
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
