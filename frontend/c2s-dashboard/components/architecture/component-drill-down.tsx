"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box, Code, GitBranch, BarChart, FileText } from "lucide-react";

// Sample data for a component
const componentData = {
  name: "PaymentService",
  type: "Service",
  path: "src/services/payment",
  description: "Service responsible for payment processing and integration with external gateways.",
  metrics: {
    complexity: 24,
    coverage: 87,
    dependencies: 8,
    loc: 342,
    maintainability: 76
  },
  dependencies: [
    { name: "PaymentRepository", type: "Repository", direction: "outgoing" },
    { name: "NotificationService", type: "Service", direction: "outgoing" },
    { name: "PaymentGatewayAdapter", type: "Adapter", direction: "outgoing" },
    { name: "OrderService", type: "Service", direction: "incoming" },
    { name: "UserService", type: "Service", direction: "incoming" }
  ],
  methods: [
    { name: "processPayment", visibility: "public", complexity: 8, loc: 42 },
    { name: "refundPayment", visibility: "public", complexity: 6, loc: 38 },
    { name: "validatePaymentData", visibility: "private", complexity: 4, loc: 27 },
    { name: "logTransaction", visibility: "private", complexity: 2, loc: 15 },
    { name: "notifyPaymentStatus", visibility: "private", complexity: 4, loc: 22 }
  ],
  history: [
    { date: "2025-03-15", author: "Maria Silva", message: "Added support for multiple gateways" },
    { date: "2025-02-28", author: "João Santos", message: "Implemented refund functionality" },
    { date: "2025-02-10", author: "Pedro Oliveira", message: "Refactoring to improve testability" },
    { date: "2025-01-22", author: "Ana Costa", message: "Initial implementation of payment service" }
  ]
};

interface ComponentDrillDownProps {
  className?: string;
}

export function ComponentDrillDown({ className }: ComponentDrillDownProps) {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <Box className="h-5 w-5" />
            Component Details
          </div>
        </CardTitle>
        <Button variant="outline" size="sm">
          View Source Code
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">{componentData.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-0.5 rounded-full">
                {componentData.type}
              </span>
              <span className="text-sm text-muted-foreground">{componentData.path}</span>
            </div>
            <p className="text-sm text-muted-foreground">{componentData.description}</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview" className="text-xs">
                <div className="flex items-center gap-1">
                  <BarChart className="h-3 w-3" />
                  <span>Overview</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="dependencies" className="text-xs">
                <div className="flex items-center gap-1">
                  <Box className="h-3 w-3" />
                  <span>Dependencies</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="methods" className="text-xs">
                <div className="flex items-center gap-1">
                  <Code className="h-3 w-3" />
                  <span>Methods</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs">
                <div className="flex items-center gap-1">
                  <GitBranch className="h-3 w-3" />
                  <span>History</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium mb-1">Complexity</div>
                    <div className="text-2xl font-bold">{componentData.metrics.complexity}</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium mb-1">Coverage</div>
                    <div className="text-2xl font-bold">{componentData.metrics.coverage}%</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium mb-1">Dependencies</div>
                    <div className="text-2xl font-bold">{componentData.metrics.dependencies}</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium mb-1">Lines of Code</div>
                    <div className="text-2xl font-bold">{componentData.metrics.loc}</div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium mb-1">Maintainability</div>
                    <div className="text-2xl font-bold">{componentData.metrics.maintainability}</div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2">Quality Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    This component has moderate complexity and good test coverage. The maintainability score indicates it's well-structured, but there are opportunities for improvement in reducing dependencies.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="dependencies">
              <div className="space-y-4">
                <div className="rounded-lg border">
                  <div className="p-4 border-b">
                    <h3 className="text-sm font-medium">Component Dependencies</h3>
                    <p className="text-sm text-muted-foreground">
                      Showing all incoming and outgoing dependencies for this component.
                    </p>
                  </div>
                  <div className="p-0">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="text-xs font-medium text-left p-2">Name</th>
                          <th className="text-xs font-medium text-left p-2">Type</th>
                          <th className="text-xs font-medium text-left p-2">Direction</th>
                        </tr>
                      </thead>
                      <tbody>
                        {componentData.dependencies.map((dep, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                            <td className="p-2 text-sm">{dep.name}</td>
                            <td className="p-2 text-sm">{dep.type}</td>
                            <td className="p-2 text-sm capitalize">
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                dep.direction === "incoming" 
                                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100" 
                                  : "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                              }`}>
                                {dep.direction}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="methods">
              <div className="space-y-4">
                <div className="rounded-lg border">
                  <div className="p-4 border-b">
                    <h3 className="text-sm font-medium">Component Methods</h3>
                    <p className="text-sm text-muted-foreground">
                      Detailed information about the methods in this component.
                    </p>
                  </div>
                  <div className="p-0">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="text-xs font-medium text-left p-2">Name</th>
                          <th className="text-xs font-medium text-left p-2">Visibility</th>
                          <th className="text-xs font-medium text-left p-2">Complexity</th>
                          <th className="text-xs font-medium text-left p-2">Lines</th>
                        </tr>
                      </thead>
                      <tbody>
                        {componentData.methods.map((method, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-muted/20" : ""}>
                            <td className="p-2 text-sm font-medium">{method.name}</td>
                            <td className="p-2 text-sm capitalize">{method.visibility}</td>
                            <td className="p-2 text-sm">{method.complexity}</td>
                            <td className="p-2 text-sm">{method.loc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="space-y-4">
                <div className="rounded-lg border">
                  <div className="p-4 border-b">
                    <h3 className="text-sm font-medium">Change History</h3>
                    <p className="text-sm text-muted-foreground">
                      Recent changes made to this component.
                    </p>
                  </div>
                  <div className="p-0">
                    <div className="divide-y">
                      {componentData.history.map((item, index) => (
                        <div key={index} className="p-4">
                          <div className="flex items-start gap-2">
                            <GitBranch className="h-5 w-5 text-muted-foreground mt-0.5" />
                            <div>
                              <div className="text-sm font-medium">{item.message}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {item.author} on {item.date}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
