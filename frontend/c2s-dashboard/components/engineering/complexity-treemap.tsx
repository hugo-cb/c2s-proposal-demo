"use client";

import { useState } from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

// Example data for the complexity treemap
const complexityData = [
  {
    name: "src",
    children: [
      {
        name: "controllers",
        children: [
          { name: "PaymentController.ts", size: 25, value: 25 },
          { name: "ProductController.ts", size: 22, value: 22 },
          { name: "UserController.ts", size: 18, value: 18 },
        ],
      },
      {
        name: "services",
        children: [
          { name: "AuthService.ts", size: 18, value: 18 },
          { name: "NotificationService.ts", size: 30, value: 30 },
          { name: "PaymentService.ts", size: 20, value: 20 },
        ],
      },
      {
        name: "models",
        children: [
          { name: "User.ts", size: 8, value: 8 },
          { name: "Product.ts", size: 10, value: 10 },
          { name: "Order.ts", size: 12, value: 12 },
        ],
      },
      {
        name: "utils",
        children: [
          { name: "Formatter.ts", size: 12, value: 12 },
          { name: "Validator.ts", size: 15, value: 15 },
          { name: "Logger.ts", size: 10, value: 10 },
        ],
      },
    ],
  },
];

// Custom colors for the treemap based on complexity
const getComplexityColor = (complexity: number) => {
  if (complexity < 10) return "#4ade80"; // Green for low complexity
  if (complexity < 20) return "#facc15"; // Yellow for medium complexity
  if (complexity < 25) return "#fb923c"; // Orange for high complexity
  return "#ef4444"; // Red for very high complexity
};

// Custom tooltip for the treemap
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-md border bg-popover p-2 shadow-md">
        <p className="font-medium">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          Complexity: <span className="font-medium">{data.value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function ComplexityTreemap() {
  const [view, setView] = useState<"complexity" | "size">("complexity");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Code Complexity Distribution
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "complexity" ? "default" : "outline"}
            size="sm"
            className="h-8 text-xs"
            onClick={() => setView("complexity")}
          >
            Complexity
          </Button>
          <Button
            variant={view === "size" ? "default" : "outline"}
            size="sm"
            className="h-8 text-xs"
            onClick={() => setView("size")}
          >
            File Size
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          The treemap shows the distribution of code complexity across your codebase.
          Larger rectangles and darker colors indicate higher complexity.
        </div>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={complexityData}
              dataKey="value"
              stroke="#374151"
              fill="#4b5563"
              content={<CustomizedContent view={view} />}
            >
              <Tooltip content={<CustomTooltip />} />
            </Treemap>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="text-xs">Low</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="text-xs">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-orange-500"></span>
            <span className="text-xs">High</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="text-xs">Very High</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Custom content component for the treemap
const CustomizedContent = (props: any) => {
  const { x, y, width, height, name, value, depth, index, view } = props;

  // Only render if we have enough space
  if (width < 5 || height < 5) {
    return null;
  }

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: getComplexityColor(value),
          stroke: "#fff",
          strokeWidth: 1,
          strokeOpacity: 0.5,
        }}
      />
      {width > 30 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: 12,
            fontWeight: "bold",
            fill: "#fff",
            textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
          }}
        >
          {name}
        </text>
      )}
      {width > 60 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: 10,
            fill: "#fff",
            textShadow: "1px 1px 1px rgba(0,0,0,0.5)",
          }}
        >
          {value}
        </text>
      )}
    </g>
  );
};
