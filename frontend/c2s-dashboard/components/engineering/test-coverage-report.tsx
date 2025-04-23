"use client";

import { useState } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
  FileCode, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Filter,
  Download
} from "lucide-react";

// Example data parsed from a coverage.xml file
const coverageData = {
  summary: {
    lines: {
      total: 2450,
      covered: 1715,
      percentage: 70.0
    },
    branches: {
      total: 850,
      covered: 510,
      percentage: 60.0
    },
    functions: {
      total: 320,
      covered: 240,
      percentage: 75.0
    }
  },
  packages: [
    {
      name: "src/controllers",
      lines: {
        total: 850,
        covered: 595,
        percentage: 70.0
      },
      branches: {
        total: 320,
        covered: 192,
        percentage: 60.0
      },
      functions: {
        total: 120,
        covered: 96,
        percentage: 80.0
      }
    },
    {
      name: "src/services",
      lines: {
        total: 750,
        covered: 600,
        percentage: 80.0
      },
      branches: {
        total: 280,
        covered: 196,
        percentage: 70.0
      },
      functions: {
        total: 100,
        covered: 85,
        percentage: 85.0
      }
    },
    {
      name: "src/models",
      lines: {
        total: 350,
        covered: 315,
        percentage: 90.0
      },
      branches: {
        total: 120,
        covered: 96,
        percentage: 80.0
      },
      functions: {
        total: 50,
        covered: 45,
        percentage: 90.0
      }
    },
    {
      name: "src/utils",
      lines: {
        total: 500,
        covered: 205,
        percentage: 41.0
      },
      branches: {
        total: 130,
        covered: 26,
        percentage: 20.0
      },
      functions: {
        total: 50,
        covered: 14,
        percentage: 28.0
      }
    }
  ],
  files: [
    {
      name: "src/controllers/PaymentController.ts",
      lines: {
        total: 250,
        covered: 175,
        percentage: 70.0
      },
      branches: {
        total: 80,
        covered: 48,
        percentage: 60.0
      },
      functions: {
        total: 30,
        covered: 24,
        percentage: 80.0
      },
      uncoveredLines: [15, 16, 25, 26, 35, 36, 45, 46, 55, 56]
    },
    {
      name: "src/controllers/ProductController.ts",
      lines: {
        total: 200,
        covered: 140,
        percentage: 70.0
      },
      branches: {
        total: 70,
        covered: 42,
        percentage: 60.0
      },
      functions: {
        total: 25,
        covered: 20,
        percentage: 80.0
      },
      uncoveredLines: [18, 19, 28, 29, 38, 39]
    },
    {
      name: "src/services/AuthService.ts",
      lines: {
        total: 300,
        covered: 240,
        percentage: 80.0
      },
      branches: {
        total: 100,
        covered: 70,
        percentage: 70.0
      },
      functions: {
        total: 40,
        covered: 34,
        percentage: 85.0
      },
      uncoveredLines: [22, 23, 32, 33, 42, 43]
    },
    {
      name: "src/utils/Formatter.ts",
      lines: {
        total: 150,
        covered: 60,
        percentage: 40.0
      },
      branches: {
        total: 40,
        covered: 8,
        percentage: 20.0
      },
      functions: {
        total: 15,
        covered: 4,
        percentage: 26.7
      },
      uncoveredLines: [10, 11, 12, 13, 20, 21, 22, 30, 31, 32, 40, 41, 42, 50, 51, 52]
    }
  ]
};

// Helper function to get color based on coverage percentage
const getCoverageColor = (percentage: number) => {
  if (percentage >= 80) return "#4ade80"; // Green for high coverage
  if (percentage >= 60) return "#facc15"; // Yellow for medium coverage
  if (percentage >= 40) return "#fb923c"; // Orange for low coverage
  return "#ef4444"; // Red for very low coverage
};

