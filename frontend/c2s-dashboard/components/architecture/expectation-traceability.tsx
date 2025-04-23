"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Link as LinkIcon, 
  FileText, 
  Code,
  Check,
  X,
  AlertTriangle
} from "lucide-react";

// Sample data for expectation traceability
const traceabilityData = [
  {
    id: "EXP-001",
    description: "Services should not directly depend on repositories from other domains",
    status: "violated",
    violations: 3,
    traces: [
      { file: "src/services/payment/PaymentService.ts", line: 45, description: "Direct import of UserRepository" },
      { file: "src/services/notification/EmailService.ts", line: 28, description: "Direct import of OrderRepository" },
      { file: "src/services/analytics/AnalyticsService.ts", line: 67, description: "Direct import of ProductRepository" }
    ]
  },
  {
    id: "EXP-002",
    description: "Domain layer should not depend on external layers",
    status: "compliant",
    violations: 0,
    traces: []
  },
  {
    id: "EXP-003",
    description: "Use Repository Pattern for data access",
    status: "compliant",
    violations: 0,
    traces: []
  },
  {
    id: "EXP-004",
    description: "Controllers should use dependency injection for services",
    status: "partially",
    violations: 1,
    traces: [
      { file: "src/controllers/UserController.ts", line: 23, description: "Direct instantiation of UserService" }
    ]
  },
  {
    id: "EXP-005",
    description: "All entities must implement proper validation",
    status: "violated",
    violations: 2,
    traces: [
      { file: "src/domain/order/Order.ts", line: 56, description: "Missing validation for order items" },
      { file: "src/domain/payment/Payment.ts", line: 34, description: "Missing validation for payment amount" }
    ]
  }
];

export function ExpectationTraceability() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedExpectation, setExpandedExpectation] = useState<string | null>(null);
  
  // Filter data based on search query
  const filteredData = traceabilityData.filter(item => 
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Toggle expanded state for an expectation
  const toggleExpand = (id: string) => {
    if (expandedExpectation === id) {
      setExpandedExpectation(null);
    } else {
      setExpandedExpectation(id);
    }
  };
  
  // Render status badge
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Check className="h-3 w-3 mr-1" />
            Compliant
          </Badge>
        );
      case "violated":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <X className="h-3 w-3 mr-1" />
            Violated
          </Badge>
        );
      case "partially":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Partially Compliant
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Expectation Traceability
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search expectations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[150px]">Status</TableHead>
                <TableHead className="w-[100px] text-right">Violations</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No expectations found matching your search criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item) => (
                  <>
                    <TableRow 
                      key={item.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => toggleExpand(item.id)}
                    >
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{renderStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-right">
                        {item.violations > 0 ? (
                          <Badge variant="destructive">{item.violations}</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50">0</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                    
                    {/* Expanded details for violations */}
                    {expandedExpectation === item.id && item.violations > 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="p-0">
                          <div className="bg-muted/30 p-4 border-t">
                            <h4 className="text-sm font-medium mb-2">Violation Details</h4>
                            <div className="space-y-3">
                              {item.traces.map((trace, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 rounded-md bg-background border">
                                  <div className="mt-0.5">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                      <div className="flex items-center gap-1">
                                        <span className="text-xs font-medium">{trace.file}</span>
                                        <Badge variant="outline" className="text-xs">Line {trace.line}</Badge>
                                      </div>
                                      <Button variant="ghost" size="sm" className="h-7 gap-1">
                                        <Code className="h-3.5 w-3.5" />
                                        <span className="text-xs">View Code</span>
                                      </Button>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{trace.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground">
          <p>
            This view shows the traceability between architectural expectations and their implementation in the codebase.
            Click on any row to see detailed violation information.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
