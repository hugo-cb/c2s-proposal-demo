"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  RefreshCw,
  LineChart,
  Calendar,
  Filter
} from "lucide-react";

interface AccuracyTrendChartProps {
  className?: string;
  isFullPage?: boolean;
}

export function AccuracyTrendChart({ className, isFullPage = false }: AccuracyTrendChartProps) {
  // Sample data for accuracy trends
  const [trendData, setTrendData] = useState({
    engineering: [
      { date: "2025-01-01", score: 75 },
      { date: "2025-01-15", score: 78 },
      { date: "2025-02-01", score: 80 },
      { date: "2025-02-15", score: 79 },
      { date: "2025-03-01", score: 82 },
      { date: "2025-03-15", score: 84 },
      { date: "2025-04-01", score: 87 }
    ],
    architecture: [
      { date: "2025-01-01", score: 80 },
      { date: "2025-01-15", score: 82 },
      { date: "2025-02-01", score: 85 },
      { date: "2025-02-15", score: 86 },
      { date: "2025-03-01", score: 84 },
      { date: "2025-03-15", score: 83 },
      { date: "2025-04-01", score: 82 }
    ],
    infrastructure: [
      { date: "2025-01-01", score: 82 },
      { date: "2025-01-15", score: 84 },
      { date: "2025-02-01", score: 85 },
      { date: "2025-02-15", score: 87 },
      { date: "2025-03-01", score: 88 },
      { date: "2025-03-15", score: 90 },
      { date: "2025-04-01", score: 91 }
    ],
    business: [
      { date: "2025-01-01", score: 70 },
      { date: "2025-01-15", score: 72 },
      { date: "2025-02-01", score: 74 },
      { date: "2025-02-15", score: 75 },
      { date: "2025-03-01", score: 76 },
      { date: "2025-03-15", score: 78 },
      { date: "2025-04-01", score: 79 }
    ]
  });

  const [activeTab, setActiveTab] = useState("all");
  const [timeRange, setTimeRange] = useState("3m");

  // Refresh data
  const refreshData = () => {
    console.log("Refreshing trend data...");
    // In a real application, this would fetch updated data from an API
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Filter data based on time range
  const filterDataByTimeRange = (data: any[]) => {
    const now = new Date();
    let cutoffDate = new Date();
    
    switch (timeRange) {
      case "1m":
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case "3m":
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case "6m":
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case "1y":
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        cutoffDate.setMonth(now.getMonth() - 3);
    }
    
    return data.filter(item => new Date(item.date) >= cutoffDate);
  };

  // Get perspective color
  const getPerspectiveColor = (perspective: string) => {
    switch (perspective) {
      case "engineering":
        return "#10b981"; // green-500
      case "architecture":
        return "#3b82f6"; // blue-500
      case "infrastructure":
        return "#f59e0b"; // amber-500
      case "business":
        return "#8b5cf6"; // purple-500
      default:
        return "#6b7280"; // gray-500
    }
  };

  // Generate chart data
  const generateChartData = () => {
    // This is a placeholder for the actual chart data generation
    // In a real application, this would generate data for a chart library like recharts or chart.js
    
    if (activeTab === "all") {
      return {
        labels: filterDataByTimeRange(trendData.engineering).map(item => formatDate(item.date)),
        datasets: [
          {
            label: "Engineering",
            data: filterDataByTimeRange(trendData.engineering).map(item => item.score),
            color: getPerspectiveColor("engineering")
          },
          {
            label: "Architecture",
            data: filterDataByTimeRange(trendData.architecture).map(item => item.score),
            color: getPerspectiveColor("architecture")
          },
          {
            label: "Infrastructure",
            data: filterDataByTimeRange(trendData.infrastructure).map(item => item.score),
            color: getPerspectiveColor("infrastructure")
          },
          {
            label: "Business",
            data: filterDataByTimeRange(trendData.business).map(item => item.score),
            color: getPerspectiveColor("business")
          }
        ]
      };
    } else {
      return {
        labels: filterDataByTimeRange(trendData[activeTab as keyof typeof trendData]).map(item => formatDate(item.date)),
        datasets: [
          {
            label: activeTab.charAt(0).toUpperCase() + activeTab.slice(1),
            data: filterDataByTimeRange(trendData[activeTab as keyof typeof trendData]).map(item => item.score),
            color: getPerspectiveColor(activeTab)
          }
        ]
      };
    }
  };

  // Chart data
  const chartData = generateChartData();

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <LineChart className="h-5 w-5" />
              Accuracy Trend
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="engineering">Engineering</TabsTrigger>
                <TabsTrigger value="architecture">Architecture</TabsTrigger>
                <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">Last Month</SelectItem>
                  <SelectItem value="3m">Last 3 Months</SelectItem>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            {/* Chart placeholder - in a real application, use a chart library */}
            <div className="flex h-full w-full flex-col items-center justify-center rounded-md border border-dashed p-4">
              <div className="text-center">
                <LineChart className="mx-auto h-8 w-8 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-semibold">Accuracy Trend Chart</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  This is a placeholder for the actual chart visualization.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  In a real application, this would be rendered using a chart library like Recharts or Chart.js.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-3">
                  {chartData.datasets.map((dataset, index) => (
                    <div key={index} className="flex items-center gap-1.5">
                      <div 
                        className="h-3 w-3 rounded-full" 
                        style={{ backgroundColor: dataset.color }}
                      ></div>
                      <span className="text-xs">{dataset.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                  {chartData.datasets.map((dataset, index) => (
                    <div key={index} className="text-center">
                      <div className="font-medium" style={{ color: dataset.color }}>
                        {dataset.data[dataset.data.length - 1]}%
                      </div>
                      <div className="text-xs text-muted-foreground">{dataset.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-md border p-2 text-center">
              <div className="text-2xl font-bold text-green-600">
                {trendData.engineering[trendData.engineering.length - 1].score}%
              </div>
              <div className="text-xs text-muted-foreground">Engineering</div>
            </div>
            <div className="rounded-md border p-2 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {trendData.architecture[trendData.architecture.length - 1].score}%
              </div>
              <div className="text-xs text-muted-foreground">Architecture</div>
            </div>
            <div className="rounded-md border p-2 text-center">
              <div className="text-2xl font-bold text-amber-600">
                {trendData.infrastructure[trendData.infrastructure.length - 1].score}%
              </div>
              <div className="text-xs text-muted-foreground">Infrastructure</div>
            </div>
            <div className="rounded-md border p-2 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {trendData.business[trendData.business.length - 1].score}%
              </div>
              <div className="text-xs text-muted-foreground">Business</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
