"use client";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  BarChart2, 
  Code, 
  Layers, 
  Server 
} from "lucide-react";

// Example data for projects
const projects = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Multi-vendor e-commerce platform with marketplace features",
    lastActivity: "30 minutes ago",
    metrics: {
      engineering: 92,
      architecture: 88,
      infrastructure: 76,
      business: 95,
    },
  },
  {
    id: "2",
    name: "Banking System",
    description: "Core banking system with transaction processing",
    lastActivity: "2 hours ago",
    metrics: {
      engineering: 85,
      architecture: 90,
      infrastructure: 82,
      business: 78,
    },
  },
  {
    id: "3",
    name: "CRM System",
    description: "Customer relationship management system",
    lastActivity: "5 hours ago",
    metrics: {
      engineering: 78,
      architecture: 65,
      infrastructure: 90,
      business: 88,
    },
  },
  {
    id: "4",
    name: "Mobile Banking App",
    description: "Mobile banking application for iOS and Android",
    lastActivity: "1 day ago",
    metrics: {
      engineering: 94,
      architecture: 82,
      infrastructure: 88,
      business: 92,
    },
  },
];

export function ProjectsList() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Projects</h2>
        <a href="#" className="flex items-center text-sm text-primary">
          View all
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </a>
      </div>
      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-lg border bg-card p-5 transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                {project.lastActivity}
              </Badge>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              <div className="flex flex-col items-center rounded-md border p-2">
                <div className="flex items-center gap-1">
                  <Code className="h-3 w-3 text-blue-500" />
                  <span className="text-xs font-medium">Eng</span>
                </div>
                <span className="mt-1 text-sm font-semibold">
                  {project.metrics.engineering}%
                </span>
              </div>
              <div className="flex flex-col items-center rounded-md border p-2">
                <div className="flex items-center gap-1">
                  <Layers className="h-3 w-3 text-purple-500" />
                  <span className="text-xs font-medium">Arch</span>
                </div>
                <span className="mt-1 text-sm font-semibold">
                  {project.metrics.architecture}%
                </span>
              </div>
              <div className="flex flex-col items-center rounded-md border p-2">
                <div className="flex items-center gap-1">
                  <Server className="h-3 w-3 text-green-500" />
                  <span className="text-xs font-medium">Infra</span>
                </div>
                <span className="mt-1 text-sm font-semibold">
                  {project.metrics.infrastructure}%
                </span>
              </div>
              <div className="flex flex-col items-center rounded-md border p-2">
                <div className="flex items-center gap-1">
                  <BarChart2 className="h-3 w-3 text-amber-500" />
                  <span className="text-xs font-medium">Biz</span>
                </div>
                <span className="mt-1 text-sm font-semibold">
                  {project.metrics.business}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
