"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  RefreshCw,
  Download,
  Search,
  GitCommit,
  FileText,
  Code,
  Filter
} from "lucide-react";

interface TraceabilityItem {
  id: string;
  requirementId: string;
  requirementName: string;
  requirementType: "functional" | "non-functional" | "business-rule" | "user-story";
  codeModules: string[];
  testCoverage: number;
  lastUpdated: string;
  status: "complete" | "partial" | "missing";
}

interface TraceabilityMatrixProps {
  className?: string;
  isFullPage?: boolean;
}

export function TraceabilityMatrix({ className, isFullPage = false }: TraceabilityMatrixProps) {
  // Sample data for traceability matrix
  const [traceabilityItems, setTraceabilityItems] = useState<TraceabilityItem[]>([
    {
      id: "t1",
      requirementId: "REQ-001",
      requirementName: "User Authentication",
      requirementType: "functional",
      codeModules: ["auth-service", "user-controller", "login-component"],
      testCoverage: 95,
      lastUpdated: "2025-04-05T14:30:00Z",
      status: "complete"
    },
    {
      id: "t2",
      requirementId: "REQ-002",
      requirementName: "Product Catalog",
      requirementType: "functional",
      codeModules: ["product-service", "catalog-controller", "product-component"],
      testCoverage: 85,
      lastUpdated: "2025-04-04T11:15:00Z",
      status: "complete"
    },
    {
      id: "t3",
      requirementId: "REQ-003",
      requirementName: "Order Processing",
      requirementType: "functional",
      codeModules: ["order-service", "payment-service", "checkout-component"],
      testCoverage: 80,
      lastUpdated: "2025-04-06T09:45:00Z",
      status: "complete"
    },
    {
      id: "t4",
      requirementId: "REQ-004",
      requirementName: "Payment Gateway Integration",
      requirementType: "functional",
      codeModules: ["payment-service", "stripe-adapter", "payment-component"],
      testCoverage: 90,
      lastUpdated: "2025-04-03T16:20:00Z",
      status: "complete"
    },
    {
      id: "t5",
      requirementId: "REQ-005",
      requirementName: "User Profile Management",
      requirementType: "functional",
      codeModules: ["user-service", "profile-controller", "profile-component"],
      testCoverage: 75,
      lastUpdated: "2025-04-02T13:10:00Z",
      status: "partial"
    },
    {
      id: "t6",
      requirementId: "REQ-006",
      requirementName: "System Performance",
      requirementType: "non-functional",
      codeModules: ["caching-service", "optimization-utils"],
      testCoverage: 60,
      lastUpdated: "2025-04-01T10:30:00Z",
      status: "partial"
    },
    {
      id: "t7",
      requirementId: "REQ-007",
      requirementName: "Data Privacy Compliance",
      requirementType: "business-rule",
      codeModules: ["data-masking", "consent-manager", "privacy-service"],
      testCoverage: 85,
      lastUpdated: "2025-04-04T15:45:00Z",
      status: "complete"
    },
    {
      id: "t8",
      requirementId: "REQ-008",
      requirementName: "Reporting Dashboard",
      requirementType: "user-story",
      codeModules: ["reporting-service", "dashboard-component"],
      testCoverage: 40,
      lastUpdated: "2025-04-01T09:15:00Z",
      status: "partial"
    },
    {
      id: "t9",
      requirementId: "REQ-009",
      requirementName: "Multi-language Support",
      requirementType: "functional",
      codeModules: ["i18n-service", "translation-component"],
      testCoverage: 30,
      lastUpdated: "2025-03-30T14:20:00Z",
      status: "partial"
    },
    {
      id: "t10",
      requirementId: "REQ-010",
      requirementName: "Mobile Responsiveness",
      requirementType: "non-functional",
      codeModules: ["responsive-layout", "mobile-utils"],
      testCoverage: 70,
      lastUpdated: "2025-04-02T11:30:00Z",
      status: "partial"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Refresh traceability data
  const refreshData = () => {
    console.log("Refreshing traceability matrix data...");
    // In a real application, this would fetch updated data from an API
  };

  // Export traceability matrix
  const exportMatrix = () => {
    console.log("Exporting traceability matrix...");
    // In a real application, this would generate and download a CSV or Excel file
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
      case "complete":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Complete</Badge>;
      case "partial":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Partial</Badge>;
      case "missing":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Missing</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get type badge
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "functional":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Functional</Badge>;
      case "non-functional":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Non-Functional</Badge>;
      case "business-rule":
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Business Rule</Badge>;
      case "user-story":
        return <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">User Story</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get coverage class
  const getCoverageClass = (coverage: number) => {
    if (coverage >= 80) return "text-green-600";
    if (coverage >= 50) return "text-amber-600";
    return "text-red-600";
  };

  // Filter and search items
  const filteredItems = traceabilityItems.filter(item => {
    const matchesSearch = searchQuery === "" || 
      item.requirementId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.requirementName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.codeModules.some(module => module.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === null || item.requirementType === filterType;
    const matchesStatus = filterStatus === null || item.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Display items based on full page or card view
  const displayItems = isFullPage ? filteredItems : filteredItems.slice(0, 5);

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <GitCommit className="h-5 w-5" />
              Traceability Matrix
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={exportMatrix}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={refreshData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by requirement ID, name, or code module..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Button 
                  variant={filterType === "functional" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterType(filterType === "functional" ? null : "functional")}
                >
                  Functional
                </Button>
                <Button 
                  variant={filterType === "non-functional" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterType(filterType === "non-functional" ? null : "non-functional")}
                >
                  Non-Functional
                </Button>
              </div>
              
              <div className="flex items-center gap-1">
                <Button 
                  variant={filterStatus === "complete" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterStatus(filterStatus === "complete" ? null : "complete")}
                >
                  Complete
                </Button>
                <Button 
                  variant={filterStatus === "partial" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilterStatus(filterStatus === "partial" ? null : "partial")}
                >
                  Partial
                </Button>
              </div>
            </div>
          </div>
          
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium">Requirement</th>
                    <th className="px-4 py-2 text-left font-medium">Type</th>
                    <th className="px-4 py-2 text-left font-medium">Code Modules</th>
                    <th className="px-4 py-2 text-left font-medium">Test Coverage</th>
                    <th className="px-4 py-2 text-left font-medium">Status</th>
                    <th className="px-4 py-2 text-right font-medium">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {displayItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <div>
                            <div className="font-medium">{item.requirementName}</div>
                            <div className="text-xs text-muted-foreground">{item.requirementId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {getTypeBadge(item.requirementType)}
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex flex-wrap gap-1">
                          {item.codeModules.map((module) => (
                            <Badge key={module} variant="outline" className="flex items-center gap-1">
                              <Code className="h-3 w-3" />
                              <span>{module}</span>
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div className={`font-medium ${getCoverageClass(item.testCoverage)}`}>
                            {item.testCoverage}%
                          </div>
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                item.testCoverage >= 80 ? "bg-green-500" : 
                                item.testCoverage >= 50 ? "bg-amber-500" : 
                                "bg-red-500"
                              }`} 
                              style={{ width: `${item.testCoverage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="px-4 py-2 text-right text-xs text-muted-foreground">
                        {formatDate(item.lastUpdated)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {!isFullPage && traceabilityItems.length > 5 && (
            <Button variant="outline" size="sm" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              View All Requirements
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
