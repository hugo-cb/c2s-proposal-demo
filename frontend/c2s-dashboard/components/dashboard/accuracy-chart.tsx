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
  ResponsiveContainer 
} from "recharts";
import { Button } from "@/components/ui/button";

// Example data for the accuracy chart
const data = [
  {
    name: "Jan",
    engineering: 78,
    architecture: 82,
    infrastructure: 75,
    business: 80,
  },
  {
    name: "Feb",
    engineering: 80,
    architecture: 85,
    infrastructure: 78,
    business: 82,
  },
  {
    name: "Mar",
    engineering: 83,
    architecture: 87,
    infrastructure: 82,
    business: 85,
  },
  {
    name: "Apr",
    engineering: 85,
    architecture: 89,
    infrastructure: 85,
    business: 87,
  },
  {
    name: "May",
    engineering: 88,
    architecture: 91,
    infrastructure: 87,
    business: 89,
  },
  {
    name: "Jun",
    engineering: 90,
    architecture: 92,
    infrastructure: 89,
    business: 91,
  },
];

export function AccuracyChart() {
  const [activeLines, setActiveLines] = useState({
    engineering: true,
    architecture: true,
    infrastructure: true,
    business: true,
  });

  const toggleLine = (line: keyof typeof activeLines) => {
    setActiveLines({
      ...activeLines,
      [line]: !activeLines[line],
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Accuracy Trends</h2>
        <div className="flex gap-2">
          <Button
            variant={activeLines.engineering ? "default" : "outline"}
            size="sm"
            onClick={() => toggleLine("engineering")}
            className="h-7 text-xs"
          >
            Engineering
          </Button>
          <Button
            variant={activeLines.architecture ? "default" : "outline"}
            size="sm"
            onClick={() => toggleLine("architecture")}
            className="h-7 text-xs"
          >
            Architecture
          </Button>
          <Button
            variant={activeLines.infrastructure ? "default" : "outline"}
            size="sm"
            onClick={() => toggleLine("infrastructure")}
            className="h-7 text-xs"
          >
            Infrastructure
          </Button>
          <Button
            variant={activeLines.business ? "default" : "outline"}
            size="sm"
            onClick={() => toggleLine("business")}
            className="h-7 text-xs"
          >
            Business
          </Button>
        </div>
      </div>
      <div className="rounded-lg border bg-card p-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis domain={[50, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                borderColor: "hsl(var(--border))",
                borderRadius: "0.5rem",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend />
            {activeLines.engineering && (
              <Line
                type="monotone"
                dataKey="engineering"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {activeLines.architecture && (
              <Line
                type="monotone"
                dataKey="architecture"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {activeLines.infrastructure && (
              <Line
                type="monotone"
                dataKey="infrastructure"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {activeLines.business && (
              <Line
                type="monotone"
                dataKey="business"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
