"use client";

import { useState } from "react";
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart,
  Bar
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Calendar,
  Download,
  TrendingUp,
  TrendingDown,
  BarChart as BarChartIcon,
  LineChart as LineChartIcon,
  AreaChart as AreaChartIcon
} from "lucide-react";

// Example data for temporal metrics
interface TemporalData {
  daily: {
    date: string;
    complexity: number;
    codeSmells: number;
    bugs: number;
    coverage: number;
    duplication: number;
  }[];
  weekly: {
    date: string;
    complexity: number;
    codeSmells: number;
    bugs: number;
    coverage: number;
    duplication: number;
  }[];
  monthly: {
    date: string;
    complexity: number;
    codeSmells: number;
    bugs: number;
    coverage: number;
    duplication: number;
  }[];
  quarterly: {
    date: string;
    complexity: number;
    codeSmells: number;
    bugs: number;
    coverage: number;
    duplication: number;
  }[];
}

const temporalData: TemporalData = {
  daily: [
    { date: "Apr 1", complexity: 3.2, codeSmells: 245, bugs: 42, coverage: 68, duplication: 12 },
    { date: "Apr 2", complexity: 3.2, codeSmells: 248, bugs: 44, coverage: 67, duplication: 12 },
    { date: "Apr 3", complexity: 3.1, codeSmells: 240, bugs: 40, coverage: 69, duplication: 11 },
    { date: "Apr 4", complexity: 3.0, codeSmells: 235, bugs: 38, coverage: 70, duplication: 11 },
    { date: "Apr 5", complexity: 2.9, codeSmells: 230, bugs: 36, coverage: 72, duplication: 10 },
    { date: "Apr 6", complexity: 2.8, codeSmells: 220, bugs: 34, coverage: 74, duplication: 10 },
    { date: "Apr 7", complexity: 2.7, codeSmells: 210, bugs: 32, coverage: 76, duplication: 9 }
  ],
  weekly: [
    { date: "Week 1", complexity: 3.5, codeSmells: 280, bugs: 52, coverage: 62, duplication: 14 },
    { date: "Week 2", complexity: 3.3, codeSmells: 260, bugs: 48, coverage: 65, duplication: 13 },
    { date: "Week 3", complexity: 3.1, codeSmells: 240, bugs: 44, coverage: 68, duplication: 12 },
    { date: "Week 4", complexity: 2.9, codeSmells: 220, bugs: 40, coverage: 71, duplication: 11 },
    { date: "Week 5", complexity: 2.7, codeSmells: 200, bugs: 36, coverage: 74, duplication: 10 },
    { date: "Week 6", complexity: 2.5, codeSmells: 180, bugs: 32, coverage: 77, duplication: 9 },
    { date: "Week 7", complexity: 2.3, codeSmells: 160, bugs: 28, coverage: 80, duplication: 8 }
  ],
  monthly: [
    { date: "Oct 2024", complexity: 4.0, codeSmells: 320, bugs: 65, coverage: 55, duplication: 18 },
    { date: "Nov 2024", complexity: 3.8, codeSmells: 300, bugs: 60, coverage: 58, duplication: 17 },
    { date: "Dec 2024", complexity: 3.6, codeSmells: 280, bugs: 55, coverage: 61, duplication: 16 },
    { date: "Jan 2025", complexity: 3.4, codeSmells: 260, bugs: 50, coverage: 64, duplication: 15 },
    { date: "Feb 2025", complexity: 3.2, codeSmells: 240, bugs: 45, coverage: 67, duplication: 14 },
    { date: "Mar 2025", complexity: 3.0, codeSmells: 220, bugs: 40, coverage: 70, duplication: 13 },
    { date: "Apr 2025", complexity: 2.8, codeSmells: 200, bugs: 35, coverage: 73, duplication: 12 }
  ],
  quarterly: [
    { date: "Q2 2024", complexity: 4.5, codeSmells: 380, bugs: 75, coverage: 50, duplication: 20 },
    { date: "Q3 2024", complexity: 4.2, codeSmells: 350, bugs: 70, coverage: 55, duplication: 19 },
    { date: "Q4 2024", complexity: 3.9, codeSmells: 320, bugs: 65, coverage: 60, duplication: 18 },
    { date: "Q1 2025", complexity: 3.6, codeSmells: 290, bugs: 60, coverage: 65, duplication: 17 },
    { date: "Q2 2025", complexity: 3.3, codeSmells: 260, bugs: 55, coverage: 70, duplication: 16 }
  ]
};

interface TimeRange {
  value: string;
  label: string;
}

const timeRanges: TimeRange[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" }
];

interface Metric {
  value: string;
  label: string;
  color: string;
  positiveDirection: "up" | "down";
}

const metrics: Metric[] = [
  { value: "complexity", label: "Complexity", color: "#3b82f6", positiveDirection: "down" },
  { value: "codeSmells", label: "Code Smells", color: "#f59e0b", positiveDirection: "down" },
  { value: "bugs", label: "Bugs", color: "#ef4444", positiveDirection: "down" },
  { value: "coverage", label: "Test Coverage", color: "#10b981", positiveDirection: "up" },
  { value: "duplication", label: "Duplication", color: "#8b5cf6", positiveDirection: "down" }
];

interface ChartType {
  value: string;
  label: string;
  icon: any;
}

const chartTypes: ChartType[] = [
  { value: "line", label: "Line Chart", icon: LineChartIcon },
  { value: "area", label: "Area Chart", icon: AreaChartIcon },
  { value: "bar", label: "Bar Chart", icon: BarChartIcon },
  { value: "composed", label: "Composed Chart", icon: BarChartIcon }
];

