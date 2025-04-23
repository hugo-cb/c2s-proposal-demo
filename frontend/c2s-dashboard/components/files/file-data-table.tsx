"use client";

import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  FileCode, 
  FileJson, 
  FileText, 
  File, 
  Search, 
  RefreshCw,
  ArrowUpDown,
  Calendar,
  User,
  FileType,
  Filter,
  Code,
  Image,
  Settings,
  Database,
  FileSymlink
} from "lucide-react";

interface FileDataTableProps {
  directoryPath: string;
  onFileSelect: (filePath: string) => void;
}

interface FileData {
  id: string;
  name: string;
  path: string;
  type: string;
  extension: string;
  language: string;
  fileCategory: "source" | "infra" | "image" | "document" | "data" | "config" | "other";
  size: number;
  lastModified: string;
  author: string;
  linesOfCode: number;
  complexity: number;
  coverage: number;
  changes: number;
  insights: string[];
}

export function FileDataTable({ directoryPath, onFileSelect }: FileDataTableProps) {
  const [data, setData] = useState<FileData[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fileTypeFilter, setFileTypeFilter] = useState<string>("all");
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const [fileCategoryFilter, setFileCategoryFilter] = useState<string>("all");
  const [authorFilter, setAuthorFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const sampleFileData: FileData[] = [
        {
          id: "1",
          name: "Button.tsx",
          path: "/src/components/Button.tsx",
          type: "file",
          extension: "tsx",
          language: "TypeScript",
          fileCategory: "source",
          size: 2048,
          lastModified: "2025-04-05T14:30:00Z",
          author: "John Doe",
          linesOfCode: 120,
          complexity: 4,
          coverage: 85,
          changes: 24,
          insights: ["Component has good test coverage", "Low complexity score"]
        },
        {
          id: "2",
          name: "Card.tsx",
          path: "/src/components/Card.tsx",
          type: "file",
          extension: "tsx",
          language: "TypeScript",
          fileCategory: "source",
          size: 3072,
          lastModified: "2025-04-04T10:15:00Z",
          author: "Jane Smith",
          linesOfCode: 180,
          complexity: 6,
          coverage: 78,
          changes: 15,
          insights: ["Consider splitting into smaller components", "Missing some edge case tests"]
        },
        {
          id: "3",
          name: "Input.tsx",
          path: "/src/components/Input.tsx",
          type: "file",
          extension: "tsx",
          language: "TypeScript",
          fileCategory: "source",
          size: 1536,
          lastModified: "2025-04-06T09:45:00Z",
          author: "John Doe",
          linesOfCode: 95,
          complexity: 3,
          coverage: 92,
          changes: 8,
          insights: ["Well-structured component", "High test coverage"]
        },
        {
          id: "4",
          name: "index.tsx",
          path: "/src/pages/index.tsx",
          type: "file",
          extension: "tsx",
          language: "TypeScript",
          fileCategory: "source",
          size: 4096,
          lastModified: "2025-04-03T16:20:00Z",
          author: "Jane Smith",
          linesOfCode: 210,
          complexity: 8,
          coverage: 65,
          changes: 42,
          insights: ["High change frequency", "Consider refactoring to reduce complexity", "Improve test coverage"]
        },
        {
          id: "5",
          name: "about.tsx",
          path: "/src/pages/about.tsx",
          type: "file",
          extension: "tsx",
          language: "TypeScript",
          fileCategory: "source",
          size: 2560,
          lastModified: "2025-04-02T11:30:00Z",
          author: "Mike Johnson",
          linesOfCode: 150,
          complexity: 5,
          coverage: 72,
          changes: 12,
          insights: ["Good component structure"]
        },
        {
          id: "6",
          name: "users.ts",
          path: "/src/pages/api/users.ts",
          type: "file",
          extension: "ts",
          language: "TypeScript",
          fileCategory: "source",
          size: 1024,
          lastModified: "2025-04-01T13:45:00Z",
          author: "Mike Johnson",
          linesOfCode: 85,
          complexity: 7,
          coverage: 80,
          changes: 18,
          insights: ["API endpoint with good error handling", "Consider adding more validation"]
        },
        {
          id: "7",
          name: "helpers.ts",
          path: "/src/utils/helpers.ts",
          type: "file",
          extension: "ts",
          language: "TypeScript",
          fileCategory: "source",
          size: 1792,
          lastModified: "2025-03-31T09:15:00Z",
          author: "John Doe",
          linesOfCode: 110,
          complexity: 6,
          coverage: 88,
          changes: 10,
          insights: ["Utility functions with good documentation"]
        },
        {
          id: "8",
          name: "constants.ts",
          path: "/src/utils/constants.ts",
          type: "file",
          extension: "ts",
          language: "TypeScript",
          fileCategory: "source",
          size: 768,
          lastModified: "2025-03-30T14:50:00Z",
          author: "Jane Smith",
          linesOfCode: 45,
          complexity: 1,
          coverage: 100,
          changes: 5,
          insights: ["Well-organized constants"]
        },
        {
          id: "9",
          name: "globals.css",
          path: "/src/styles/globals.css",
          type: "file",
          extension: "css",
          language: "CSS",
          fileCategory: "source",
          size: 3584,
          lastModified: "2025-03-29T10:30:00Z",
          author: "Mike Johnson",
          linesOfCode: 320,
          complexity: 2,
          coverage: 0,
          changes: 35,
          insights: ["Consider using CSS variables for theme colors", "High change frequency"]
        },
        {
          id: "10",
          name: "package.json",
          path: "/package.json",
          type: "file",
          extension: "json",
          language: "JSON",
          fileCategory: "config",
          size: 1280,
          lastModified: "2025-03-28T15:20:00Z",
          author: "John Doe",
          linesOfCode: 65,
          complexity: 0,
          coverage: 0,
          changes: 28,
          insights: ["Dependencies are up to date", "Consider adding script for type checking"]
        },
        {
          id: "11",
          name: "Dockerfile",
          path: "/Dockerfile",
          type: "file",
          extension: "",
          language: "Docker",
          fileCategory: "infra",
          size: 1024,
          lastModified: "2025-03-27T11:10:00Z",
          author: "Jane Smith",
          linesOfCode: 42,
          complexity: 0,
          coverage: 0,
          changes: 7,
          insights: ["Using multi-stage build", "Consider using more specific base image tag"]
        },
        {
          id: "12",
          name: "docker-compose.yml",
          path: "/docker-compose.yml",
          type: "file",
          extension: "yml",
          language: "YAML",
          fileCategory: "infra",
          size: 2048,
          lastModified: "2025-03-26T09:45:00Z",
          author: "Mike Johnson",
          linesOfCode: 85,
          complexity: 0,
          coverage: 0,
          changes: 12,
          insights: ["Well-structured service definitions", "Consider adding health checks"]
        },
        {
          id: "13",
          name: "logo.png",
          path: "/public/images/logo.png",
          type: "file",
          extension: "png",
          language: "",
          fileCategory: "image",
          size: 51200,
          lastModified: "2025-03-25T14:20:00Z",
          author: "John Doe",
          linesOfCode: 0,
          complexity: 0,
          coverage: 0,
          changes: 2,
          insights: ["Image could be optimized for web", "Consider adding WebP version"]
        },
        {
          id: "14",
          name: "README.md",
          path: "/README.md",
          type: "file",
          extension: "md",
          language: "Markdown",
          fileCategory: "document",
          size: 4096,
          lastModified: "2025-03-24T10:30:00Z",
          author: "Jane Smith",
          linesOfCode: 120,
          complexity: 0,
          coverage: 0,
          changes: 15,
          insights: ["Good documentation structure", "Consider adding troubleshooting section"]
        },
        {
          id: "15",
          name: "data.json",
          path: "/src/data/data.json",
          type: "file",
          extension: "json",
          language: "JSON",
          fileCategory: "data",
          size: 102400,
          lastModified: "2025-03-23T09:15:00Z",
          author: "Mike Johnson",
          linesOfCode: 3500,
          complexity: 0,
          coverage: 0,
          changes: 30,
          insights: ["Large data file", "Consider splitting into smaller files", "High change frequency"]
        }
      ];

      const filteredData = directoryPath === "/"
        ? sampleFileData
        : sampleFileData.filter(file => file.path.startsWith(directoryPath));

      setData(filteredData);
      setIsLoading(false);
    }, 500);
  }, [directoryPath]);

  const getFileIcon = (file: FileData) => {
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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getCoverageBadge = (coverage: number) => {
    if (coverage === 0) return null;
    
    if (coverage >= 90) {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{coverage}%</Badge>;
    }
    if (coverage >= 75) {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{coverage}%</Badge>;
    }
    if (coverage >= 50) {
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{coverage}%</Badge>;
    }
    return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{coverage}%</Badge>;
  };

  const getComplexityBadge = (complexity: number) => {
    if (complexity === 0) return null;
    
    if (complexity <= 3) {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{complexity}</Badge>;
    }
    if (complexity <= 6) {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{complexity}</Badge>;
    }
    if (complexity <= 9) {
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{complexity}</Badge>;
    }
    return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{complexity}</Badge>;
  };

  const getChangesHeatColor = (changes: number) => {
    if (changes <= 5) return "bg-green-50 text-green-700 border-green-200";
    if (changes <= 15) return "bg-blue-50 text-blue-700 border-blue-200";
    if (changes <= 30) return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-red-50 text-red-700 border-red-200";
  };

  const columns: ColumnDef<FileData>[] = [
    {
      accessorKey: "name",
      header: "File Name",
      cell: ({ row }) => (
        <div 
          className="flex items-center gap-2 cursor-pointer hover:underline"
          onClick={() => onFileSelect(row.original.path)}
        >
          {getFileIcon(row.original)}
          <span>{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "language",
      header: ({ column }) => (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Language
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div>{row.original.language || "-"}</div>
      ),
    },
    {
      accessorKey: "fileCategory",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="capitalize">
          {row.original.fileCategory}
        </Badge>
      ),
    },
    {
      accessorKey: "size",
      header: ({ column }) => (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Size
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => <div>{formatFileSize(row.original.size)}</div>,
    },
    {
      accessorKey: "lastModified",
      header: ({ column }) => (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Modified
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => <div>{formatDate(row.original.lastModified)}</div>,
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => <div>{row.original.author}</div>,
    },
    {
      accessorKey: "linesOfCode",
      header: ({ column }) => (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            LOC
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => <div>{row.original.linesOfCode}</div>,
    },
    {
      accessorKey: "complexity",
      header: ({ column }) => (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Complexity
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => <div>{getComplexityBadge(row.original.complexity)}</div>,
    },
    {
      accessorKey: "coverage",
      header: ({ column }) => (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Coverage
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => <div>{getCoverageBadge(row.original.coverage)}</div>,
    },
    {
      accessorKey: "changes",
      header: ({ column }) => (
        <div className="flex items-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Changes
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <Badge variant="outline" className={getChangesHeatColor(row.original.changes)}>
          {row.original.changes}
        </Badge>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const filteredData = data.filter(file => {
    let passesFilter = true;
    
    if (fileTypeFilter !== "all") {
      passesFilter = passesFilter && file.extension === fileTypeFilter;
    }
    
    if (languageFilter !== "all") {
      passesFilter = passesFilter && file.language === languageFilter;
    }
    
    if (fileCategoryFilter !== "all") {
      passesFilter = passesFilter && file.fileCategory === fileCategoryFilter;
    }
    
    if (authorFilter !== "all") {
      passesFilter = passesFilter && file.author === authorFilter;
    }
    
    if (dateFilter !== "all") {
      const fileDate = new Date(file.lastModified);
      const now = new Date();
      
      switch (dateFilter) {
        case "today":
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          passesFilter = passesFilter && fileDate >= today;
          break;
        case "week":
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          passesFilter = passesFilter && fileDate >= weekAgo;
          break;
        case "month":
          const monthAgo = new Date();
          monthAgo.setMonth(monthAgo.getMonth() - 1);
          passesFilter = passesFilter && fileDate >= monthAgo;
          break;
      }
    }
    
    return passesFilter;
  });

  const fileExtensions = Array.from(new Set(data.map(file => file.extension))).filter(Boolean);
  const languages = Array.from(new Set(data.map(file => file.language))).filter(Boolean);
  const fileCategories = Array.from(new Set(data.map(file => file.fileCategory)));
  const authors = Array.from(new Set(data.map(file => file.author)));

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Files in {directoryPath}</CardTitle>
            <CardDescription>
              {filteredData.length} file{filteredData.length !== 1 ? 's' : ''} found
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                className="pl-8"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <FileType className="h-4 w-4 text-muted-foreground" />
              <Select
                value={fileTypeFilter}
                onValueChange={setFileTypeFilter}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Extension" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Extensions</SelectItem>
                  {fileExtensions.map(ext => (
                    <SelectItem key={ext} value={ext}>{ext.toUpperCase()}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-muted-foreground" />
              <Select
                value={languageFilter}
                onValueChange={setLanguageFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {languages.map(lang => (
                    <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select
                value={fileCategoryFilter}
                onValueChange={setFileCategoryFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {fileCategories.map(category => (
                    <SelectItem key={category} value={category} className="capitalize">{category}</SelectItem>
                  ))}
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
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Select
                value={dateFilter}
                onValueChange={setDateFilter}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      <RefreshCw className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No files found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
