"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  RefreshCw,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Download,
  Info
} from "lucide-react";

interface AccuracyMetric {
  id: string;
  name: string;
  engineering: number;
  architecture: number;
  infrastructure: number;
  business: number;
  average: number;
  trend: "up" | "down" | "stable";
  trendValue: number;
}

interface PerspectiveAccuracyComparisonProps {
  className?: string;
  isFullPage?: boolean;
}

export function PerspectiveAccuracyComparison({ className, isFullPage = false }: PerspectiveAccuracyComparisonProps) {
  // Sample data for accuracy metrics
  const [accuracyMetrics, setAccuracyMetrics] = useState<AccuracyMetric[]>([
    {
      id: "m1",
      name: "Overall Accuracy",
      engineering: 87,
      architecture: 82,
      infrastructure: 91,
      business: 78,
      average: 84.5,
      trend: "up",
      trendValue: 3.2
    },
    {
      id: "m2",
      name: "Expectation Coverage",
      engineering: 92,
      architecture: 85,
      infrastructure: 88,
      business: 75,
      average: 85,
      trend: "up",
      trendValue: 5.1
    },
    {
      id: "m3",
      name: "Detection Precision",
      engineering: 89,
      architecture: 79,
      infrastructure: 93,
      business: 81,
      average: 85.5,
      trend: "stable",
      trendValue: 0.8
    },
    {
      id: "m4",
      name: "Expectation Clarity",
      engineering: 85,
      architecture: 78,
      infrastructure: 90,
      business: 72,
      average: 81.25,
      trend: "up",
      trendValue: 2.5
    },
    {
      id: "m5",
      name: "Detection Recall",
      engineering: 82,
      architecture: 76,
      infrastructure: 89,
      business: 74,
      average: 80.25,
      trend: "down",
      trendValue: 1.7
    },
    {
      id: "m6",
      name: "Consistency Score",
      engineering: 90,
      architecture: 84,
      infrastructure: 92,
      business: 80,
      average: 86.5,
      trend: "up",
      trendValue: 4.3
    }
  ]);

  const [timeRange, setTimeRange] = useState("30days");
  const [sortBy, setSortBy] = useState("average");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Refresh data
  const refreshData = () => {
    console.log("Refreshing comparison data...");
    // In a real application, this would fetch updated data from an API
  };

  // Export data
  const exportData = () => {
    console.log("Exporting comparison data...");
    // In a real application, this would generate and download a file
    
    // Simulate a download
    const jsonData = JSON.stringify(sortedMetrics, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `perspective-accuracy-comparison-${timeRange}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Sort metrics
  const sortMetrics = (metrics: AccuracyMetric[]) => {
    return [...metrics].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "engineering":
          comparison = a.engineering - b.engineering;
          break;
        case "architecture":
          comparison = a.architecture - b.architecture;
          break;
        case "infrastructure":
          comparison = a.infrastructure - b.infrastructure;
          break;
        case "business":
          comparison = a.business - b.business;
          break;
        case "average":
          comparison = a.average - b.average;
          break;
        case "trend":
          comparison = a.trendValue - b.trendValue;
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
  };

  // Get sorted metrics
  const sortedMetrics = sortMetrics(accuracyMetrics);

  // Get trend icon
  const getTrendIcon = (trend: string, value: number) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      case "stable":
        return <Minus className="h-4 w-4 text-gray-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  // Get trend badge
  const getTrendBadge = (trend: string, value: number) => {
    const formattedValue = value.toFixed(1);
    
    switch (trend) {
      case "up":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+{formattedValue}%</Badge>;
      case "down":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">-{formattedValue}%</Badge>;
      case "stable":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">±{formattedValue}%</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get color class based on score
  const getScoreColorClass = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-amber-600";
    return "text-red-600";
  };

  // Get bar width and color based on score
  const getBarStyle = (score: number) => {
    const width = `${score}%`;
    let bgColor = "bg-red-500";
    
    if (score >= 90) bgColor = "bg-green-500";
    else if (score >= 80) bgColor = "bg-blue-500";
    else if (score >= 70) bgColor = "bg-amber-500";
    
    return { width, bgColor };
  };

  // Calculate average scores for each perspective
  const engineeringAverage = Math.round(sortedMetrics.reduce((sum, metric) => sum + metric.engineering, 0) / sortedMetrics.length);
  const architectureAverage = Math.round(sortedMetrics.reduce((sum, metric) => sum + metric.architecture, 0) / sortedMetrics.length);
  const infrastructureAverage = Math.round(sortedMetrics.reduce((sum, metric) => sum + metric.infrastructure, 0) / sortedMetrics.length);
  const businessAverage = Math.round(sortedMetrics.reduce((sum, metric) => sum + metric.business, 0) / sortedMetrics.length);
  const overallAverage = Math.round((engineeringAverage + architectureAverage + infrastructureAverage + businessAverage) / 4);

  // Get time range label
  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case "7days":
        return "Last 7 Days";
      case "30days":
        return "Last 30 Days";
      case "90days":
        return "Last 90 Days";
      case "1year":
        return "Last Year";
      default:
        return "Custom Range";
    }
  };

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Perspective Accuracy Comparison
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm" onClick={refreshData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColorClass(overallAverage)}`}>
                  {overallAverage}%
                </div>
                <div className="text-xs text-muted-foreground">Overall Average</div>
              </div>
              <div className="border-l h-8 mx-2"></div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColorClass(engineeringAverage)}`}>
                  {engineeringAverage}%
                </div>
                <div className="text-xs text-muted-foreground">Engineering</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColorClass(architectureAverage)}`}>
                  {architectureAverage}%
                </div>
                <div className="text-xs text-muted-foreground">Architecture</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColorClass(infrastructureAverage)}`}>
                  {infrastructureAverage}%
                </div>
                <div className="text-xs text-muted-foreground">Infrastructure</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColorClass(businessAverage)}`}>
                  {businessAverage}%
                </div>
                <div className="text-xs text-muted-foreground">Business</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              {getTimeRangeLabel()} Comparison
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select 
                value={sortBy} 
                onValueChange={(value) => {
                  if (sortBy === value) {
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy(value);
                    setSortDirection("desc");
                  }
                }}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Metric Name</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="architecture">Architecture</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="average">Average</SelectItem>
                  <SelectItem value="trend">Trend</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
              >
                {sortDirection === "asc" ? "↑" : "↓"}
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Metric</th>
                  <th className="px-4 py-3 text-left font-medium">Engineering</th>
                  <th className="px-4 py-3 text-left font-medium">Architecture</th>
                  <th className="px-4 py-3 text-left font-medium">Infrastructure</th>
                  <th className="px-4 py-3 text-left font-medium">Business</th>
                  <th className="px-4 py-3 text-left font-medium">Average</th>
                  <th className="px-4 py-3 text-left font-medium">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {sortedMetrics.map((metric) => {
                  const engineeringBarStyle = getBarStyle(metric.engineering);
                  const architectureBarStyle = getBarStyle(metric.architecture);
                  const infrastructureBarStyle = getBarStyle(metric.infrastructure);
                  const businessBarStyle = getBarStyle(metric.business);
                  
                  return (
                    <tr key={metric.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{metric.name}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${engineeringBarStyle.bgColor}`}
                              style={{ width: engineeringBarStyle.width }}
                            ></div>
                          </div>
                          <span className={getScoreColorClass(metric.engineering)}>
                            {metric.engineering}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${architectureBarStyle.bgColor}`}
                              style={{ width: architectureBarStyle.width }}
                            ></div>
                          </div>
                          <span className={getScoreColorClass(metric.architecture)}>
                            {metric.architecture}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${infrastructureBarStyle.bgColor}`}
                              style={{ width: infrastructureBarStyle.width }}
                            ></div>
                          </div>
                          <span className={getScoreColorClass(metric.infrastructure)}>
                            {metric.infrastructure}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${businessBarStyle.bgColor}`}
                              style={{ width: businessBarStyle.width }}
                            ></div>
                          </div>
                          <span className={getScoreColorClass(metric.business)}>
                            {metric.business}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-medium ${getScoreColorClass(metric.average)}`}>
                          {metric.average.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {getTrendIcon(metric.trend, metric.trendValue)}
                          {getTrendBadge(metric.trend, metric.trendValue)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="rounded-md border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Engineering</h3>
                <span className={`font-bold ${getScoreColorClass(engineeringAverage)}`}>
                  {engineeringAverage}%
                </span>
              </div>
              <div className="space-y-1">
                {sortedMetrics.slice(0, 3).map((metric) => (
                  <div key={`eng-${metric.id}`} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{metric.name}</span>
                    <span className={getScoreColorClass(metric.engineering)}>
                      {metric.engineering}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-md border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Architecture</h3>
                <span className={`font-bold ${getScoreColorClass(architectureAverage)}`}>
                  {architectureAverage}%
                </span>
              </div>
              <div className="space-y-1">
                {sortedMetrics.slice(0, 3).map((metric) => (
                  <div key={`arch-${metric.id}`} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{metric.name}</span>
                    <span className={getScoreColorClass(metric.architecture)}>
                      {metric.architecture}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-md border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Infrastructure</h3>
                <span className={`font-bold ${getScoreColorClass(infrastructureAverage)}`}>
                  {infrastructureAverage}%
                </span>
              </div>
              <div className="space-y-1">
                {sortedMetrics.slice(0, 3).map((metric) => (
                  <div key={`infra-${metric.id}`} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{metric.name}</span>
                    <span className={getScoreColorClass(metric.infrastructure)}>
                      {metric.infrastructure}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="rounded-md border p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Business</h3>
                <span className={`font-bold ${getScoreColorClass(businessAverage)}`}>
                  {businessAverage}%
                </span>
              </div>
              <div className="space-y-1">
                {sortedMetrics.slice(0, 3).map((metric) => (
                  <div key={`bus-${metric.id}`} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{metric.name}</span>
                    <span className={getScoreColorClass(metric.business)}>
                      {metric.business}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {!isFullPage && (
            <Button variant="outline" size="sm" className="w-full">
              View Full Comparison
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