export function TemporalMetrics() {
  const [timeRange, setTimeRange] = useState("weekly");
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["complexity", "codeSmells", "coverage"]);
  const [chartType, setChartType] = useState("line");
  
  const data = temporalData[timeRange as keyof typeof temporalData];
  
  // Calculate trends
  const calculateTrend = (metricName: string) => {
    const firstValue = data[0][metricName as keyof typeof data[0]] as number;
    const lastValue = data[data.length - 1][metricName as keyof typeof data[0]] as number;
    const percentChange = ((lastValue - firstValue) / firstValue) * 100;
    
    const metric = metrics.find(m => m.value === metricName);
    const isPositive = metric?.positiveDirection === "up" ? percentChange > 0 : percentChange < 0;
    
    return {
      percentChange,
      isPositive
    };
  };
  
  const toggleMetric = (metric: string) => {
    if (selectedMetrics.includes(metric)) {
      setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
    } else {
      setSelectedMetrics([...selectedMetrics, metric]);
    }
  };
  
  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            {selectedMetrics.map((metric) => {
              const metricConfig = metrics.find(m => m.value === metric);
              return (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  name={metricConfig?.label}
                  stroke={metricConfig?.color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              );
            })}
          </LineChart>
        );
      
      case "area":
        return (
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            {selectedMetrics.map((metric) => {
              const metricConfig = metrics.find(m => m.value === metric);
              return (
                <Area
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  name={metricConfig?.label}
                  stroke={metricConfig?.color}
                  fill={`${metricConfig?.color}33`}
                  strokeWidth={2}
                />
              );
            })}
          </AreaChart>
        );
      
      case "bar":
        return (
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            {selectedMetrics.map((metric) => {
              const metricConfig = metrics.find(m => m.value === metric);
              return (
                <Bar
                  key={metric}
                  dataKey={metric}
                  name={metricConfig?.label}
                  fill={metricConfig?.color}
                  barSize={20}
                />
              );
            })}
          </ComposedChart>
        );
      
      case "composed":
        return (
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.5rem",
              }}
            />
            <Legend />
            {selectedMetrics.map((metric, i) => {
              const metricConfig = metrics.find(m => m.value === metric);
              
              // Use different chart types for different metrics
              if (i % 3 === 0) {
                return (
                  <Bar
                    key={metric}
                    dataKey={metric}
                    name={metricConfig?.label}
                    fill={metricConfig?.color}
                    barSize={20}
                  />
                );
              } else if (i % 3 === 1) {
                return (
                  <Line
                    key={metric}
                    type="monotone"
                    dataKey={metric}
                    name={metricConfig?.label}
                    stroke={metricConfig?.color}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                );
              } else {
                return (
                  <Area
                    key={metric}
                    type="monotone"
                    dataKey={metric}
                    name={metricConfig?.label}
                    stroke={metricConfig?.color}
                    fill={`${metricConfig?.color}33`}
                    strokeWidth={2}
                  />
                );
              }
            })}
          </ComposedChart>
        );
      
      default:
        return (
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="date" />
            <YAxis />
            <Legend />
          </LineChart>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Temporal Metrics Visualization
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <label className="text-sm font-medium mb-1 block">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-1/3">
              <label className="text-sm font-medium mb-1 block">Chart Type</label>
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select chart type" />
                </SelectTrigger>
                <SelectContent>
                  {chartTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-1/3">
              <label className="text-sm font-medium mb-1 block">Date Range</label>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                <span>
                  {timeRange === "daily" && "Last 7 days"}
                  {timeRange === "weekly" && "Last 7 weeks"}
                  {timeRange === "monthly" && "Last 7 months"}
                  {timeRange === "quarterly" && "Last 5 quarters"}
                </span>
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <label className="text-sm font-medium w-full mb-1">Metrics</label>
            {metrics.map((metric) => (
              <Button
                key={metric.value}
                variant={selectedMetrics.includes(metric.value) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleMetric(metric.value)}
                style={{
                  backgroundColor: selectedMetrics.includes(metric.value) ? metric.color : undefined,
                  borderColor: !selectedMetrics.includes(metric.value) ? metric.color : undefined,
                  color: !selectedMetrics.includes(metric.value) ? metric.color : "white"
                }}
              >
                {metric.label}
              </Button>
            ))}
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {selectedMetrics.map((metric) => {
              const metricConfig = metrics.find(m => m.value === metric);
              const trend = calculateTrend(metric);
              
              return (
                <div key={metric} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{metricConfig?.label}</h3>
                    <div 
                      className={`flex items-center gap-1 ${
                        trend.isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {trend.isPositive ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      <span>{Math.abs(trend.percentChange).toFixed(1)}%</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: metricConfig?.color }}>
                    {data[data.length - 1][metric as keyof typeof data[0]]}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {trend.isPositive ? "Improved" : "Declined"} since first period
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
          
          <div className="rounded-lg border p-4 mt-2">
            <h3 className="text-sm font-medium mb-2">Trend Analysis</h3>
            <p className="text-sm text-muted-foreground">
              {selectedMetrics.length > 0 ? (
                <>
                  {selectedMetrics.map((metric) => {
                    const metricConfig = metrics.find(m => m.value === metric);
                    const trend = calculateTrend(metric);
                    
                    return (
                      <span key={metric} className="block mb-1">
                        <strong>{metricConfig?.label}:</strong> {trend.isPositive ? "Improved" : "Declined"} by {Math.abs(trend.percentChange).toFixed(1)}% 
                        over the selected time period. {trend.isPositive ? "This is a positive trend." : "This may require attention."}
                      </span>
                    );
                  })}
                </>
              ) : (
                <span>Please select at least one metric to see trend analysis.</span>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
