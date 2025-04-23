"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  GitBranch, 
  RefreshCw,
  ExternalLink,
  Check,
  X,
  Clock,
  Play,
  Pause,
  RotateCw,
  ArrowRight
} from "lucide-react";

interface PipelineStage {
  id: string;
  name: string;
  status: "success" | "failed" | "running" | "pending" | "skipped";
  duration: string;
  startTime: string;
  endTime?: string;
  jobs: PipelineJob[];
}

interface PipelineJob {
  id: string;
  name: string;
  status: "success" | "failed" | "running" | "pending" | "skipped";
  duration: string;
  logs?: string;
}

interface Pipeline {
  id: string;
  name: string;
  branch: string;
  commitId: string;
  commitMessage: string;
  author: string;
  status: "success" | "failed" | "running" | "pending";
  startTime: string;
  endTime?: string;
  duration: string;
  stages: PipelineStage[];
}

interface CIPipelineVisualizerProps {
  className?: string;
  isFullPage?: boolean;
}

export function CIPipelineVisualizer({ className, isFullPage = false }: CIPipelineVisualizerProps) {
  // Sample data for CI/CD pipelines
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: "p1",
      name: "main-pipeline",
      branch: "main",
      commitId: "a1b2c3d",
      commitMessage: "Fix security vulnerabilities in dependencies",
      author: "John Smith",
      status: "success",
      startTime: "2025-04-07T10:30:00Z",
      endTime: "2025-04-07T10:45:00Z",
      duration: "15m",
      stages: [
        {
          id: "s1",
          name: "Build",
          status: "success",
          duration: "3m",
          startTime: "2025-04-07T10:30:00Z",
          endTime: "2025-04-07T10:33:00Z",
          jobs: [
            {
              id: "j1",
              name: "Build Docker Image",
              status: "success",
              duration: "3m"
            }
          ]
        },
        {
          id: "s2",
          name: "Test",
          status: "success",
          duration: "5m",
          startTime: "2025-04-07T10:33:00Z",
          endTime: "2025-04-07T10:38:00Z",
          jobs: [
            {
              id: "j2",
              name: "Unit Tests",
              status: "success",
              duration: "2m"
            },
            {
              id: "j3",
              name: "Integration Tests",
              status: "success",
              duration: "3m"
            }
          ]
        },
        {
          id: "s3",
          name: "Security Scan",
          status: "success",
          duration: "4m",
          startTime: "2025-04-07T10:38:00Z",
          endTime: "2025-04-07T10:42:00Z",
          jobs: [
            {
              id: "j4",
              name: "Dependency Scan",
              status: "success",
              duration: "2m"
            },
            {
              id: "j5",
              name: "Container Scan",
              status: "success",
              duration: "2m"
            }
          ]
        },
        {
          id: "s4",
          name: "Deploy",
          status: "success",
          duration: "3m",
          startTime: "2025-04-07T10:42:00Z",
          endTime: "2025-04-07T10:45:00Z",
          jobs: [
            {
              id: "j6",
              name: "Deploy to Staging",
              status: "success",
              duration: "3m"
            }
          ]
        }
      ]
    },
    {
      id: "p2",
      name: "feature-pipeline",
      branch: "feature/new-auth",
      commitId: "e4f5g6h",
      commitMessage: "Implement new authentication flow",
      author: "Jane Doe",
      status: "running",
      startTime: "2025-04-07T11:15:00Z",
      duration: "10m+",
      stages: [
        {
          id: "s5",
          name: "Build",
          status: "success",
          duration: "3m",
          startTime: "2025-04-07T11:15:00Z",
          endTime: "2025-04-07T11:18:00Z",
          jobs: [
            {
              id: "j7",
              name: "Build Docker Image",
              status: "success",
              duration: "3m"
            }
          ]
        },
        {
          id: "s6",
          name: "Test",
          status: "success",
          duration: "4m",
          startTime: "2025-04-07T11:18:00Z",
          endTime: "2025-04-07T11:22:00Z",
          jobs: [
            {
              id: "j8",
              name: "Unit Tests",
              status: "success",
              duration: "2m"
            },
            {
              id: "j9",
              name: "Integration Tests",
              status: "success",
              duration: "2m"
            }
          ]
        },
        {
          id: "s7",
          name: "Security Scan",
          status: "running",
          duration: "3m+",
          startTime: "2025-04-07T11:22:00Z",
          jobs: [
            {
              id: "j10",
              name: "Dependency Scan",
              status: "success",
              duration: "1m"
            },
            {
              id: "j11",
              name: "Container Scan",
              status: "running",
              duration: "2m+"
            }
          ]
        },
        {
          id: "s8",
          name: "Deploy",
          status: "pending",
          duration: "0m",
          startTime: "2025-04-07T11:25:00Z",
          jobs: [
            {
              id: "j12",
              name: "Deploy to Dev",
              status: "pending",
              duration: "0m"
            }
          ]
        }
      ]
    },
    {
      id: "p3",
      name: "hotfix-pipeline",
      branch: "hotfix/api-error",
      commitId: "i7j8k9l",
      commitMessage: "Fix critical API error in production",
      author: "Michael Johnson",
      status: "failed",
      startTime: "2025-04-07T09:45:00Z",
      endTime: "2025-04-07T09:52:00Z",
      duration: "7m",
      stages: [
        {
          id: "s9",
          name: "Build",
          status: "success",
          duration: "2m",
          startTime: "2025-04-07T09:45:00Z",
          endTime: "2025-04-07T09:47:00Z",
          jobs: [
            {
              id: "j13",
              name: "Build Docker Image",
              status: "success",
              duration: "2m"
            }
          ]
        },
        {
          id: "s10",
          name: "Test",
          status: "failed",
          duration: "5m",
          startTime: "2025-04-07T09:47:00Z",
          endTime: "2025-04-07T09:52:00Z",
          jobs: [
            {
              id: "j14",
              name: "Unit Tests",
              status: "success",
              duration: "2m"
            },
            {
              id: "j15",
              name: "Integration Tests",
              status: "failed",
              duration: "3m",
              logs: "Failed to connect to test database. Connection timeout after 3 retries."
            }
          ]
        },
        {
          id: "s11",
          name: "Security Scan",
          status: "skipped",
          duration: "0m",
          startTime: "2025-04-07T09:52:00Z",
          jobs: [
            {
              id: "j16",
              name: "Dependency Scan",
              status: "skipped",
              duration: "0m"
            },
            {
              id: "j17",
              name: "Container Scan",
              status: "skipped",
              duration: "0m"
            }
          ]
        },
        {
          id: "s12",
          name: "Deploy",
          status: "skipped",
          duration: "0m",
          startTime: "2025-04-07T09:52:00Z",
          jobs: [
            {
              id: "j18",
              name: "Deploy to Production",
              status: "skipped",
              duration: "0m"
            }
          ]
        }
      ]
    }
  ]);

  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(pipelines[0]);

  // Refresh pipeline data
  const refreshData = () => {
    console.log("Refreshing CI/CD pipeline data...");
    // In a real application, this would fetch updated data from an API
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Success</Badge>;
      case "failed":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      case "running":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Running</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Pending</Badge>;
      case "skipped":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Skipped</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <Check className="h-5 w-5 text-green-500" />;
      case "failed":
        return <X className="h-5 w-5 text-red-500" />;
      case "running":
        return <RotateCw className="h-5 w-5 text-blue-500 animate-spin" />;
      case "pending":
        return <Clock className="h-5 w-5 text-gray-500" />;
      case "skipped":
        return <Pause className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              CI/CD Pipeline Visualization
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Pipeline selector */}
          <div className="flex flex-wrap gap-2">
            {pipelines.map((pipeline) => (
              <Button
                key={pipeline.id}
                variant={selectedPipeline?.id === pipeline.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPipeline(pipeline)}
                className="flex items-center gap-1"
              >
                {getStatusIcon(pipeline.status)}
                <span className="ml-1">{pipeline.branch}</span>
              </Button>
            ))}
          </div>
          
          {/* Selected pipeline details */}
          {selectedPipeline && (
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{selectedPipeline.name}</h3>
                    {getStatusBadge(selectedPipeline.status)}
                  </div>
                  <div className="text-sm">{selectedPipeline.commitMessage}</div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                    <div>Commit: {selectedPipeline.commitId}</div>
                    <div>Author: {selectedPipeline.author}</div>
                    <div>Started: {formatDate(selectedPipeline.startTime)}</div>
                    <div>Duration: {selectedPipeline.duration}</div>
                  </div>
                </div>
              </div>
              
              {/* Pipeline stages visualization */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Pipeline Stages</h3>
                <div className="relative">
                  {/* Pipeline progress bar */}
                  <div className="absolute top-4 left-4 right-4 h-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <div 
                      className={`h-full rounded-full ${
                        selectedPipeline.status === "success" ? "bg-green-500" : 
                        selectedPipeline.status === "failed" ? "bg-red-500" : 
                        selectedPipeline.status === "running" ? "bg-blue-500" : 
                        "bg-gray-300"
                      }`}
                      style={{ 
                        width: selectedPipeline.status === "success" ? "100%" : 
                               selectedPipeline.status === "failed" ? 
                                 `${(selectedPipeline.stages.findIndex(s => s.status === "failed") + 1) / selectedPipeline.stages.length * 100}%` : 
                               selectedPipeline.status === "running" ? 
                                 `${(selectedPipeline.stages.filter(s => s.status === "success").length + 0.5) / selectedPipeline.stages.length * 100}%` : 
                               "0%" 
                      }}
                    ></div>
                  </div>
                  
                  {/* Stage markers */}
                  <div className="flex justify-between pt-8">
                    {selectedPipeline.stages.map((stage, index) => (
                      <div key={stage.id} className="flex flex-col items-center">
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            stage.status === "success" ? "bg-green-100 text-green-700 border border-green-200" : 
                            stage.status === "failed" ? "bg-red-100 text-red-700 border border-red-200" : 
                            stage.status === "running" ? "bg-blue-100 text-blue-700 border border-blue-200" : 
                            stage.status === "skipped" ? "bg-purple-100 text-purple-700 border border-purple-200" : 
                            "bg-gray-100 text-gray-700 border border-gray-200"
                          }`}
                        >
                          {getStatusIcon(stage.status)}
                        </div>
                        <div className="mt-2 text-xs font-medium text-center">{stage.name}</div>
                        <div className="text-xs text-muted-foreground">{stage.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Stage details */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Stage Details</h3>
                {selectedPipeline.stages.map((stage) => (
                  <div key={stage.id} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(stage.status)}
                        <h4 className="font-medium">{stage.name}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(stage.status)}
                        <span className="text-xs text-muted-foreground">{stage.duration}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {stage.jobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between pl-6 py-1 border-l-2 border-dashed border-gray-200">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(job.status)}
                            <span className="text-sm">{job.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{job.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Show logs for failed jobs */}
                    {stage.jobs.some(job => job.status === "failed" && job.logs) && (
                      <div className="mt-2 p-2 bg-red-50 dark:bg-red-900/10 rounded text-xs font-mono text-red-700 dark:text-red-300 overflow-x-auto">
                        {stage.jobs.find(job => job.status === "failed" && job.logs)?.logs}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!isFullPage && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <span>
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Pipeline
              </span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
