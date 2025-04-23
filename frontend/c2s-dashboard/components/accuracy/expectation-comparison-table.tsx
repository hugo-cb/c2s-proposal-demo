"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  RefreshCw,
  Table,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Download,
  Info
} from "lucide-react";

interface ExpectationResult {
  id: string;
  expectationId: string;
  expectationName: string;
  category: string;
  perspective: "engineering" | "architecture" | "infrastructure" | "business";
  expected: string;
  detected: string;
  match: "exact" | "partial" | "none";
  accuracy: number;
  lastRun: string;
  details?: string;
}

interface ExpectationComparisonTableProps {
  className?: string;
  perspective?: "engineering" | "architecture" | "infrastructure" | "business";
  isFullPage?: boolean;
}

export function ExpectationComparisonTable({ className, perspective, isFullPage = false }: ExpectationComparisonTableProps) {
  // Sample data for expectation results
  const [expectationResults, setExpectationResults] = useState<ExpectationResult[]>([
    {
      id: "r1",
      expectationId: "e1",
      expectationName: "Code Quality Standards",
      category: "Code Quality",
      perspective: "engineering",
      expected: "Complexity score < 25, Duplication < 5%, Test coverage > 80%",
      detected: "Complexity score: 22, Duplication: 3.5%, Test coverage: 85%",
      match: "exact",
      accuracy: 95,
      lastRun: "2025-04-10T15:45:00Z",
      details: "All quality metrics meet the defined standards"
    },
    {
      id: "r2",
      expectationId: "e2",
      expectationName: "Architecture Pattern Compliance",
      category: "Pattern Adherence",
      perspective: "architecture",
      expected: "No layer violations, No dependency direction violations, Pattern adherence score > 85%",
      detected: "Layer violations: 3, Dependency direction violations: 0, Pattern adherence score: 82%",
      match: "partial",
      accuracy: 78,
      lastRun: "2025-04-10T15:45:00Z",
      details: "Layer violations detected in 3 modules"
    },
    {
      id: "r3",
      expectationId: "e3",
      expectationName: "Infrastructure Security Compliance",
      category: "Security",
      perspective: "infrastructure",
      expected: "No exposed secrets, No vulnerable dependencies, Security scan score > 90%",
      detected: "Exposed secrets: 0, Vulnerable dependencies: 0, Security scan score: 95%",
      match: "exact",
      accuracy: 95,
      lastRun: "2025-04-10T15:45:00Z",
      details: "All security checks passed"
    },
    {
      id: "r4",
      expectationId: "e4",
      expectationName: "Business Capability Coverage",
      category: "Capability Coverage",
      perspective: "business",
      expected: "Capability coverage > 85%, Critical capabilities coverage = 100%",
      detected: "Capability coverage: 88%, Critical capabilities coverage: 95%",
      match: "partial",
      accuracy: 82,
      lastRun: "2025-04-10T15:45:00Z",
      details: "Critical capability 'Payment Processing' not fully implemented"
    },
    {
      id: "r5",
      expectationId: "e5",
      expectationName: "Test Coverage Requirements",
      category: "Test Coverage",
      perspective: "engineering",
      expected: "Overall coverage > 80%, Critical paths coverage > 90%, Mutation score > 75%",
      detected: "Overall coverage: 78%, Critical paths coverage: 88%, Mutation score: 72%",
      match: "none",
      accuracy: 65,
      lastRun: "2025-04-10T15:45:00Z",
      details: "Test coverage below required thresholds in multiple areas"
    },
    {
      id: "r6",
      expectationId: "e6",
      expectationName: "Dependency Management",
      category: "Dependency Management",
      perspective: "architecture",
      expected: "No circular dependencies, Less than 5 outdated dependencies, Dependency health score > 85%",
      detected: "Circular dependencies: 2, Outdated dependencies: 8, Dependency health score: 78%",
      match: "none",
      accuracy: 60,
      lastRun: "2025-04-10T15:45:00Z",
      details: "Multiple dependency issues detected"
    },
    {
      id: "r7",
      expectationId: "e7",
      expectationName: "Deployment Readiness",
      category: "Deployment",
      perspective: "infrastructure",
      expected: "All required configuration files present, No critical deployment blockers, CI/CD pipeline passes",
      detected: "All required configuration files present, No critical deployment blockers, CI/CD pipeline passes",
      match: "exact",
      accuracy: 100,
      lastRun: "2025-04-10T15:45:00Z",
      details: "Deployment configuration is fully compliant"
    },
    {
      id: "r8",
      expectationId: "e8",
      expectationName: "Requirement Traceability",
      category: "Traceability",
      perspective: "business",
      expected: "All requirements have code references, Traceability coverage > 90%",
      detected: "92% of requirements have code references, Traceability coverage: 88%",
      match: "partial",
      accuracy: 85,
      lastRun: "2025-04-10T15:45:00Z",
      details: "Some requirements lack complete code references"
    }
  ]);

  const [activePerspective, setActivePerspective] = useState(perspective || "all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [matchFilter, setMatchFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("accuracy");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Get all unique categories
  const categories = Array.from(
    new Set(
      expectationResults
        .filter(result => activePerspective === "all" || result.perspective === activePerspective)
        .map(result => result.category)
    )
  );

  // Refresh data
  const refreshData = () => {
    console.log("Refreshing comparison data...");
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

  // Get match badge
  const getMatchBadge = (match: string) => {
    switch (match) {
      case "exact":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Exact Match</Badge>;
      case "partial":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Partial Match</Badge>;
      case "none":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">No Match</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get match icon
  const getMatchIcon = (match: string) => {
    switch (match) {
      case "exact":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "none":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  // Get accuracy color class
  const getAccuracyColorClass = (accuracy: number) => {
    if (accuracy >= 90) return "text-green-600";
    if (accuracy >= 80) return "text-blue-600";
    if (accuracy >= 70) return "text-amber-600";
    return "text-red-600";
  };

  // Export data
  const exportData = () => {
    console.log("Exporting comparison data...");
    // In a real application, this would generate and download a file
    
    // Simulate a download
    const filteredResults = filterResults();
    const jsonData = JSON.stringify(filteredResults, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `expectation-comparison-${activePerspective}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Filter results based on active perspective, category filter, match filter, and search query
  const filterResults = () => {
    return expectationResults.filter(result => {
      // Filter by perspective
      if (activePerspective !== "all" && result.perspective !== activePerspective) {
        return false;
      }
      
      // Filter by category
      if (categoryFilter !== "all" && result.category !== categoryFilter) {
        return false;
      }
      
      // Filter by match
      if (matchFilter !== "all" && result.match !== matchFilter) {
        return false;
      }
      
      // Filter by search query
      if (!searchQuery) return true;
      
      const searchLower = searchQuery.toLowerCase();
      return (
        result.expectationName.toLowerCase().includes(searchLower) ||
        result.expected.toLowerCase().includes(searchLower) ||
        result.detected.toLowerCase().includes(searchLower) ||
        (result.details && result.details.toLowerCase().includes(searchLower))
      );
    });
  };

  // Sort results
  const sortResults = (results: ExpectationResult[]) => {
    return [...results].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "name":
          comparison = a.expectationName.localeCompare(b.expectationName);
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        case "match":
          const matchOrder = { exact: 0, partial: 1, none: 2 };
          comparison = matchOrder[a.match as keyof typeof matchOrder] - matchOrder[b.match as keyof typeof matchOrder];
          break;
        case "accuracy":
          comparison = a.accuracy - b.accuracy;
          break;
        case "lastRun":
          comparison = new Date(a.lastRun).getTime() - new Date(b.lastRun).getTime();
          break;
        default:
          comparison = 0;
      }
      
      return sortDirection === "asc" ? comparison : -comparison;
    });
  };

  // Get filtered and sorted results
  const filteredResults = sortResults(filterResults());

  // Calculate statistics
  const exactMatches = filteredResults.filter(result => result.match === "exact").length;
  const partialMatches = filteredResults.filter(result => result.match === "partial").length;
  const noMatches = filteredResults.filter(result => result.match === "none").length;
  
  const averageAccuracy = filteredResults.length > 0 
    ? Math.round(filteredResults.reduce((sum, result) => sum + result.accuracy, 0) / filteredResults.length) 
    : 0;

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <Table className="h-5 w-5" />
              Expectation vs. Detection Comparison
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm" onClick={refreshData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{exactMatches}</div>
                <div className="text-xs text-muted-foreground">Exact Matches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{partialMatches}</div>
                <div className="text-xs text-muted-foreground">Partial Matches</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{noMatches}</div>
                <div className="text-xs text-muted-foreground">No Matches</div>
              </div>
              <div className="border-l h-8 mx-2"></div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getAccuracyColorClass(averageAccuracy)}`}>
                  {averageAccuracy}%
                </div>
                <div className="text-xs text-muted-foreground">Average Accuracy</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search expectations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={activePerspective} onValueChange={setActivePerspective}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by perspective" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Perspectives</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="architecture">Architecture</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select value={matchFilter} onValueChange={setMatchFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by match" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Matches</SelectItem>
                  <SelectItem value="exact">Exact Matches</SelectItem>
                  <SelectItem value="partial">Partial Matches</SelectItem>
                  <SelectItem value="none">No Matches</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select 
                value={sortBy} 
                onValueChange={(value) => {
                  if (sortBy === value) {
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy(value);
                    setSortDirection("desc");
                  }
                }}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="match">Match</SelectItem>
                  <SelectItem value="accuracy">Accuracy</SelectItem>
                  <SelectItem value="lastRun">Last Run</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
              >
                {sortDirection === "asc" ? "↑" : "↓"}
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Expectation</th>
                  <th className="px-4 py-3 text-left font-medium">Category</th>
                  <th className="px-4 py-3 text-left font-medium">Expected</th>
                  <th className="px-4 py-3 text-left font-medium">Detected</th>
                  <th className="px-4 py-3 text-left font-medium">Match</th>
                  <th className="px-4 py-3 text-left font-medium">Accuracy</th>
                  <th className="px-4 py-3 text-left font-medium">Last Run</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredResults.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-4 text-center text-muted-foreground">
                      No results found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredResults.map((result) => (
                    <tr key={result.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="font-medium">{result.expectationName}</div>
                        <div className="text-xs text-muted-foreground">
                          {result.perspective.charAt(0).toUpperCase() + result.perspective.slice(1)}
                        </div>
                      </td>
                      <td className="px-4 py-3">{result.category}</td>
                      <td className="px-4 py-3">
                        <div className="max-w-[200px] truncate" title={result.expected}>
                          {result.expected}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="max-w-[200px] truncate" title={result.detected}>
                          {result.detected}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {getMatchIcon(result.match)}
                          {getMatchBadge(result.match)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className={`font-medium ${getAccuracyColorClass(result.accuracy)}`}>
                          {result.accuracy}%
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div title={formatDate(result.lastRun)}>
                          {formatDate(result.lastRun)}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {!isFullPage && filteredResults.length > 5 && (
            <Button variant="outline" size="sm" className="w-full">
              View All Comparisons
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
