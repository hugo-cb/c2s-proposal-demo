"use client";

import { useState, useEffect } from "react";
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen, 
  File, 
  FileCode, 
  FileJson, 
  FileText,
  Search,
  RefreshCw
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileExplorerProps {
  onFileSelect: (filePath: string) => void;
  onDirectorySelect: (dirPath: string) => void;
  selectedFile: string | null;
  selectedDirectory: string;
}

interface FileNode {
  id: string;
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileNode[];
  extension?: string;
  expanded?: boolean;
}

export function FileExplorer({ 
  onFileSelect, 
  onDirectorySelect, 
  selectedFile, 
  selectedDirectory 
}: FileExplorerProps) {
  const [fileTree, setFileTree] = useState<FileNode[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  // Sample file tree data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call to get file tree
    setTimeout(() => {
      const sampleFileTree: FileNode[] = [
        {
          id: "src",
          name: "src",
          path: "/src",
          type: "directory",
          children: [
            {
              id: "src/components",
              name: "components",
              path: "/src/components",
              type: "directory",
              children: [
                {
                  id: "src/components/Button.tsx",
                  name: "Button.tsx",
                  path: "/src/components/Button.tsx",
                  type: "file",
                  extension: "tsx"
                },
                {
                  id: "src/components/Card.tsx",
                  name: "Card.tsx",
                  path: "/src/components/Card.tsx",
                  type: "file",
                  extension: "tsx"
                },
                {
                  id: "src/components/Input.tsx",
                  name: "Input.tsx",
                  path: "/src/components/Input.tsx",
                  type: "file",
                  extension: "tsx"
                }
              ]
            },
            {
              id: "src/pages",
              name: "pages",
              path: "/src/pages",
              type: "directory",
              children: [
                {
                  id: "src/pages/index.tsx",
                  name: "index.tsx",
                  path: "/src/pages/index.tsx",
                  type: "file",
                  extension: "tsx"
                },
                {
                  id: "src/pages/about.tsx",
                  name: "about.tsx",
                  path: "/src/pages/about.tsx",
                  type: "file",
                  extension: "tsx"
                },
                {
                  id: "src/pages/api",
                  name: "api",
                  path: "/src/pages/api",
                  type: "directory",
                  children: [
                    {
                      id: "src/pages/api/users.ts",
                      name: "users.ts",
                      path: "/src/pages/api/users.ts",
                      type: "file",
                      extension: "ts"
                    }
                  ]
                }
              ]
            },
            {
              id: "src/utils",
              name: "utils",
              path: "/src/utils",
              type: "directory",
              children: [
                {
                  id: "src/utils/helpers.ts",
                  name: "helpers.ts",
                  path: "/src/utils/helpers.ts",
                  type: "file",
                  extension: "ts"
                },
                {
                  id: "src/utils/constants.ts",
                  name: "constants.ts",
                  path: "/src/utils/constants.ts",
                  type: "file",
                  extension: "ts"
                }
              ]
            },
            {
              id: "src/styles",
              name: "styles",
              path: "/src/styles",
              type: "directory",
              children: [
                {
                  id: "src/styles/globals.css",
                  name: "globals.css",
                  path: "/src/styles/globals.css",
                  type: "file",
                  extension: "css"
                }
              ]
            }
          ]
        },
        {
          id: "public",
          name: "public",
          path: "/public",
          type: "directory",
          children: [
            {
              id: "public/images",
              name: "images",
              path: "/public/images",
              type: "directory",
              children: [
                {
                  id: "public/images/logo.png",
                  name: "logo.png",
                  path: "/public/images/logo.png",
                  type: "file",
                  extension: "png"
                }
              ]
            },
            {
              id: "public/favicon.ico",
              name: "favicon.ico",
              path: "/public/favicon.ico",
              type: "file",
              extension: "ico"
            }
          ]
        },
        {
          id: "package.json",
          name: "package.json",
          path: "/package.json",
          type: "file",
          extension: "json"
        },
        {
          id: "tsconfig.json",
          name: "tsconfig.json",
          path: "/tsconfig.json",
          type: "file",
          extension: "json"
        },
        {
          id: "README.md",
          name: "README.md",
          path: "/README.md",
          type: "file",
          extension: "md"
        }
      ];

      // Auto-expand the directory path that matches the selectedDirectory
      const newExpandedNodes = new Set<string>();
      const expandPathToDirectory = (path: string) => {
        const parts = path.split('/').filter(Boolean);
        let currentPath = "";
        
        for (const part of parts) {
          currentPath += `/${part}`;
          newExpandedNodes.add(currentPath);
        }
      };
      
      expandPathToDirectory(selectedDirectory);
      setExpandedNodes(newExpandedNodes);
      setFileTree(sampleFileTree);
      setIsLoading(false);
    }, 500);
  }, [selectedDirectory]);

  // Toggle node expansion
  const toggleNodeExpansion = (node: FileNode) => {
    if (node.type === 'directory') {
      const newExpandedNodes = new Set(expandedNodes);
      if (expandedNodes.has(node.path)) {
        newExpandedNodes.delete(node.path);
      } else {
        newExpandedNodes.add(node.path);
        onDirectorySelect(node.path);
      }
      setExpandedNodes(newExpandedNodes);
    } else {
      onFileSelect(node.path);
    }
  };

  // Get file icon based on extension
  const getFileIcon = (node: FileNode) => {
    if (node.type === 'directory') {
      return expandedNodes.has(node.path) ? <FolderOpen className="h-4 w-4 text-amber-500" /> : <Folder className="h-4 w-4 text-amber-500" />;
    }

    switch (node.extension) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return <FileCode className="h-4 w-4 text-blue-500" />;
      case 'json':
        return <FileJson className="h-4 w-4 text-green-500" />;
      case 'md':
        return <FileText className="h-4 w-4 text-purple-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  // Filter file tree based on search query
  const filterFileTree = (nodes: FileNode[], query: string): FileNode[] => {
    if (!query) return nodes;

    return nodes.filter(node => {
      const matchesQuery = node.name.toLowerCase().includes(query.toLowerCase());
      
      if (node.children) {
        const filteredChildren = filterFileTree(node.children, query);
        node.children = filteredChildren;
        return filteredChildren.length > 0 || matchesQuery;
      }
      
      return matchesQuery;
    });
  };

  // Render file tree recursively
  const renderFileTree = (nodes: FileNode[], level = 0) => {
    const filteredNodes = searchQuery ? filterFileTree(nodes, searchQuery) : nodes;
    
    return filteredNodes.map(node => {
      const isExpanded = expandedNodes.has(node.path);
      const isSelected = node.path === selectedFile || node.path === selectedDirectory;
      
      return (
        <div key={node.id} style={{ paddingLeft: `${level * 16}px` }}>
          <div 
            className={`flex items-center py-1 px-2 rounded-md cursor-pointer hover:bg-muted ${isSelected ? 'bg-muted' : ''}`}
            onClick={() => toggleNodeExpansion(node)}
          >
            <div className="mr-1">
              {node.type === 'directory' ? (
                isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
              ) : (
                <span className="w-4"></span>
              )}
            </div>
            <div className="mr-2">{getFileIcon(node)}</div>
            <span className="text-sm truncate">{node.name}</span>
          </div>
          
          {node.type === 'directory' && isExpanded && node.children && (
            <div>
              {renderFileTree(node.children, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  // Refresh file tree
  const refreshFileTree = () => {
    setIsLoading(true);
    // Simulate API call to refresh file tree
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search files..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="ghost" size="icon" onClick={refreshFileTree} disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-280px)]">
        {isLoading ? (
          <div className="flex items-center justify-center h-20">
            <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="pr-4">
            {renderFileTree(fileTree)}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
