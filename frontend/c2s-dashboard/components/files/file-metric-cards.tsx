"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code2, 
  GitBranch, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart3,
  Layers,
  RefreshCw
} from "lucide-react";

interface FileMetricCardsProps {
  filePath: string;
}

interface FileMetrics {
  linesOfCode: number;
  complexity: number;
  coverage: number;
  commits: number;
  contributors: number;
  lastModified: string;
  issues: number;
  quality: number;
  dependencies: number;
}

export function FileMetricCards({ filePath }: FileMetricCardsProps) {
  const [metrics, setMetrics] = useState<FileMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sample metrics data - in a real app, this would come from an API
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call to get file metrics
    setTimeout(() => {
      const sampleMetrics: FileMetrics = {
        linesOfCode: 185,
        complexity: 6,
        coverage: 78,
        commits: 12,
        contributors: 3,
        lastModified: "2025-04-05T14:30:00Z",
        issues: 2,
        quality: 85,
        dependencies: 4
      };
      
      setMetrics(sampleMetrics);
      setIsLoading(false);
    }, 500);
  }, [filePath]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Get relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 30) {
      return formatDate(dateString);
    }
    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    }
    if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    }
    if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
  };

  // Get quality color
  const getQualityColor = (quality: number) => {
    if (quality >= 90) return "text-green-500";
    if (quality >= 75) return "text-blue-500";
    if (quality >= 60) return "text-amber-500";
    return "text-red-500";
  };

  // Get complexity color
  const getComplexityColor = (complexity: number) => {
    if (complexity <= 3) return "text-green-500";
    if (complexity <= 6) return "text-blue-500";
    if (complexity <= 9) return "text-amber-500";
    return "text-red-500";
  };

  // Get coverage color
  const getCoverageColor = (coverage: number) => {
    if (coverage >= 90) return "text-green-500";
    if (coverage >= 75) return "text-blue-500";
    if (coverage >= 50) return "text-amber-500";
    return "text-red-500";
  };

  // Get issues color
  const getIssuesColor = (issues: number) => {
    if (issues === 0) return "text-green-500";
    if (issues <= 2) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {isLoading ? (
        Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="h-[100px]">
            <CardContent className="flex items-center justify-center h-full">
              <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        ))
      ) : metrics ? (
        <>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Lines of Code</p>
                <p className="text-2xl font-bold">{metrics.linesOfCode}</p>
              </div>
              <Code2 className="h-8 w-8 text-blue-500" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Complexity</p>
                <p className={`text-2xl font-bold ${getComplexityColor(metrics.complexity)}`}>
                  {metrics.complexity}
                </p>
              </div>
              <BarChart3 className={`h-8 w-8 ${getComplexityColor(metrics.complexity)}`} />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Test Coverage</p>
                <p className={`text-2xl font-bold ${getCoverageColor(metrics.coverage)}`}>
                  {metrics.coverage}%
                </p>
              </div>
              <CheckCircle2 className={`h-8 w-8 ${getCoverageColor(metrics.coverage)}`} />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Quality Score</p>
                <p className={`text-2xl font-bold ${getQualityColor(metrics.quality)}`}>
                  {metrics.quality}/100
                </p>
              </div>
              <BarChart3 className={`h-8 w-8 ${getQualityColor(metrics.quality)}`} />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Commits</p>
                <p className="text-2xl font-bold">{metrics.commits}</p>
              </div>
              <GitBranch className="h-8 w-8 text-purple-500" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Contributors</p>
                <p className="text-2xl font-bold">{metrics.contributors}</p>
              </div>
              <Users className="h-8 w-8 text-indigo-500" />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Issues</p>
                <p className={`text-2xl font-bold ${getIssuesColor(metrics.issues)}`}>
                  {metrics.issues}
                </p>
              </div>
              <AlertTriangle className={`h-8 w-8 ${getIssuesColor(metrics.issues)}`} />
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Last Modified</p>
                <p className="text-2xl font-bold">{getRelativeTime(metrics.lastModified)}</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="col-span-full">
          <CardContent className="flex items-center justify-center h-[100px]">
            <p className="text-muted-foreground">No metrics available</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
