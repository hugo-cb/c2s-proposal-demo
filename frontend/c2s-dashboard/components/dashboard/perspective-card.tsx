"use client";

import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PerspectiveCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  change: number;
  description: string;
  className?: string;
}

export function PerspectiveCard({
  title,
  icon,
  value,
  change,
  description,
  className,
}: PerspectiveCardProps) {
  const isPositive = change >= 0;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}%</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="mt-2 flex items-center text-sm">
          <span
            className={cn(
              "mr-1 text-xs",
              isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {isPositive ? "+" : ""}{change}%
          </span>
          <span className="text-xs text-muted-foreground">from last month</span>
          <a
            href="#"
            className="ml-auto flex items-center text-xs text-primary"
          >
            View
            <ArrowUpRight className="ml-0.5 h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
