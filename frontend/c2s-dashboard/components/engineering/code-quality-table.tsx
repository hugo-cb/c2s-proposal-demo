"use client";

import { useState } from "react";
import { 
  ArrowUpDown, 
  FileCode, 
  AlertTriangle, 
  AlertCircle, 
  Search,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Example data for code quality metrics
const codeQualityData = [
  {
    id: "1",
    file: "src/controllers/PaymentController.ts",
    language: "TypeScript",
    complexity: 25,
    codeSmells: 8,
    bugs: 3,
    coverage: 65,
    severity: "high",
  },
  {
    id: "2",
    file: "src/services/AuthService.ts",
    language: "TypeScript",
    complexity: 18,
    codeSmells: 5,
    bugs: 1,
    coverage: 78,
    severity: "medium",
  },
  {
    id: "3",
    file: "src/utils/Formatter.ts",
    language: "TypeScript",
    complexity: 12,
    codeSmells: 2,
    bugs: 0,
    coverage: 92,
    severity: "low",
  },
  {
    id: "4",
    file: "src/models/User.ts",
    language: "TypeScript",
    complexity: 8,
    codeSmells: 1,
    bugs: 0,
    coverage: 95,
    severity: "low",
  },
  {
    id: "5",
    file: "src/controllers/ProductController.ts",
    language: "TypeScript",
    complexity: 22,
    codeSmells: 6,
    bugs: 2,
    coverage: 70,
    severity: "medium",
  },
  {
    id: "6",
    file: "src/services/NotificationService.ts",
    language: "TypeScript",
    complexity: 30,
    codeSmells: 10,
    bugs: 4,
    coverage: 55,
    severity: "high",
  },
  {
    id: "7",
    file: "src/utils/Validator.ts",
    language: "TypeScript",
    complexity: 15,
    codeSmells: 3,
    bugs: 1,
    coverage: 85,
    severity: "low",
  },
];

const severityColors = {
  high: "bg-red-500/10 text-red-500 border-red-500/20",
  medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  low: "bg-green-500/10 text-green-500 border-green-500/20",
};

export function CodeQualityTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [sortColumn, setSortColumn] = useState("complexity");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Filter and sort the data
  const filteredData = codeQualityData
    .filter((item) => {
      // Apply search filter
      if (
        searchQuery &&
        !item.file.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Apply language filter
      if (languageFilter !== "all" && item.language !== languageFilter) {
        return false;
      }

      // Apply severity filter
      if (severityFilter !== "all" && item.severity !== severityFilter) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      const aValue = a[sortColumn as keyof typeof a];
      const bValue = b[sortColumn as keyof typeof b];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "low":
        return <FileCode className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search files..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={languageFilter}
            onValueChange={setLanguageFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="TypeScript">TypeScript</SelectItem>
              <SelectItem value="JavaScript">JavaScript</SelectItem>
              <SelectItem value="Python">Python</SelectItem>
              <SelectItem value="Java">Java</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={severityFilter}
            onValueChange={setSeverityFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">File</TableHead>
              <TableHead>Language</TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("complexity")}
              >
                <div className="flex items-center">
                  Complexity
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("codeSmells")}
              >
                <div className="flex items-center">
                  Code Smells
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("bugs")}
              >
                <div className="flex items-center">
                  Bugs
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer"
                onClick={() => handleSort("coverage")}
              >
                <div className="flex items-center">
                  Coverage
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.file}</TableCell>
                  <TableCell>{item.language}</TableCell>
                  <TableCell>{item.complexity}</TableCell>
                  <TableCell>{item.codeSmells}</TableCell>
                  <TableCell>{item.bugs}</TableCell>
                  <TableCell>{item.coverage}%</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`flex w-24 items-center justify-center gap-1 ${
                        severityColors[item.severity as keyof typeof severityColors]
                      }`}
                    >
                      {getSeverityIcon(item.severity)}
                      <span className="capitalize">{item.severity}</span>
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
