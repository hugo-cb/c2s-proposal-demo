"use client";

import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  RefreshCw, 
  FileCode, 
  FileJson, 
  FileText, 
  File, 
  Calendar,
  Settings,
  Image,
  Database,
  FileSymlink,
  Info,
  AlertCircle
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MostChangedFilesProps {
  directoryPath: string;
  onFileSelect: (filePath: string) => void;
}

interface FileChangeData {
  id: string;
  name: string;
  path: string;
  extension: string;
  language: string;
  fileCategory: "source" | "infra" | "image" | "document" | "data" | "config" | "other";
  changes: number;
  lastChanged: string;
  contributors: number;
  insights: string[];
}

export function MostChangedFiles({ directoryPath, onFileSelect }: MostChangedFilesProps) {
  const [files, setFiles] = useState<FileChangeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<string>("all");
  const [fileCategoryFilter, setFileCategoryFilter] = useState<string>("all");
  const [limit, setLimit] = useState<number>(10);

  // Sample data - in a real app, this would come from an API
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call to get most changed files
    setTimeout(() => {
      const sampleFiles: FileChangeData[] = [
        {
          id: "1",
          name: "index.tsx",
          path: "/src/pages/index.tsx",
          extension: "tsx",
          language: "TypeScript",
          fileCategory: "source",
          changes: 42,
          lastChanged: "2025-04-03T16:20:00Z",
          contributors: 3,
          insights: [
            "High change frequency indicates potential instability",
            "Consider refactoring to reduce complexity",
            "Main entry point with many dependencies"
          ]
        },
        {
          id: "2",
          name: "globals.css",
          path: "/src/styles/globals.css",
          extension: "css",
          language: "CSS",
          fileCategory: "source",
          changes: 35,
          lastChanged: "2025-03-29T10:30:00Z",
          contributors: 2,
          insights: [
            "Frequently changed styles indicate evolving UI",
            "Consider using CSS variables for theme colors",
            "Potential for CSS refactoring to improve maintainability"
          ]
        },
        {
          id: "3",
          name: "data.json",
          path: "/src/data/data.json",
          extension: "json",
          language: "JSON",
          fileCategory: "data",
          changes: 30,
          lastChanged: "2025-03-23T09:15:00Z",
          contributors: 1,
          insights: [
            "Large data file with frequent changes",
            "Consider splitting into smaller files",
            "Potential for moving to a database instead of static JSON"
          ]
        },
        {
          id: "4",
          name: "package.json",
          path: "/package.json",
          extension: "json",
          language: "JSON",
          fileCategory: "config",
          changes: 28,
          lastChanged: "2025-03-28T15:20:00Z",
          contributors: 4,
          insights: [
            "Frequent dependency updates",
            "Consider using dependency management tools",
            "Lock file changes indicate potential version conflicts"
          ]
        },
        {
          id: "5",
          name: "Button.tsx",
          path: "/src/components/Button.tsx",
          extension: "tsx",
          language: "TypeScript",
          fileCategory: "source",
          changes: 24,
          lastChanged: "2025-04-05T14:30:00Z",
          contributors: 2,
          insights: [
            "Core UI component with many changes",
            "Consider creating a more stable API",
            "High usage across application"
          ]
        },
        {
          id: "6",
          name: "users.ts",
          path: "/src/pages/api/users.ts",
          extension: "ts",
          language: "TypeScript",
          fileCategory: "source",
          changes: 18,
          lastChanged: "2025-04-01T13:45:00Z",
          contributors: 2,
          insights: [
            "API endpoint with frequent changes",
            "Consider versioning the API",
            "Potential for improved error handling"
          ]
        },
        {
          id: "7",
          name: "Card.tsx",
          path: "/src/components/Card.tsx",
          extension: "tsx",
          language: "TypeScript",
          fileCategory: "source",
          changes: 15,
          lastChanged: "2025-04-04T10:15:00Z",
          contributors: 1,
          insights: [
            "UI component with moderate changes",
            "Consider splitting into smaller components",
            "Used in multiple places"
          ]
        },
        {
          id: "8",
          name: "README.md",
          path: "/README.md",
          extension: "md",
          language: "Markdown",
          fileCategory: "document",
          changes: 15,
          lastChanged: "2025-03-24T10:30:00Z",
          contributors: 3,
          insights: [
            "Documentation updates indicate active project",
            "Consider automating some documentation",
            "Good practice to keep documentation updated"
          ]
        },
        {
          id: "9",
          name: "docker-compose.yml",
          path: "/docker-compose.yml",
          extension: "yml",
          language: "YAML",
          fileCategory: "infra",
          changes: 12,
          lastChanged: "2025-03-26T09:45:00Z",
          contributors: 2,
          insights: [
            "Infrastructure changes indicate evolving deployment needs",
            "Consider using infrastructure as code tools",
            "Multiple contributors suggest shared responsibility"
          ]
        },
        {
          id: "10",
          name: "about.tsx",
          path: "/src/pages/about.tsx",
          extension: "tsx",
          language: "TypeScript",
          fileCategory: "source",
          changes: 12,
          lastChanged: "2025-04-02T11:30:00Z",
          contributors: 1,
          insights: [
            "Page component with moderate changes",
            "Good component structure",
            "Content updates are common"
          ]
        },
        {
          id: "11",
          name: "helpers.ts",
          path: "/src/utils/helpers.ts",
          extension: "ts",
          language: "TypeScript",
          fileCategory: "source",
          changes: 10,
          lastChanged: "2025-03-31T09:15:00Z",
          contributors: 2,
          insights: [
            "Utility functions with good documentation",
            "Moderate change frequency",
            "Used throughout the application"
          ]
        },
        {
          id: "12",
          name: "Input.tsx",
          path: "/src/components/Input.tsx",
          extension: "tsx",
          language: "TypeScript",
          fileCategory: "source",
          changes: 8,
          lastChanged: "2025-04-06T09:45:00Z",
          contributors: 1,
          insights: [
            "Well-structured component",
            "Low change frequency indicates stability",
            "High test coverage"
          ]
        },
        {
          id: "13",
          name: "Dockerfile",
          path: "/Dockerfile",
          extension: "",
          language: "Docker",
          fileCategory: "infra",
          changes: 7,
          lastChanged: "2025-03-27T11:10:00Z",
          contributors: 1,
          insights: [
            "Using multi-stage build",
            "Consider using more specific base image tag",
            "Infrastructure changes are less frequent"
          ]
        },
        {
          id: "14",
          name: "constants.ts",
          path: "/src/utils/constants.ts",
          extension: "ts",
          language: "TypeScript",
          fileCategory: "source",
          changes: 5,
          lastChanged: "2025-03-30T14:50:00Z",
          contributors: 1,
          insights: [
            "Well-organized constants",
            "Low change frequency indicates stability",
            "Used throughout the application"
          ]
        },
        {
          id: "15",
          name: "logo.png",
          path: "/public/images/logo.png",
          extension: "png",
          language: "",
          fileCategory: "image",
          changes: 2,
          lastChanged: "2025-03-25T14:20:00Z",
          contributors: 1,
          insights: [
            "Image could be optimized for web",
            "Consider adding WebP version",
            "Asset changes are infrequent"
          ]
        }
      ];

      // Filter data based on directory path
      let filteredFiles = directoryPath === "/"
        ? sampleFiles
        : sampleFiles.filter(file => file.path.startsWith(directoryPath));

      // Apply time range filter
      if (timeRange !== "all") {
        const now = new Date();
        let startDate: Date;
        
        switch (timeRange) {
          case "week":
            startDate = new Date(now);
            startDate.setDate(now.getDate() - 7);
            break;
          case "month":
            startDate = new Date(now);
            startDate.setMonth(now.getMonth() - 1);
            break;
          case "quarter":
            startDate = new Date(now);
            startDate.setMonth(now.getMonth() - 3);
            break;
          default:
            startDate = new Date(0); // Beginning of time
        }
        
        filteredFiles = filteredFiles.filter(file => new Date(file.lastChanged) >= startDate);
      }

      // Apply category filter
      if (fileCategoryFilter !== "all") {
        filteredFiles = filteredFiles.filter(file => file.fileCategory === fileCategoryFilter);
      }

      // Sort by changes (descending)
      filteredFiles.sort((a, b) => b.changes - a.changes);

      // Limit the number of files
      filteredFiles = filteredFiles.slice(0, limit);

      setFiles(filteredFiles);
      setIsLoading(false);
    }, 500);
  }, [directoryPath, timeRange, fileCategoryFilter, limit]);

  // Get file icon based on extension and category
  const getFileIcon = (file: FileChangeData) => {
    // First check file category
    switch (file.fileCategory) {
      case 'infra':
        return <Settings className="h-4 w-4 text-purple-500" />;
      case 'image':
        return <Image className="h-4 w-4 text-pink-500" />;
      case 'document':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'data':
        return <Database className="h-4 w-4 text-amber-500" />;
      case 'config':
        return <FileSymlink className="h-4 w-4 text-teal-500" />;
    }

    // Then check extension
    switch (file.extension) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return <FileCode className="h-4 w-4 text-blue-500" />;
      case 'json':
        return <FileJson className="h-4 w-4 text-green-500" />;
      case 'md':
        return <FileText className="h-4 w-4 text-purple-500" />;
      case 'css':
      case 'scss':
      case 'sass':
        return <FileCode className="h-4 w-4 text-pink-500" />;
      case 'yml':
      case 'yaml':
        return <FileCode className="h-4 w-4 text-teal-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
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

  // Get changes heat color
  const getChangesHeatColor = (changes: number) => {
    const maxChanges = files.length > 0 ? files[0].changes : 50;
    const normalizedChanges = changes / maxChanges;
    
    if (normalizedChanges <= 0.25) return "bg-green-50 text-green-700 border-green-200";
    if (normalizedChanges <= 0.5) return "bg-blue-50 text-blue-700 border-blue-200";
    if (normalizedChanges <= 0.75) return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-red-50 text-red-700 border-red-200";
  };

  // Get changes heat background
  const getChangesHeatBackground = (changes: number) => {
    const maxChanges = files.length > 0 ? files[0].changes : 50;
    const normalizedChanges = changes / maxChanges;
    
    if (normalizedChanges <= 0.25) return "bg-green-50";
    if (normalizedChanges <= 0.5) return "bg-blue-50";
    if (normalizedChanges <= 0.75) return "bg-amber-50";
    return "bg-red-50";
  };

  // Refresh data
  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Most Changed Files</CardTitle>
            <CardDescription>
              Files with the highest number of changes
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={refreshData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select
                value={timeRange}
                onValueChange={setTimeRange}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <File className="h-4 w-4 text-muted-foreground" />
              <Select
                value={fileCategoryFilter}
                onValueChange={setFileCategoryFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="source">Source Code</SelectItem>
                  <SelectItem value="infra">Infrastructure</SelectItem>
                  <SelectItem value="config">Configuration</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
                  <SelectItem value="document">Documentation</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <Select
                value={limit.toString()}
                onValueChange={(value) => setLimit(parseInt(value))}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">Top 5</SelectItem>
                  <SelectItem value="10">Top 10</SelectItem>
                  <SelectItem value="20">Top 20</SelectItem>
                  <SelectItem value="50">Top 50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-50 rounded-sm"></div>
                <span className="text-xs text-muted-foreground">Low</span>
              </div>
              <div className="flex items-center gap-0.5">
                <div className="w-3 h-3 bg-blue-50 rounded-sm"></div>
                <div className="w-3 h-3 bg-amber-50 rounded-sm"></div>
                <div className="w-3 h-3 bg-red-50 rounded-sm"></div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-muted-foreground">High</span>
              </div>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-[400px]">
              <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] gap-2 text-muted-foreground">
              <AlertCircle className="h-8 w-8" />
              <p>No files found with the selected filters</p>
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Changes</TableHead>
                    <TableHead>Last Changed</TableHead>
                    <TableHead>Contributors</TableHead>
                    <TableHead>Insights</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {files.map((file) => (
                    <TableRow 
                      key={file.id} 
                      className={getChangesHeatBackground(file.changes)}
                    >
                      <TableCell>
                        <div 
                          className="flex items-center gap-2 cursor-pointer hover:underline"
                          onClick={() => onFileSelect(file.path)}
                        >
                          {getFileIcon(file)}
                          <span>{file.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {file.fileCategory}
                        </Badge>
                      </TableCell>
                      <TableCell>{file.language || "-"}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getChangesHeatColor(file.changes)}>
                          {file.changes}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(file.lastChanged)}</TableCell>
                      <TableCell>{file.contributors}</TableCell>
                      <TableCell>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Info className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="w-80">
                              <div className="space-y-2">
                                <h4 className="font-medium">Insights</h4>
                                <ul className="list-disc pl-4 space-y-1">
                                  {file.insights.map((insight, index) => (
                                    <li key={index} className="text-xs">{insight}</li>
                                  ))}
                                </ul>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
