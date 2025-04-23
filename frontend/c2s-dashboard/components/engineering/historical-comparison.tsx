"use client";

import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
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
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

// Example historical data
const historicalData = {
  complexity: [
    { date: "Jan 2025", current: 3.2, previous: 3.8, baseline: 3.5 },
    { date: "Feb 2025", current: 3.0, previous: 3.6, baseline: 3.5 },
    { date: "Mar 2025", current: 2.8, previous: 3.4, baseline: 3.5 },
    { date: "Apr 2025", current: 2.5, previous: 3.2, baseline: 3.5 }
  ],
  codeSmells: [
    { date: "Jan 2025", current: 245, previous: 310, baseline: 280 },
    { date: "Feb 2025", current: 220, previous: 290, baseline: 280 },
    { date: "Mar 2025", current: 195, previous: 270, baseline: 280 },
    { date: "Apr 2025", current: 175, previous: 250, baseline: 280 }
  ],
  coverage: [
    { date: "Jan 2025", current: 68, previous: 62, baseline: 70 },
    { date: "Feb 2025", current: 72, previous: 64, baseline: 70 },
    { date: "Mar 2025", current: 75, previous: 66, baseline: 70 },
    { date: "Apr 2025", current: 78, previous: 68, baseline: 70 }
  ],
  bugs: [
    { date: "Jan 2025", current: 42, previous: 56, baseline: 45 },
    { date: "Feb 2025", current: 38, previous: 52, baseline: 45 },
    { date: "Mar 2025", current: 35, previous: 48, baseline: 45 },
    { date: "Apr 2025", current: 30, previous: 45, baseline: 45 }
  ],
  technicalDebt: [
    { date: "Jan 2025", current: 18, previous: 22, baseline: 20 },
    { date: "Feb 2025", current: 17, previous: 21, baseline: 20 },
    { date: "Mar 2025", current: 16, previous: 20, baseline: 20 },
    { date: "Apr 2025", current: 15, previous: 19, baseline: 20 }
  ]
};

const timeRanges = [
  { value: "1m", label: "Last Month" },
  { value: "3m", label: "Last 3 Months" },
  { value: "6m", label: "Last 6 Months" },
  { value: "1y", label: "Last Year" },
  { value: "all", label: "All Time" }
];

const metrics = [
  { value: "complexity", label: "Complexity" },
  { value: "codeSmells", label: "Code Smells" },
  { value: "coverage", label: "Test Coverage" },
  { value: "bugs", label: "Bugs" },
  { value: "technicalDebt", label: "Technical Debt" }
];

const comparisonTypes = [
  { value: "previous", label: "Previous Period" },
  { value: "baseline", label: "Baseline" }
];

export function HistoricalComparison() {
  const [selectedMetric, setSelectedMetric] = useState("complexity");
  const [selectedTimeRange, setSelectedTimeRange] = useState("3m");
  const [selectedComparison, setSelectedComparison] = useState("previous");
  
  const data = historicalData[selectedMetric as keyof typeof historicalData];
  
  // Calculate percentage change
  const currentValue = data[data.length - 1].current;
  const comparisonValue = data[data.length - 1][selectedComparison as keyof typeof data[0]];
  const percentChange = ((currentValue - comparisonValue) / comparisonValue) * 100;
  
  // Determine if the change is positive or negative (depending on the metric)
  const isPositiveMetric = selectedMetric === "coverage"; // For coverage, higher is better
  const isPositiveChange = isPositiveMetric ? percentChange > 0 : percentChange < 0;
  
  const getChangeIcon = () => {
    if (Math.abs(percentChange) < 1) return <Minus className="h-4 w-4" />;
    return isPositiveChange ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };
  
  const getChangeColor = () => {
    if (Math.abs(percentChange) < 1) return "text-muted-foreground";
    return isPositiveChange ? "text-green-500" : "text-red-500";
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Historical Metrics Comparison
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="w-full md:w-1/3">
              <label className="text-sm font-medium mb-1 block">Metric</label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  {metrics.map((metric) => (
                    <SelectItem key={metric.value} value={metric.value}>
                      {metric.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/3">
              <label className="text-sm font-medium mb-1 block">Time Range</label>
              <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
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
              <label className="text-sm font-medium mb-1 block">Compare With</label>
              <Select value={selectedComparison} onValueChange={setSelectedComparison}>
                <SelectTrigger>
                  <SelectValue placeholder="Select comparison" />
                </SelectTrigger>
                <SelectContent>
                  {comparisonTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Current</h3>
                  <p className="text-2xl font-bold">{currentValue}</p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">
                    {selectedComparison === "previous" ? "Previous Period" : "Baseline"}
                  </h3>
                  <p className="text-2xl font-bold">{comparisonValue}</p>
                </div>
                <div className="flex items-center gap-1">
                  {selectedComparison === "previous" ? (
                    <ArrowLeft className="h-8 w-8 text-muted-foreground" />
                  ) : (
                    <Minus className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium">Change</h3>
                  <div className="flex items-center gap-1">
                    <p className="text-2xl font-bold">{Math.abs(percentChange).toFixed(1)}%</p>
                    {getChangeIcon()}
                  </div>
                </div>
                <div className={`flex items-center gap-1 ${getChangeColor()}`}>
                  {isPositiveChange ? (
                    <ArrowRight className="h-8 w-8" />
                  ) : (
                    <ArrowLeft className="h-8 w-8" />
                  )}
                </div>
              </div>
              <p className={`text-sm ${getChangeColor()}`}>
                {isPositiveChange ? "Improvement" : "Decline"} from {selectedComparison === "previous" ? "previous period" : "baseline"}
              </p>
            </div>
          </div>
          
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
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
                <Line
                  type="monotone"
                  dataKey="current"
                  name="Current"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey={selectedComparison}
                  name={selectedComparison === "previous" ? "Previous Period" : "Baseline"}
                  stroke="#9ca3af"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                />
                <ReferenceLine
                  y={data[data.length - 1].baseline}
                  stroke="#f59e0b"
                  strokeDasharray="3 3"
                  label={{ value: "Target", position: "insideTopRight", fill: "#f59e0b" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="rounded-lg border p-4 mt-2">
            <h3 className="text-sm font-medium mb-2">Analysis</h3>
            <p className="text-sm text-muted-foreground">
              {isPositiveChange ? (
                <>
                  The {metrics.find(m => m.value === selectedMetric)?.label.toLowerCase()} has 
                  {isPositiveMetric ? " increased" : " decreased"} by {Math.abs(percentChange).toFixed(1)}% 
                  compared to the {selectedComparison === "previous" ? "previous period" : "baseline"}. 
                  This indicates a positive trend in code quality.
                </>
              ) : (
                <>
                  The {metrics.find(m => m.value === selectedMetric)?.label.toLowerCase()} has 
                  {isPositiveMetric ? " decreased" : " increased"} by {Math.abs(percentChange).toFixed(1)}% 
                  compared to the {selectedComparison === "previous" ? "previous period" : "baseline"}. 
                  This indicates areas that may need attention to improve code quality.
                </>
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
