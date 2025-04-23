"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  RefreshCw,
  GitCompare,
  History,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Plus,
  Minus,
  FileCode
} from "lucide-react";

interface ExpectationVersion {
  id: string;
  expectationId: string;
  version: number;
  timestamp: string;
  user: string;
  rule: string;
  name: string;
  description: string;
  category: string;
  status: "active" | "draft" | "disabled";
}

interface ExpectationDiffViewerProps {
  className?: string;
  expectationId?: string;
  isFullPage?: boolean;
}

export function ExpectationDiffViewer({ className, expectationId, isFullPage = false }: ExpectationDiffViewerProps) {
  // Sample data for expectation versions
  const [expectationVersions, setExpectationVersions] = useState<Record<string, ExpectationVersion[]>>({
    "e1": [
      {
        id: "v1",
        expectationId: "e1",
        version: 1,
        timestamp: "2025-04-05T10:15:00Z",
        user: "Jane Smith",
        name: "Code Quality Standards",
        description: "Verify that code quality meets standards",
        category: "Code Quality",
        status: "draft",
        rule: `package quality.rules

import future.keywords.in

# Check if code quality meets standards
default quality_valid = false

quality_valid {
  input.complexity_score < 30
  input.duplication_percentage < 10
  input.test_coverage > 70
}`
      },
      {
        id: "v2",
        expectationId: "e1",
        version: 2,
        timestamp: "2025-04-08T14:30:00Z",
        user: "John Doe",
        name: "Code Quality Standards",
        description: "Verify that code quality meets the defined standards",
        category: "Code Quality",
        status: "active",
        rule: `package quality.rules

import future.keywords.in

# Check if code quality meets standards
default quality_valid = false

quality_valid {
  input.complexity_score < 25
  input.duplication_percentage < 5
  input.test_coverage > 80
}`
      }
    ],
    "e2": [
      {
        id: "v3",
        expectationId: "e2",
        version: 1,
        timestamp: "2025-04-06T11:20:00Z",
        user: "John Doe",
        name: "Architecture Pattern Compliance",
        description: "Ensure that code follows architecture patterns",
        category: "Pattern Adherence",
        status: "draft",
        rule: `package architecture.rules

import future.keywords.in

# Check if architecture patterns are followed
default pattern_valid = false

pattern_valid {
  input.layer_violations == 0
  input.pattern_adherence_score > 80
}`
      },
      {
        id: "v4",
        expectationId: "e2",
        version: 2,
        timestamp: "2025-04-09T11:20:00Z",
        user: "Jane Smith",
        name: "Architecture Pattern Compliance",
        description: "Ensure that code follows the defined architecture patterns",
        category: "Pattern Adherence",
        status: "active",
        rule: `package architecture.rules

import future.keywords.in

# Check if architecture patterns are followed
default pattern_valid = false

pattern_valid {
  input.layer_violations == 0
  input.dependency_direction_violations == 0
  input.pattern_adherence_score > 85
}`
      }
    ],
    "e3": [
      {
        id: "v5",
        expectationId: "e3",
        version: 1,
        timestamp: "2025-04-07T09:45:00Z",
        user: "John Doe",
        name: "Infrastructure Security Compliance",
        description: "Verify that infrastructure configurations meet security standards",
        category: "Security",
        status: "draft",
        rule: `package infrastructure.rules

import future.keywords.in

# Check if security standards are met
default security_valid = false

security_valid {
  input.exposed_secrets == 0
  input.vulnerable_dependencies == 0
}`
      },
      {
        id: "v6",
        expectationId: "e3",
        version: 2,
        timestamp: "2025-04-08T09:45:00Z",
        user: "Jane Smith",
        name: "Infrastructure Security Compliance",
        description: "Verify that infrastructure configurations meet security standards",
        category: "Security",
        status: "active",
        rule: `package infrastructure.rules

import future.keywords.in

# Check if security standards are met
default security_valid = false

security_valid {
  input.exposed_secrets == 0
  input.vulnerable_dependencies == 0
  input.security_scan_score > 90
}`
      }
    ]
  });

  const [selectedExpectationId, setSelectedExpectationId] = useState(expectationId || "e1");
  const [selectedVersions, setSelectedVersions] = useState<{
    left: string;
    right: string;
  }>({
    left: "",
    right: ""
  });

  // Get available expectations
  const availableExpectations = Object.keys(expectationVersions).map(id => {
    const latestVersion = expectationVersions[id][expectationVersions[id].length - 1];
    return {
      id,
      name: latestVersion.name,
      category: latestVersion.category
    };
  });

  // Get versions for selected expectation
  const versionsForExpectation = expectationVersions[selectedExpectationId] || [];

  // Set default selected versions when expectation changes
  const handleExpectationChange = (id: string) => {
    setSelectedExpectationId(id);
    
    const versions = expectationVersions[id] || [];
    if (versions.length >= 2) {
      setSelectedVersions({
        left: versions[versions.length - 2].id,
        right: versions[versions.length - 1].id
      });
    } else if (versions.length === 1) {
      setSelectedVersions({
        left: versions[0].id,
        right: versions[0].id
      });
    } else {
      setSelectedVersions({
        left: "",
        right: ""
      });
    }
  };

  // Initialize default versions if not set
  if (selectedVersions.left === "" && selectedVersions.right === "" && versionsForExpectation.length >= 2) {
    setSelectedVersions({
      left: versionsForExpectation[versionsForExpectation.length - 2].id,
      right: versionsForExpectation[versionsForExpectation.length - 1].id
    });
  } else if (selectedVersions.left === "" && selectedVersions.right === "" && versionsForExpectation.length === 1) {
    setSelectedVersions({
      left: versionsForExpectation[0].id,
      right: versionsForExpectation[0].id
    });
  }

  // Get version by ID
  const getVersionById = (id: string) => {
    for (const expectationId in expectationVersions) {
      const version = expectationVersions[expectationId].find(v => v.id === id);
      if (version) return version;
    }
    return null;
  };

  // Get left and right versions
  const leftVersion = getVersionById(selectedVersions.left);
  const rightVersion = getVersionById(selectedVersions.right);

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

  // Compare two strings and generate diff
  const generateDiff = (left: string, right: string) => {
    // This is a simple diff implementation for demonstration
    // In a real application, you would use a proper diff library
    
    const leftLines = left.split('\n');
    const rightLines = right.split('\n');
    
    const result = [];
    
    const maxLines = Math.max(leftLines.length, rightLines.length);
    
    for (let i = 0; i < maxLines; i++) {
      const leftLine = i < leftLines.length ? leftLines[i] : null;
      const rightLine = i < rightLines.length ? rightLines[i] : null;
      
      if (leftLine === rightLine) {
        result.push({
          type: "unchanged",
          leftLine,
          rightLine
        });
      } else if (leftLine === null) {
        result.push({
          type: "added",
          leftLine: null,
          rightLine
        });
      } else if (rightLine === null) {
        result.push({
          type: "removed",
          leftLine,
          rightLine: null
        });
      } else {
        result.push({
          type: "changed",
          leftLine,
          rightLine
        });
      }
    }
    
    return result;
  };

  // Generate diffs for fields
  const nameDiff = leftVersion && rightVersion ? 
    leftVersion.name === rightVersion.name ? null : { left: leftVersion.name, right: rightVersion.name } : null;
  
  const descriptionDiff = leftVersion && rightVersion ? 
    leftVersion.description === rightVersion.description ? null : { left: leftVersion.description, right: rightVersion.description } : null;
  
  const categoryDiff = leftVersion && rightVersion ? 
    leftVersion.category === rightVersion.category ? null : { left: leftVersion.category, right: rightVersion.category } : null;
  
  const statusDiff = leftVersion && rightVersion ? 
    leftVersion.status === rightVersion.status ? null : { left: leftVersion.status, right: rightVersion.status } : null;
  
  const ruleDiff = leftVersion && rightVersion ? 
    generateDiff(leftVersion.rule, rightVersion.rule) : [];

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

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <GitCompare className="h-5 w-5" />
              Expectation Diff Viewer
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => handleExpectationChange(selectedExpectationId)}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-full md:w-auto flex-1">
              <Select value={selectedExpectationId} onValueChange={handleExpectationChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select expectation" />
                </SelectTrigger>
                <SelectContent>
                  {availableExpectations.map((exp) => (
                    <SelectItem key={exp.id} value={exp.id}>
                      {exp.name} ({exp.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {versionsForExpectation.length} version{versionsForExpectation.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Select 
                value={selectedVersions.left} 
                onValueChange={(value) => setSelectedVersions({ ...selectedVersions, left: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select left version" />
                </SelectTrigger>
                <SelectContent>
                  {versionsForExpectation.map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      v{version.version} - {formatDate(version.timestamp)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Select 
                value={selectedVersions.right} 
                onValueChange={(value) => setSelectedVersions({ ...selectedVersions, right: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select right version" />
                </SelectTrigger>
                <SelectContent>
                  {versionsForExpectation.map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      v{version.version} - {formatDate(version.timestamp)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {leftVersion && rightVersion ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-md border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Version {leftVersion.version}</span>
                      <Badge variant="outline">{formatDate(leftVersion.timestamp)}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      by {leftVersion.user}
                    </div>
                  </div>
                </div>
                
                <div className="rounded-md border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Version {rightVersion.version}</span>
                      <Badge variant="outline">{formatDate(rightVersion.timestamp)}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      by {rightVersion.user}
                    </div>
                  </div>
                </div>
              </div>
              
              {nameDiff && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Name Changes</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md border p-2 bg-red-50">
                      <div className="flex items-center gap-2">
                        <Minus className="h-4 w-4 text-red-500" />
                        <span className="text-sm">{nameDiff.left}</span>
                      </div>
                    </div>
                    <div className="rounded-md border p-2 bg-green-50">
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{nameDiff.right}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {descriptionDiff && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Description Changes</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md border p-2 bg-red-50">
                      <div className="flex items-start gap-2">
                        <Minus className="h-4 w-4 text-red-500 mt-0.5" />
                        <span className="text-sm">{descriptionDiff.left}</span>
                      </div>
                    </div>
                    <div className="rounded-md border p-2 bg-green-50">
                      <div className="flex items-start gap-2">
                        <Plus className="h-4 w-4 text-green-500 mt-0.5" />
                        <span className="text-sm">{descriptionDiff.right}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {categoryDiff && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Category Changes</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md border p-2 bg-red-50">
                      <div className="flex items-center gap-2">
                        <Minus className="h-4 w-4 text-red-500" />
                        <span className="text-sm">{categoryDiff.left}</span>
                      </div>
                    </div>
                    <div className="rounded-md border p-2 bg-green-50">
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{categoryDiff.right}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {statusDiff && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Status Changes</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md border p-2 bg-red-50">
                      <div className="flex items-center gap-2">
                        <Minus className="h-4 w-4 text-red-500" />
                        {getStatusBadge(statusDiff.left)}
                      </div>
                    </div>
                    <div className="rounded-md border p-2 bg-green-50">
                      <div className="flex items-center gap-2">
                        <Plus className="h-4 w-4 text-green-500" />
                        {getStatusBadge(statusDiff.right)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Rule Changes</h3>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <FileCode className="h-3 w-3 mr-1" />
                    Rego
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-md border overflow-hidden">
                    <div className="bg-muted/40 p-2 text-sm font-medium">
                      Version {leftVersion.version}
                    </div>
                    <div className="p-2 font-mono text-xs space-y-0.5">
                      {ruleDiff.map((line, index) => (
                        <div 
                          key={index} 
                          className={`pl-1 ${
                            line.type === "removed" ? "bg-red-50" : 
                            line.type === "changed" ? "bg-amber-50" : 
                            ""
                          }`}
                        >
                          {line.type === "removed" && <Minus className="inline h-3 w-3 text-red-500 mr-1" />}
                          {line.type === "changed" && <Minus className="inline h-3 w-3 text-amber-500 mr-1" />}
                          {line.leftLine || ""}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="rounded-md border overflow-hidden">
                    <div className="bg-muted/40 p-2 text-sm font-medium">
                      Version {rightVersion.version}
                    </div>
                    <div className="p-2 font-mono text-xs space-y-0.5">
                      {ruleDiff.map((line, index) => (
                        <div 
                          key={index} 
                          className={`pl-1 ${
                            line.type === "added" ? "bg-green-50" : 
                            line.type === "changed" ? "bg-amber-50" : 
                            ""
                          }`}
                        >
                          {line.type === "added" && <Plus className="inline h-3 w-3 text-green-500 mr-1" />}
                          {line.type === "changed" && <Plus className="inline h-3 w-3 text-amber-500 mr-1" />}
                          {line.rightLine || ""}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-sm font-medium">Older</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Newer</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-4 border rounded-lg bg-muted/40">
              <p className="text-muted-foreground">
                {versionsForExpectation.length === 0 ? 
                  "No versions available for this expectation." : 
                  "Select versions to compare."
                }
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
