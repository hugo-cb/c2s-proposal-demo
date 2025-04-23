"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  History, 
  RefreshCw,
  ExternalLink,
  GitCommit,
  User,
  Calendar,
  FileCode,
  ArrowUpDown
} from "lucide-react";

interface ArtifactChange {
  id: string;
  artifactName: string;
  artifactType: string;
  artifactPath: string;
  changeType: "create" | "update" | "delete";
  author: string;
  commitId: string;
  message: string;
  timestamp: string;
  impact: "high" | "medium" | "low";
}

interface ArtifactChangeHistoryProps {
  className?: string;
  isFullPage?: boolean;
}

export function ArtifactChangeHistory({ className, isFullPage = false }: ArtifactChangeHistoryProps) {
  // Sample data for artifact change history
  const [changes, setChanges] = useState<ArtifactChange[]>([
    {
      id: "ch1",
      artifactName: "Dockerfile",
      artifactType: "docker",
      artifactPath: "/Dockerfile",
      changeType: "update",
      author: "John Smith",
      commitId: "a1b2c3d",
      message: "Updated base image to latest version",
      timestamp: "2025-04-07T10:30:00Z",
      impact: "medium"
    },
    {
      id: "ch2",
      artifactName: "deployment.yaml",
      artifactType: "kubernetes",
      artifactPath: "/k8s/deployment.yaml",
      changeType: "update",
      author: "Jane Doe",
      commitId: "e4f5g6h",
      message: "Added resource limits to prevent pod eviction",
      timestamp: "2025-04-06T14:15:00Z",
      impact: "high"
    },
    {
      id: "ch3",
      artifactName: "main.tf",
      artifactType: "terraform",
      artifactPath: "/terraform/main.tf",
      changeType: "update",
      author: "Michael Johnson",
      commitId: "i7j8k9l",
      message: "Fixed S3 bucket permissions to restrict public access",
      timestamp: "2025-04-05T09:45:00Z",
      impact: "high"
    },
    {
      id: "ch4",
      artifactName: "ci.yml",
      artifactType: "github-actions",
      artifactPath: "/.github/workflows/ci.yml",
      changeType: "create",
      author: "Sarah Williams",
      commitId: "m1n2o3p",
      message: "Added new CI workflow for security scanning",
      timestamp: "2025-04-04T16:20:00Z",
      impact: "medium"
    },
    {
      id: "ch5",
      artifactName: "docker-compose.yml",
      artifactType: "docker",
      artifactPath: "/docker-compose.yml",
      changeType: "update",
      author: "Robert Brown",
      commitId: "q4r5s6t",
      message: "Updated environment variables for database connection",
      timestamp: "2025-04-03T11:10:00Z",
      impact: "low"
    }
  ]);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Refresh change history data
  const refreshData = () => {
    console.log("Refreshing artifact change history data...");
    // In a real application, this would fetch updated data from an API
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get change type badge
  const getChangeTypeBadge = (changeType: string) => {
    switch (changeType) {
      case "create":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Created</Badge>;
      case "update":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Updated</Badge>;
      case "delete":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Deleted</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get impact badge
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High Impact</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium Impact</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Low Impact</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Sort changes by timestamp
  const sortedChanges = [...changes].sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Display changes based on full page or card view
  const displayChanges = isFullPage ? sortedChanges : sortedChanges.slice(0, 5);

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Critical Artifact Change History
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleSortOrder}
              title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={refreshData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayChanges.length > 0 ? (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {displayChanges.map((change) => (
                <div 
                  key={change.id} 
                  className={`rounded-lg border p-3 ${
                    change.impact === "high" ? "border-red-200 bg-red-50 dark:bg-red-900/10" : 
                    change.impact === "medium" ? "border-amber-200 bg-amber-50 dark:bg-amber-900/10" :
                    "border-gray-200 bg-gray-50 dark:bg-gray-900/10"
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <FileCode className="h-5 w-5 text-blue-500" />
                        <div>
                          <h3 className="font-medium">{change.artifactName}</h3>
                          <p className="text-xs text-muted-foreground">{change.artifactPath}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getChangeTypeBadge(change.changeType)}
                        {getImpactBadge(change.impact)}
                      </div>
                    </div>
                    
                    <p className="text-sm">{change.message}</p>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        <span>{change.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitCommit className="h-3.5 w-3.5" />
                        <span>{change.commitId}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(change.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <History className="h-10 w-10 text-muted-foreground mb-3 opacity-50" />
              <h3 className="text-sm font-medium mb-1">No Change History</h3>
              <p className="text-xs text-muted-foreground max-w-xs">
                There is no change history for critical infrastructure artifacts at this time.
              </p>
            </div>
          )}
          
          {!isFullPage && changes.length > 5 && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <span>
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Change History
              </span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
