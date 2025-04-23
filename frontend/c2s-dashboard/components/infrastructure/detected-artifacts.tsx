"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileCode, 
  RefreshCw,
  ExternalLink,
  Box,
  Cloud,
  Server,
  GitBranch,
  Database,
  Lock
} from "lucide-react";

interface Artifact {
  id: string;
  name: string;
  type: string;
  path: string;
  status: "valid" | "warning" | "error";
  lastUpdated: string;
}

interface ArtifactGroup {
  type: string;
  icon: React.ReactNode;
  artifacts: Artifact[];
}

interface DetectedArtifactsProps {
  className?: string;
  isFullPage?: boolean;
}

export function DetectedArtifacts({ className, isFullPage = false }: DetectedArtifactsProps) {
  // Sample data for detected artifacts
  const [artifactGroups, setArtifactGroups] = useState<ArtifactGroup[]>([
    {
      type: "docker",
      icon: <Box className="h-4 w-4" />,
      artifacts: [
        {
          id: "d1",
          name: "Dockerfile",
          type: "docker",
          path: "/Dockerfile",
          status: "valid",
          lastUpdated: "2025-04-05T10:30:00Z"
        },
        {
          id: "d2",
          name: "docker-compose.yml",
          type: "docker",
          path: "/docker-compose.yml",
          status: "warning",
          lastUpdated: "2025-04-06T14:15:00Z"
        }
      ]
    },
    {
      type: "kubernetes",
      icon: <Cloud className="h-4 w-4" />,
      artifacts: [
        {
          id: "k1",
          name: "deployment.yaml",
          type: "kubernetes",
          path: "/k8s/deployment.yaml",
          status: "error",
          lastUpdated: "2025-04-07T09:45:00Z"
        },
        {
          id: "k2",
          name: "service.yaml",
          type: "kubernetes",
          path: "/k8s/service.yaml",
          status: "valid",
          lastUpdated: "2025-04-06T16:20:00Z"
        },
        {
          id: "k3",
          name: "ingress.yaml",
          type: "kubernetes",
          path: "/k8s/ingress.yaml",
          status: "valid",
          lastUpdated: "2025-04-05T11:10:00Z"
        }
      ]
    },
    {
      type: "terraform",
      icon: <Server className="h-4 w-4" />,
      artifacts: [
        {
          id: "t1",
          name: "main.tf",
          type: "terraform",
          path: "/terraform/main.tf",
          status: "warning",
          lastUpdated: "2025-04-07T08:30:00Z"
        },
        {
          id: "t2",
          name: "variables.tf",
          type: "terraform",
          path: "/terraform/variables.tf",
          status: "valid",
          lastUpdated: "2025-04-06T13:40:00Z"
        }
      ]
    },
    {
      type: "ci-cd",
      icon: <GitBranch className="h-4 w-4" />,
      artifacts: [
        {
          id: "c1",
          name: ".github/workflows/ci.yml",
          type: "github-actions",
          path: "/.github/workflows/ci.yml",
          status: "valid",
          lastUpdated: "2025-04-07T10:15:00Z"
        },
        {
          id: "c2",
          name: ".github/workflows/deploy.yml",
          type: "github-actions",
          path: "/.github/workflows/deploy.yml",
          status: "valid",
          lastUpdated: "2025-04-06T15:50:00Z"
        }
      ]
    }
  ]);

  // Refresh artifacts data
  const refreshData = () => {
    console.log("Refreshing detected artifacts data...");
    // In a real application, this would fetch updated data from an API
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Valid</Badge>;
      case "warning":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Warning</Badge>;
      case "error":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "docker":
        return <Box className="h-4 w-4" />;
      case "kubernetes":
        return <Cloud className="h-4 w-4" />;
      case "terraform":
        return <Server className="h-4 w-4" />;
      case "github-actions":
        return <GitBranch className="h-4 w-4" />;
      case "database":
        return <Database className="h-4 w-4" />;
      case "security":
        return <Lock className="h-4 w-4" />;
      default:
        return <FileCode className="h-4 w-4" />;
    }
  };

  // Count artifacts by status
  const validCount = artifactGroups.flatMap(g => g.artifacts).filter(a => a.status === "valid").length;
  const warningCount = artifactGroups.flatMap(g => g.artifacts).filter(a => a.status === "warning").length;
  const errorCount = artifactGroups.flatMap(g => g.artifacts).filter(a => a.status === "error").length;
  const totalCount = artifactGroups.flatMap(g => g.artifacts).length;

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <FileCode className="h-5 w-5" />
              Detected Infrastructure Artifacts
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{totalCount}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{validCount}</div>
                <div className="text-xs text-muted-foreground">Valid</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{warningCount}</div>
                <div className="text-xs text-muted-foreground">Warnings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                <div className="text-xs text-muted-foreground">Errors</div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              {artifactGroups.map((group) => (
                <TabsTrigger key={group.type} value={group.type} className="flex-1">
                  <div className="flex items-center gap-1">
                    {group.icon}
                    <span>{group.type.charAt(0).toUpperCase() + group.type.slice(1)}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {artifactGroups.flatMap(group => group.artifacts).map((artifact) => (
                  <div key={artifact.id} className="flex items-center justify-between p-2 rounded-md border hover:bg-muted/50">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(artifact.type)}
                      <div>
                        <div className="font-medium text-sm">{artifact.name}</div>
                        <div className="text-xs text-muted-foreground">{artifact.path}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(artifact.status)}
                      <div className="text-xs text-muted-foreground">{formatDate(artifact.lastUpdated)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            {artifactGroups.map((group) => (
              <TabsContent key={group.type} value={group.type} className="mt-4">
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {group.artifacts.map((artifact) => (
                    <div key={artifact.id} className="flex items-center justify-between p-2 rounded-md border hover:bg-muted/50">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(artifact.type)}
                        <div>
                          <div className="font-medium text-sm">{artifact.name}</div>
                          <div className="text-xs text-muted-foreground">{artifact.path}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(artifact.status)}
                        <div className="text-xs text-muted-foreground">{formatDate(artifact.lastUpdated)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          {!isFullPage && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <span>
                <ExternalLink className="h-4 w-4 mr-2" />
                View All Artifacts
              </span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
