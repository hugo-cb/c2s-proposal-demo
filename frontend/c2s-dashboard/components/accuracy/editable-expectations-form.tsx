"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  RefreshCw,
  Save,
  Trash2,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  Plus,
  FileCode,
  History,
  Download
} from "lucide-react";

interface Expectation {
  id: string;
  name: string;
  description: string;
  category: string;
  perspective: "engineering" | "architecture" | "infrastructure" | "business";
  rule: string;
  status: "active" | "draft" | "disabled";
  lastModified: string;
  lastRun?: string;
  results?: {
    passed: boolean;
    accuracy: number;
    details?: string;
  };
}

interface EditableExpectationsFormProps {
  className?: string;
  perspective?: "engineering" | "architecture" | "infrastructure" | "business";
  isFullPage?: boolean;
}

export function EditableExpectationsForm({ className, perspective, isFullPage = false }: EditableExpectationsFormProps) {
  // Sample data for expectations
  const [expectations, setExpectations] = useState<Expectation[]>([
    {
      id: "e1",
      name: "Code Quality Standards",
      description: "Verify that code quality meets the defined standards",
      category: "Code Quality",
      perspective: "engineering",
      rule: `package quality.rules

import future.keywords.in

# Check if code quality meets standards
default quality_valid = false

quality_valid {
  input.complexity_score < 25
  input.duplication_percentage < 5
  input.test_coverage > 80
}`,
      status: "active",
      lastModified: "2025-04-10T14:30:00Z",
      lastRun: "2025-04-10T15:45:00Z",
      results: {
        passed: true,
        accuracy: 92,
        details: "All quality metrics meet the defined standards"
      }
    },
    {
      id: "e2",
      name: "Architecture Pattern Compliance",
      description: "Ensure that code follows the defined architecture patterns",
      category: "Pattern Adherence",
      perspective: "architecture",
      rule: `package architecture.rules

import future.keywords.in

# Check if architecture patterns are followed
default pattern_valid = false

pattern_valid {
  input.layer_violations == 0
  input.dependency_direction_violations == 0
  input.pattern_adherence_score > 85
}`,
      status: "active",
      lastModified: "2025-04-09T11:20:00Z",
      lastRun: "2025-04-10T15:45:00Z",
      results: {
        passed: false,
        accuracy: 78,
        details: "Layer violations detected in 3 modules"
      }
    },
    {
      id: "e3",
      name: "Infrastructure Security Compliance",
      description: "Verify that infrastructure configurations meet security standards",
      category: "Security",
      perspective: "infrastructure",
      rule: `package infrastructure.rules

import future.keywords.in

# Check if security standards are met
default security_valid = false

security_valid {
  input.exposed_secrets == 0
  input.vulnerable_dependencies == 0
  input.security_scan_score > 90
}`,
      status: "active",
      lastModified: "2025-04-08T09:45:00Z",
      lastRun: "2025-04-10T15:45:00Z",
      results: {
        passed: true,
        accuracy: 95,
        details: "All security checks passed"
      }
    },
    {
      id: "e4",
      name: "Business Capability Coverage",
      description: "Ensure that all business capabilities are implemented",
      category: "Capability Coverage",
      perspective: "business",
      rule: `package business.rules

import future.keywords.in

# Check if business capabilities are covered
default capability_coverage_valid = false

capability_coverage_valid {
  input.capability_coverage_percentage > 85
  input.critical_capabilities_coverage_percentage == 100
}`,
      status: "active",
      lastModified: "2025-04-07T16:30:00Z",
      lastRun: "2025-04-10T15:45:00Z",
      results: {
        passed: false,
        accuracy: 82,
        details: "Critical capability 'Payment Processing' not fully implemented"
      }
    },
    {
      id: "e5",
      name: "Test Coverage Requirements",
      description: "Verify that code has adequate test coverage",
      category: "Test Coverage",
      perspective: "engineering",
      rule: `package quality.rules

import future.keywords.in

# Check if test coverage is adequate
default test_coverage_valid = false

test_coverage_valid {
  input.overall_coverage_percentage > 80
  input.critical_paths_coverage_percentage > 90
  input.mutation_score > 75
}`,
      status: "draft",
      lastModified: "2025-04-06T10:15:00Z"
    },
    {
      id: "e6",
      name: "Dependency Management",
      description: "Ensure that dependencies are properly managed",
      category: "Dependency Management",
      perspective: "architecture",
      rule: `package architecture.rules

import future.keywords.in

# Check if dependencies are properly managed
default dependencies_valid = false

dependencies_valid {
  input.circular_dependencies == 0
  input.outdated_dependencies < 5
  input.dependency_health_score > 85
}`,
      status: "disabled",
      lastModified: "2025-04-05T13:40:00Z"
    }
  ]);

  const [activeTab, setActiveTab] = useState(perspective || "engineering");
  const [editingExpectation, setEditingExpectation] = useState<Expectation | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState<any[]>([]);

  // Get all unique categories for the active perspective
  const categories = Array.from(
    new Set(
      expectations
        .filter(exp => exp.perspective === activeTab)
        .map(exp => exp.category)
    )
  );

  // Refresh expectations
  const refreshExpectations = () => {
    console.log("Refreshing expectations...");
    // In a real application, this would fetch updated expectations from an API
  };

  // Start editing an expectation
  const startEditing = (expectation: Expectation) => {
    setEditingExpectation({ ...expectation });
    setIsCreating(false);
    setShowHistory(false);
  };

  // Start creating a new expectation
  const startCreating = () => {
    setEditingExpectation({
      id: `e${expectations.length + 1}`,
      name: "",
      description: "",
      category: "",
      perspective: activeTab as "engineering" | "architecture" | "infrastructure" | "business",
      rule: `package ${activeTab}.rules

import future.keywords.in

# Define your expectation rule here
default rule_name = false

rule_name {
  # Your rule logic here
}`,
      status: "draft",
      lastModified: new Date().toISOString()
    });
    setIsCreating(true);
    setShowHistory(false);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingExpectation(null);
    setIsCreating(false);
  };

  // Save expectation
  const saveExpectation = () => {
    if (!editingExpectation) return;
    
    const updatedExpectation = {
      ...editingExpectation,
      lastModified: new Date().toISOString()
    };
    
    if (isCreating) {
      setExpectations([...expectations, updatedExpectation]);
    } else {
      setExpectations(expectations.map(exp => 
        exp.id === updatedExpectation.id ? updatedExpectation : exp
      ));
    }
    
    setEditingExpectation(null);
    setIsCreating(false);
  };

  // Delete expectation
  const deleteExpectation = (id: string) => {
    setExpectations(expectations.filter(exp => exp.id !== id));
    if (editingExpectation?.id === id) {
      setEditingExpectation(null);
      setIsCreating(false);
    }
  };

  // Run expectation
  const runExpectation = (id: string) => {
    console.log("Running expectation:", id);
    // In a real application, this would send the expectation to be evaluated
    
    // Simulate a result
    setTimeout(() => {
      setExpectations(expectations.map(exp => {
        if (exp.id === id) {
          return {
            ...exp,
            lastRun: new Date().toISOString(),
            results: {
              passed: Math.random() > 0.3, // 70% chance of passing
              accuracy: Math.floor(Math.random() * 30) + 70, // Random accuracy between 70-99
              details: Math.random() > 0.3 ? undefined : "Some validation details here"
            }
          };
        }
        return exp;
      }));
    }, 1000);
  };

  // Toggle expectation status
  const toggleStatus = (id: string) => {
    setExpectations(expectations.map(exp => {
      if (exp.id === id) {
        let newStatus: "active" | "draft" | "disabled";
        
        if (exp.status === "active") {
          newStatus = "disabled";
        } else if (exp.status === "disabled") {
          newStatus = "draft";
        } else {
          newStatus = "active";
        }
        
        return {
          ...exp,
          status: newStatus,
          lastModified: new Date().toISOString()
        };
      }
      return exp;
    }));
  };

  // View history
  const viewHistory = (id: string) => {
    // In a real application, this would fetch the history from an API
    const mockHistory = [
      {
        id: "h1",
        expectationId: id,
        timestamp: "2025-04-10T14:30:00Z",
        user: "John Doe",
        action: "modified",
        changes: {
          rule: "Updated rule logic",
          description: "Updated description"
        }
      },
      {
        id: "h2",
        expectationId: id,
        timestamp: "2025-04-05T10:15:00Z",
        user: "Jane Smith",
        action: "created",
        changes: {
          rule: "Initial rule creation",
          description: "Initial description"
        }
      }
    ];
    
    setHistoryData(mockHistory);
    setShowHistory(true);
    setEditingExpectation(null);
    setIsCreating(false);
  };

  // Export expectations
  const exportExpectations = () => {
    console.log("Exporting expectations...");
    // In a real application, this would generate and download a file
    
    // Simulate a download
    const filteredExpectations = expectations.filter(exp => exp.perspective === activeTab);
    const jsonData = JSON.stringify(filteredExpectations, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeTab}-expectations.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case "draft":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Draft</Badge>;
      case "disabled":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Disabled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get result badge
  const getResultBadge = (expectation: Expectation) => {
    if (!expectation.results) {
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Not Run</Badge>;
    }
    
    return expectation.results.passed ? (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Passed</Badge>
    ) : (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>
    );
  };

  // Get accuracy badge
  const getAccuracyBadge = (expectation: Expectation) => {
    if (!expectation.results) {
      return null;
    }
    
    const accuracy = expectation.results.accuracy;
    
    if (accuracy >= 90) {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{accuracy}% Accurate</Badge>;
    } else if (accuracy >= 80) {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{accuracy}% Accurate</Badge>;
    } else if (accuracy >= 70) {
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{accuracy}% Accurate</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{accuracy}% Accurate</Badge>;
    }
  };

  // Filter expectations based on active tab, category filter, status filter, and search query
  const filteredExpectations = expectations.filter(exp => {
    // Filter by perspective
    if (exp.perspective !== activeTab) {
      return false;
    }
    
    // Filter by category
    if (categoryFilter !== "all" && exp.category !== categoryFilter) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== "all" && exp.status !== statusFilter) {
      return false;
    }
    
    // Filter by search query
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      exp.name.toLowerCase().includes(searchLower) ||
      exp.description.toLowerCase().includes(searchLower) ||
      exp.rule.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Accuracy Expectations Editor
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportExpectations}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm" onClick={refreshExpectations}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="architecture">Architecture</TabsTrigger>
              <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative w-full max-w-sm">
                <Input
                  type="search"
                  placeholder="Search expectations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button onClick={startCreating}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Expectation
                </Button>
              </div>
            </div>
            
            {showHistory ? (
              <div className="space-y-4 border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Expectation History</h3>
                  <Button variant="outline" size="sm" onClick={() => setShowHistory(false)}>
                    Close
                  </Button>
                </div>
                
                {historyData.length === 0 ? (
                  <div className="text-center p-4">
                    <p className="text-muted-foreground">No history available for this expectation.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {historyData.map((item) => (
                      <div key={item.id} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <History className="h-4 w-4" />
                            <span className="font-medium">{item.action.charAt(0).toUpperCase() + item.action.slice(1)}</span>
                            <Badge variant="outline">{formatDate(item.timestamp)}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            by {item.user}
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          {Object.entries(item.changes).map(([key, value]) => (
                            <div key={key} className="text-sm">
                              <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {value}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : editingExpectation ? (
              <div className="space-y-4 border rounded-lg p-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={editingExpectation.name}
                    onChange={(e) => setEditingExpectation({
                      ...editingExpectation,
                      name: e.target.value
                    })}
                    placeholder="Expectation name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={editingExpectation.description}
                    onChange={(e) => setEditingExpectation({
                      ...editingExpectation,
                      description: e.target.value
                    })}
                    placeholder="Describe the expectation"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Input
                    value={editingExpectation.category}
                    onChange={(e) => setEditingExpectation({
                      ...editingExpectation,
                      category: e.target.value
                    })}
                    placeholder="Category"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Rule Definition</label>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      <FileCode className="h-3 w-3 mr-1" />
                      Rego
                    </Badge>
                  </div>
                  <Textarea
                    value={editingExpectation.rule}
                    onChange={(e) => setEditingExpectation({
                      ...editingExpectation,
                      rule: e.target.value
                    })}
                    placeholder="Define the expectation rule using Rego"
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>
                
                <div className="flex items-center justify-end gap-2">
                  <Button variant="outline" onClick={cancelEditing}>
                    Cancel
                  </Button>
                  <Button onClick={saveExpectation}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredExpectations.length === 0 ? (
                  <div className="text-center p-4 border rounded-lg bg-muted/40">
                    <p className="text-muted-foreground">No expectations found matching your filters.</p>
                    <Button variant="outline" className="mt-2" onClick={startCreating}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Expectation
                    </Button>
                  </div>
                ) : (
                  filteredExpectations.map((expectation) => (
                    <div key={expectation.id} className="rounded-lg border overflow-hidden">
                      <div className="flex items-center justify-between p-3 bg-muted/40">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{expectation.name}</h3>
                          {getStatusBadge(expectation.status)}
                          {getResultBadge(expectation)}
                          {getAccuracyBadge(expectation)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => toggleStatus(expectation.id)}>
                            {expectation.status === "active" ? (
                              <XCircle className="h-4 w-4" />
                            ) : expectation.status === "disabled" ? (
                              <AlertTriangle className="h-4 w-4" />
                            ) : (
                              <CheckCircle className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => runExpectation(expectation.id)}>
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => viewHistory(expectation.id)}>
                            <History className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => startEditing(expectation)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => deleteExpectation(expectation.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="p-3 space-y-3">
                        <p className="text-sm text-muted-foreground">{expectation.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">Category:</span>
                            <span>{expectation.category}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">Last modified:</span>
                            <span>{formatDate(expectation.lastModified)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">Last run:</span>
                            <span>{formatDate(expectation.lastRun)}</span>
                          </div>
                        </div>
                        
                        {expectation.results && !expectation.results.passed && expectation.results.details && (
                          <div className="rounded-md bg-red-50 p-2 text-sm text-red-700">
                            {expectation.results.details}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