// Helper function to get status based on coverage percentage
const getCoverageStatus = (percentage: number) => {
  if (percentage >= 80) return "good";
  if (percentage >= 60) return "acceptable";
  if (percentage >= 40) return "warning";
  return "critical";
};

const statusColors = {
  good: "bg-green-500/10 text-green-500 border-green-500/20",
  acceptable: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  warning: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  critical: "bg-red-500/10 text-red-500 border-red-500/20"
};

const statusIcons = {
  good: <CheckCircle className="h-4 w-4" />,
  acceptable: <FileCode className="h-4 w-4" />,
  warning: <AlertTriangle className="h-4 w-4" />,
  critical: <XCircle className="h-4 w-4" />
};

export function TestCoverageReport() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Sort data based on current sort settings
  const sortedPackages = [...coverageData.packages].sort((a, b) => {
    if (sortColumn === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      const [category, metric] = sortColumn.split(".");
      const aValue = a[category as keyof typeof a][metric as keyof typeof a[keyof typeof a]];
      const bValue = b[category as keyof typeof b][metric as keyof typeof b[keyof typeof b]];
      
      return sortDirection === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
  });

  const sortedFiles = [...coverageData.files].sort((a, b) => {
    if (sortColumn === "name") {
      return sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else {
      const [category, metric] = sortColumn.split(".");
      const aValue = a[category as keyof typeof a][metric as keyof typeof a[keyof typeof a]];
      const bValue = b[category as keyof typeof b][metric as keyof typeof b[keyof typeof b]];
      
      return sortDirection === "asc"
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
  });

  // Data for the summary charts
  const summaryData = [
    {
      name: "Lines",
      covered: coverageData.summary.lines.covered,
      uncovered: coverageData.summary.lines.total - coverageData.summary.lines.covered,
      percentage: coverageData.summary.lines.percentage
    },
    {
      name: "Branches",
      covered: coverageData.summary.branches.covered,
      uncovered: coverageData.summary.branches.total - coverageData.summary.branches.covered,
      percentage: coverageData.summary.branches.percentage
    },
    {
      name: "Functions",
      covered: coverageData.summary.functions.covered,
      uncovered: coverageData.summary.functions.total - coverageData.summary.functions.covered,
      percentage: coverageData.summary.functions.percentage
    }
  ];

  // Data for the pie chart
  const pieData = [
    { name: "Covered", value: coverageData.summary.lines.covered, color: "#4ade80" },
    { name: "Uncovered", value: coverageData.summary.lines.total - coverageData.summary.lines.covered, color: "#ef4444" }
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          Test Coverage Report
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="uncovered">Uncovered Lines</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                {summaryData.map((item) => (
                  <div key={item.name} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">{item.name} Coverage</h3>
                      <Badge 
                        variant="outline"
                        className={statusColors[getCoverageStatus(item.percentage)]}
                      >
                        {item.percentage.toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            width: `${item.percentage}%`,
                            backgroundColor: getCoverageColor(item.percentage)
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {item.covered} / {item.covered + item.uncovered} covered
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 text-sm font-medium">Coverage Distribution</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={summaryData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          formatter={(value, name) => {
                            return [`${value} (${name === "covered" ? "Covered" : "Uncovered"})`, ""];
                          }}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="covered" name="Covered" stackId="a" fill="#4ade80" />
                        <Bar dataKey="uncovered" name="Uncovered" stackId="a" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 text-sm font-medium">Line Coverage</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value} lines`, ""]}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "0.5rem",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="packages">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      Package
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer text-right"
                      onClick={() => handleSort("lines.percentage")}
                    >
                      Line Coverage
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer text-right"
                      onClick={() => handleSort("branches.percentage")}
                    >
                      Branch Coverage
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer text-right"
                      onClick={() => handleSort("functions.percentage")}
                    >
                      Function Coverage
                    </TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedPackages.map((pkg) => {
                    const status = getCoverageStatus(pkg.lines.percentage);
                    
                    return (
                      <TableRow key={pkg.name}>
                        <TableCell className="font-medium">{pkg.name}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <div className="mr-2 h-2 w-16 rounded-full bg-muted">
                              <div 
                                className="h-2 rounded-full" 
                                style={{ 
                                  width: `${pkg.lines.percentage}%`,
                                  backgroundColor: getCoverageColor(pkg.lines.percentage)
                                }}
                              />
                            </div>
                            {pkg.lines.percentage.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <div className="mr-2 h-2 w-16 rounded-full bg-muted">
                              <div 
                                className="h-2 rounded-full" 
                                style={{ 
                                  width: `${pkg.branches.percentage}%`,
                                  backgroundColor: getCoverageColor(pkg.branches.percentage)
                                }}
                              />
                            </div>
                            {pkg.branches.percentage.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <div className="mr-2 h-2 w-16 rounded-full bg-muted">
                              <div 
                                className="h-2 rounded-full" 
                                style={{ 
                                  width: `${pkg.functions.percentage}%`,
                                  backgroundColor: getCoverageColor(pkg.functions.percentage)
                                }}
                              />
                            </div>
                            {pkg.functions.percentage.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={`flex items-center gap-1 ${statusColors[status]}`}
                          >
                            {statusIcons[status as keyof typeof statusIcons]}
                            <span className="capitalize">{status}</span>
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="files">
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      File
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer text-right"
                      onClick={() => handleSort("lines.percentage")}
                    >
                      Line Coverage
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer text-right"
                      onClick={() => handleSort("branches.percentage")}
                    >
                      Branch Coverage
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer text-right"
                      onClick={() => handleSort("functions.percentage")}
                    >
                      Function Coverage
                    </TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedFiles.map((file) => {
                    const status = getCoverageStatus(file.lines.percentage);
                    
                    return (
                      <TableRow key={file.name}>
                        <TableCell className="font-medium">{file.name}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <div className="mr-2 h-2 w-16 rounded-full bg-muted">
                              <div 
                                className="h-2 rounded-full" 
                                style={{ 
                                  width: `${file.lines.percentage}%`,
                                  backgroundColor: getCoverageColor(file.lines.percentage)
                                }}
                              />
                            </div>
                            {file.lines.percentage.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <div className="mr-2 h-2 w-16 rounded-full bg-muted">
                              <div 
                                className="h-2 rounded-full" 
                                style={{ 
                                  width: `${file.branches.percentage}%`,
                                  backgroundColor: getCoverageColor(file.branches.percentage)
                                }}
                              />
                            </div>
                            {file.branches.percentage.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <div className="mr-2 h-2 w-16 rounded-full bg-muted">
                              <div 
                                className="h-2 rounded-full" 
                                style={{ 
                                  width: `${file.functions.percentage}%`,
                                  backgroundColor: getCoverageColor(file.functions.percentage)
                                }}
                              />
                            </div>
                            {file.functions.percentage.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={`flex items-center gap-1 ${statusColors[status]}`}
                          >
                            {statusIcons[status as keyof typeof statusIcons]}
                            <span className="capitalize">{status}</span>
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="uncovered">
            <div className="space-y-4">
              {sortedFiles.map((file) => (
                <div key={file.name} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{file.name}</h3>
                    <Badge 
                      variant="outline"
                      className={statusColors[getCoverageStatus(file.lines.percentage)]}
                    >
                      {file.lines.percentage.toFixed(1)}% covered
                    </Badge>
                  </div>
                  {file.uncoveredLines.length > 0 ? (
                    <div className="mt-2">
                      <h4 className="text-sm font-medium">Uncovered Lines:</h4>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {file.uncoveredLines.map((line) => (
                          <Badge key={line} variant="outline" className="bg-red-500/10 text-red-500">
                            {line}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-muted-foreground">
                      All lines covered
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
