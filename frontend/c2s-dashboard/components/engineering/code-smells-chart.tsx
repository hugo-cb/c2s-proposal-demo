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

// Example data for code smells evolution
const codeSmellsData = [
  {
    date: "Jan",
    duplications: 45,
    complexity: 32,
    bugs: 12,
    vulnerabilities: 8,
  },
  {
    date: "Feb",
    duplications: 42,
    complexity: 30,
    bugs: 10,
    vulnerabilities: 7,
  },
  {
    date: "Mar",
    duplications: 38,
    complexity: 28,
    bugs: 8,
    vulnerabilities: 6,
  },
  {
    date: "Apr",
    duplications: 35,
    complexity: 25,
    bugs: 7,
    vulnerabilities: 5,
  },
  {
    date: "May",
    duplications: 32,
    complexity: 22,
    bugs: 6,
    vulnerabilities: 4,
  },
  {
    date: "Jun",
    duplications: 30,
    complexity: 20,
    bugs: 5,
    vulnerabilities: 3,
  },
];

export function CodeSmellsChart() {
  const [timeRange, setTimeRange] = useState("6m");
  const [activeLines, setActiveLines] = useState({
    duplications: true,
    complexity: true,
    bugs: true,
    vulnerabilities: true,
  });

  const toggleLine = (line: keyof typeof activeLines) => {
    setActiveLines({
      ...activeLines,
      [line]: !activeLines[line],
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Code Smells Evolution
        </CardTitle>
        <div className="flex items-center gap-2">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          <Button
            variant={activeLines.duplications ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs"
            onClick={() => toggleLine("duplications")}
          >
            <span className="mr-1 h-2 w-2 rounded-full bg-blue-500"></span>
            Duplications
          </Button>
          <Button
            variant={activeLines.complexity ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs"
            onClick={() => toggleLine("complexity")}
          >
            <span className="mr-1 h-2 w-2 rounded-full bg-purple-500"></span>
            Complexity
          </Button>
          <Button
            variant={activeLines.bugs ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs"
            onClick={() => toggleLine("bugs")}
          >
            <span className="mr-1 h-2 w-2 rounded-full bg-red-500"></span>
            Bugs
          </Button>
          <Button
            variant={activeLines.vulnerabilities ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs"
            onClick={() => toggleLine("vulnerabilities")}
          >
            <span className="mr-1 h-2 w-2 rounded-full bg-amber-500"></span>
            Vulnerabilities
          </Button>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={codeSmellsData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend />
              {activeLines.duplications && (
                <Line
                  type="monotone"
                  dataKey="duplications"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
              {activeLines.complexity && (
                <Line
                  type="monotone"
                  dataKey="complexity"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
              {activeLines.bugs && (
                <Line
                  type="monotone"
                  dataKey="bugs"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
              {activeLines.vulnerabilities && (
                <Line
                  type="monotone"
                  dataKey="vulnerabilities"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
