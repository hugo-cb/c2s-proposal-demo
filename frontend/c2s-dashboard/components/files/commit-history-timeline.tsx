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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  GitCommit, 
  GitBranch, 
  GitMerge, 
  Clock, 
  User, 
  RefreshCw,
  Calendar,
  Filter,
  ChevronRight,
  ChevronDown,
  FileCode,
  Plus,
  Minus,
  AlertCircle
} from "lucide-react";

interface CommitHistoryTimelineProps {
  filePath: string | null;
  directoryPath: string | null;
}

interface Commit {
  id: string;
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  date: string;
  branch: string;
  isMerge: boolean;
  changes: {
    added: number;
    removed: number;
    modified: number;
  };
  files: {
    path: string;
    status: "added" | "modified" | "removed";
    additions: number;
    deletions: number;
  }[];
}

export function CommitHistoryTimeline({ filePath, directoryPath }: CommitHistoryTimelineProps) {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);
  const [timeFilter, setTimeFilter] = useState<string>("all");
  const [authorFilter, setAuthorFilter] = useState<string>("all");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"timeline" | "list">("timeline");

  // Sample commit data - in a real app, this would come from an API
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call to get commit history
    setTimeout(() => {
      const sampleCommits: Commit[] = [
        {
          id: "1",
          hash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
          shortHash: "a1b2c3d",
          message: "Fix button styling issues",
          author: "John Doe",
          date: "2025-04-07T10:15:00Z",
          branch: "main",
          isMerge: false,
          changes: {
            added: 5,
            removed: 3,
            modified: 1
          },
          files: [
            {
              path: "/src/components/Button.tsx",
              status: "modified",
              additions: 5,
              deletions: 3
            }
          ]
        },
        {
          id: "2",
          hash: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1",
          shortHash: "b2c3d4e",
          message: "Add card component",
          author: "Jane Smith",
          date: "2025-04-06T14:30:00Z",
          branch: "feature/card-component",
          isMerge: false,
          changes: {
            added: 120,
            removed: 0,
            modified: 0
          },
          files: [
            {
              path: "/src/components/Card.tsx",
              status: "added",
              additions: 120,
              deletions: 0
            }
          ]
        },
        {
          id: "3",
          hash: "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2",
          shortHash: "c3d4e5f",
          message: "Merge pull request #42 from feature/card-component",
          author: "Mike Johnson",
          date: "2025-04-06T15:45:00Z",
          branch: "main",
          isMerge: true,
          changes: {
            added: 120,
            removed: 0,
            modified: 0
          },
          files: [
            {
              path: "/src/components/Card.tsx",
              status: "added",
              additions: 120,
              deletions: 0
            }
          ]
        },
        {
          id: "4",
          hash: "d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3",
          shortHash: "d4e5f6g",
          message: "Update input component with new styles",
          author: "John Doe",
          date: "2025-04-05T09:20:00Z",
          branch: "main",
          isMerge: false,
          changes: {
            added: 15,
            removed: 8,
            modified: 1
          },
          files: [
            {
              path: "/src/components/Input.tsx",
              status: "modified",
              additions: 15,
              deletions: 8
            }
          ]
        },
        {
          id: "5",
          hash: "e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4",
          shortHash: "e5f6g7h",
          message: "Fix responsive layout issues",
          author: "Jane Smith",
          date: "2025-04-04T11:10:00Z",
          branch: "main",
          isMerge: false,
          changes: {
            added: 7,
            removed: 12,
            modified: 3
          },
          files: [
            {
              path: "/src/pages/index.tsx",
              status: "modified",
              additions: 4,
              deletions: 6
            },
            {
              path: "/src/pages/about.tsx",
              status: "modified",
              additions: 3,
              deletions: 6
            },
            {
              path: "/src/styles/globals.css",
              status: "modified",
              additions: 0,
              deletions: 0
            }
          ]
        },
        {
          id: "6",
          hash: "f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5",
          shortHash: "f6g7h8i",
          message: "Add API endpoints for user management",
          author: "Mike Johnson",
          date: "2025-04-03T13:25:00Z",
          branch: "feature/user-api",
          isMerge: false,
          changes: {
            added: 85,
            removed: 0,
            modified: 0
          },
          files: [
            {
              path: "/src/pages/api/users.ts",
              status: "added",
              additions: 85,
              deletions: 0
            }
          ]
        },
        {
          id: "7",
          hash: "g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
          shortHash: "g7h8i9j",
          message: "Merge pull request #41 from feature/user-api",
          author: "John Doe",
          date: "2025-04-03T16:40:00Z",
          branch: "main",
          isMerge: true,
          changes: {
            added: 85,
            removed: 0,
            modified: 0
          },
          files: [
            {
              path: "/src/pages/api/users.ts",
              status: "added",
              additions: 85,
              deletions: 0
            }
          ]
        },
        {
          id: "8",
          hash: "h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7",
          shortHash: "h8i9j0k",
          message: "Update utility functions",
          author: "Jane Smith",
          date: "2025-04-02T10:05:00Z",
          branch: "main",
          isMerge: false,
          changes: {
            added: 22,
            removed: 15,
            modified: 2
          },
          files: [
            {
              path: "/src/utils/helpers.ts",
              status: "modified",
              additions: 18,
              deletions: 12
            },
            {
              path: "/src/utils/constants.ts",
              status: "modified",
              additions: 4,
              deletions: 3
            }
          ]
        },
        {
          id: "9",
          hash: "i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8",
          shortHash: "i9j0k1l",
          message: "Initial commit",
          author: "John Doe",
          date: "2025-04-01T09:00:00Z",
          branch: "main",
          isMerge: false,
          changes: {
            added: 1024,
            removed: 0,
            modified: 0
          },
          files: [
            {
              path: "/package.json",
              status: "added",
              additions: 65,
              deletions: 0
            },
            {
              path: "/tsconfig.json",
              status: "added",
              additions: 42,
              deletions: 0
            },
            {
              path: "/README.md",
              status: "added",
              additions: 35,
              deletions: 0
            },
            {
              path: "/src/pages/index.tsx",
              status: "added",
              additions: 120,
              deletions: 0
            },
            {
              path: "/src/styles/globals.css",
              status: "added",
              additions: 180,
              deletions: 0
            }
          ]
        }
      ];

      // Filter commits based on file path or directory path
      let filteredCommits = sampleCommits;
      
      if (filePath) {
        filteredCommits = sampleCommits.filter(commit => 
          commit.files.some(file => file.path === filePath)
        );
      } else if (directoryPath) {
        filteredCommits = sampleCommits.filter(commit => 
          commit.files.some(file => file.path.startsWith(directoryPath))
        );
      }

      setCommits(filteredCommits);
      if (filteredCommits.length > 0) {
        setSelectedCommit(filteredCommits[0]);
      }
      setIsLoading(false);
    }, 500);
  }, [filePath, directoryPath]);

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

  // Get relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 30) {
      return formatDate(dateString);
    }
    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    }
    if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    }
    if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
  };

  // Get commit icon
  const getCommitIcon = (commit: Commit) => {
    if (commit.isMerge) {
      return <GitMerge className="h-5 w-5 text-purple-500" />;
    }
    return <GitCommit className="h-5 w-5 text-blue-500" />;
  };

  // Get file status icon
  const getFileStatusIcon = (status: string) => {
    switch (status) {
      case 'added':
        return <Plus className="h-4 w-4 text-green-500" />;
      case 'removed':
        return <Minus className="h-4 w-4 text-red-500" />;
      case 'modified':
        return <FileCode className="h-4 w-4 text-amber-500" />;
      default:
        return <FileCode className="h-4 w-4 text-gray-500" />;
    }
  };

  // Apply filters
  const filteredCommits = commits.filter(commit => {
    let passesFilter = true;
    
    if (timeFilter !== "all") {
      const commitDate = new Date(commit.date);
      const now = new Date();
      
      switch (timeFilter) {
        case "today":
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          passesFilter = passesFilter && commitDate >= today;
          break;
        case "week":
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          passesFilter = passesFilter && commitDate >= weekAgo;
          break;
        case "month":
          const monthAgo = new Date();
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          passesFilter = passesFilter && commitDate >= monthAgo;
          break;
      }
    }
    
    if (authorFilter !== "all") {
      passesFilter = passesFilter && commit.author === authorFilter;
    }
    
    if (branchFilter !== "all") {
      passesFilter = passesFilter && commit.branch === branchFilter;
    }
    
    return passesFilter;
  });

  // Get unique authors
  const authors = Array.from(new Set(commits.map(commit => commit.author)));
  
  // Get unique branches
  const branches = Array.from(new Set(commits.map(commit => commit.branch)));

  // Refresh data
  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-medium">
                Commit History
                {filePath ? ` for ${filePath.split('/').pop()}` : directoryPath ? ` for ${directoryPath}` : ''}
              </CardTitle>
              <CardDescription>
                {filteredCommits.length} commit{filteredCommits.length !== 1 ? 's' : ''} found
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "timeline" | "list")} className="w-[200px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
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
                  value={timeFilter}
                  onValueChange={setTimeFilter}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={authorFilter}
                  onValueChange={setAuthorFilter}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Author" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Authors</SelectItem>
                    {authors.map(author => (
                      <SelectItem key={author} value={author}>{author}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={branchFilter}
                  onValueChange={setBranchFilter}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    {branches.map(branch => (
                      <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-md">
                <ScrollArea className="h-[400px]">
                  {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  ) : filteredCommits.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
                      <AlertCircle className="h-8 w-8" />
                      <p>No commits found</p>
                    </div>
                  ) : viewMode === "timeline" ? (
                    <div className="relative pl-8 pr-4 py-4">
                      <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-border" />
                      
                      {filteredCommits.map((commit, index) => (
                        <div 
                          key={commit.id} 
                          className={`relative mb-6 last:mb-0 ${selectedCommit?.id === commit.id ? 'bg-muted rounded-md p-2 -ml-2' : ''}`}
                          onClick={() => setSelectedCommit(commit)}
                        >
                          <div className="absolute left-[-24px] top-0 p-1 bg-background rounded-full border">
                            {getCommitIcon(commit)}
                          </div>
                          
                          <div className="flex flex-col cursor-pointer">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="font-mono text-xs">
                                {commit.shortHash}
                              </Badge>
                              <Badge variant="outline" className={`
                                ${commit.branch === 'main' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}
                              `}>
                                {commit.branch}
                              </Badge>
                            </div>
                            
                            <h4 className="font-medium text-sm mb-1">{commit.message}</h4>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{commit.author}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span title={formatDate(commit.date)}>{getRelativeTime(commit.date)}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 mt-2 text-xs">
                              <span className="flex items-center gap-1 text-green-600">
                                <Plus className="h-3 w-3" />
                                {commit.changes.added}
                              </span>
                              <span className="flex items-center gap-1 text-red-600">
                                <Minus className="h-3 w-3" />
                                {commit.changes.removed}
                              </span>
                              <span className="text-muted-foreground">
                                {commit.files.length} file{commit.files.length !== 1 ? 's' : ''} changed
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4">
                      {filteredCommits.map((commit) => (
                        <div 
                          key={commit.id} 
                          className={`flex items-start gap-3 p-3 mb-2 rounded-md cursor-pointer hover:bg-muted ${selectedCommit?.id === commit.id ? 'bg-muted' : ''}`}
                          onClick={() => setSelectedCommit(commit)}
                        >
                          <div className="mt-1">
                            {getCommitIcon(commit)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="font-mono text-xs">
                                {commit.shortHash}
                              </Badge>
                              <Badge variant="outline" className={`
                                ${commit.branch === 'main' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}
                              `}>
                                {commit.branch}
                              </Badge>
                            </div>
                            
                            <h4 className="font-medium text-sm mb-1 truncate">{commit.message}</h4>
                            
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{commit.author}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span title={formatDate(commit.date)}>{getRelativeTime(commit.date)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
              
              <div className="border rounded-md">
                {selectedCommit ? (
                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-medium mb-1">{selectedCommit.message}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="font-mono">
                          {selectedCommit.shortHash}
                        </Badge>
                        <Badge variant="outline" className={`
                          ${selectedCommit.branch === 'main' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-purple-50 text-purple-700 border-purple-200'}
                        `}>
                          <GitBranch className="h-3 w-3 mr-1" />
                          {selectedCommit.branch}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{selectedCommit.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(selectedCommit.date)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-6">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          <Plus className="h-3 w-3 mr-1" />
                          {selectedCommit.changes.added} additions
                        </Badge>
                        <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                          <Minus className="h-3 w-3 mr-1" />
                          {selectedCommit.changes.removed} deletions
                        </Badge>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-2">Changed Files</h4>
                    <ScrollArea className="h-[220px] border rounded-md">
                      <div className="p-2">
                        {selectedCommit.files.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 hover:bg-muted rounded-md">
                            <div className="flex-shrink-0">
                              {getFileStatusIcon(file.status)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm truncate">{file.path}</div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1 text-green-600">
                                  <Plus className="h-3 w-3" />
                                  {file.additions}
                                </span>
                                <span className="flex items-center gap-1 text-red-600">
                                  <Minus className="h-3 w-3" />
                                  {file.deletions}
                                </span>
                              </div>
                            </div>
                            <Badge variant="outline" className={`
                              ${file.status === 'added' ? 'bg-green-50 text-green-700 border-green-200' : 
                                file.status === 'removed' ? 'bg-red-50 text-red-700 border-red-200' : 
                                'bg-amber-50 text-amber-700 border-amber-200'}
                            `}>
                              {file.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] gap-2 text-muted-foreground">
                    <GitCommit className="h-8 w-8" />
                    <p>Select a commit to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
