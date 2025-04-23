"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw,
  GitBranch,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Search,
  Filter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProcessStep {
  id: string;
  name: string;
  description: string;
  status: "implemented" | "partial" | "missing";
  dependencies: string[];
  implementationDetails?: {
    services: string[];
    files: string[];
    coverage: number;
  };
}

interface BusinessProcess {
  id: string;
  name: string;
  description: string;
  category: string;
  steps: ProcessStep[];
  overallStatus: "implemented" | "partial" | "missing";
  priority: "high" | "medium" | "low";
}

interface BusinessProcessMapProps {
  className?: string;
  isFullPage?: boolean;
}

export function BusinessProcessMap({ className, isFullPage = false }: BusinessProcessMapProps) {
  // Sample data for business processes
  const [businessProcesses, setBusinessProcesses] = useState<BusinessProcess[]>([
    {
      id: "p1",
      name: "Customer Onboarding",
      description: "Process for registering new customers and setting up their accounts",
      category: "Customer Management",
      priority: "high",
      overallStatus: "implemented",
      steps: [
        {
          id: "s1",
          name: "Account Registration",
          description: "Customer registers with email and basic information",
          status: "implemented",
          dependencies: [],
          implementationDetails: {
            services: ["user-service", "auth-service"],
            files: ["src/controllers/registration-controller.ts", "src/services/user-service.ts"],
            coverage: 95
          }
        },
        {
          id: "s2",
          name: "Email Verification",
          description: "Verify customer email through confirmation link",
          status: "implemented",
          dependencies: ["s1"],
          implementationDetails: {
            services: ["notification-service", "auth-service"],
            files: ["src/services/email-service.ts", "src/controllers/verification-controller.ts"],
            coverage: 90
          }
        },
        {
          id: "s3",
          name: "Profile Completion",
          description: "Customer completes their profile with additional details",
          status: "implemented",
          dependencies: ["s2"],
          implementationDetails: {
            services: ["profile-service"],
            files: ["src/controllers/profile-controller.ts", "src/services/profile-service.ts"],
            coverage: 85
          }
        },
        {
          id: "s4",
          name: "Preference Setting",
          description: "Customer sets preferences for notifications and account settings",
          status: "implemented",
          dependencies: ["s3"],
          implementationDetails: {
            services: ["preference-service"],
            files: ["src/controllers/preference-controller.ts", "src/services/preference-service.ts"],
            coverage: 80
          }
        }
      ]
    },
    {
      id: "p2",
      name: "Order Processing",
      description: "End-to-end process for handling customer orders",
      category: "Sales",
      priority: "high",
      overallStatus: "partial",
      steps: [
        {
          id: "s5",
          name: "Cart Management",
          description: "Customer adds products to cart and manages quantities",
          status: "implemented",
          dependencies: [],
          implementationDetails: {
            services: ["cart-service"],
            files: ["src/controllers/cart-controller.ts", "src/services/cart-service.ts"],
            coverage: 92
          }
        },
        {
          id: "s6",
          name: "Checkout Process",
          description: "Customer proceeds to checkout and enters shipping/billing information",
          status: "implemented",
          dependencies: ["s5"],
          implementationDetails: {
            services: ["checkout-service"],
            files: ["src/controllers/checkout-controller.ts", "src/services/checkout-service.ts"],
            coverage: 88
          }
        },
        {
          id: "s7",
          name: "Payment Processing",
          description: "Process payment through payment gateway",
          status: "implemented",
          dependencies: ["s6"],
          implementationDetails: {
            services: ["payment-service"],
            files: ["src/controllers/payment-controller.ts", "src/services/payment-processor.ts"],
            coverage: 95
          }
        },
        {
          id: "s8",
          name: "Order Confirmation",
          description: "Generate order confirmation and send to customer",
          status: "implemented",
          dependencies: ["s7"],
          implementationDetails: {
            services: ["order-service", "notification-service"],
            files: ["src/controllers/order-controller.ts", "src/services/notification-service.ts"],
            coverage: 90
          }
        },
        {
          id: "s9",
          name: "Inventory Update",
          description: "Update inventory levels based on order",
          status: "partial",
          dependencies: ["s8"],
          implementationDetails: {
            services: ["inventory-service"],
            files: ["src/services/inventory-service.ts"],
            coverage: 65
          }
        },
        {
          id: "s10",
          name: "Fulfillment Notification",
          description: "Notify fulfillment team about new order",
          status: "missing",
          dependencies: ["s9"]
        }
      ]
    },
    {
      id: "p3",
      name: "Returns Processing",
      description: "Process for handling customer returns and refunds",
      category: "Sales",
      priority: "medium",
      overallStatus: "partial",
      steps: [
        {
          id: "s11",
          name: "Return Request",
          description: "Customer submits return request with reason",
          status: "implemented",
          dependencies: [],
          implementationDetails: {
            services: ["returns-service"],
            files: ["src/controllers/returns-controller.ts", "src/services/returns-service.ts"],
            coverage: 85
          }
        },
        {
          id: "s12",
          name: "Return Approval",
          description: "Review and approve return request",
          status: "partial",
          dependencies: ["s11"],
          implementationDetails: {
            services: ["returns-service"],
            files: ["src/services/returns-approval-service.ts"],
            coverage: 60
          }
        },
        {
          id: "s13",
          name: "Return Shipping",
          description: "Generate return shipping label and instructions",
          status: "implemented",
          dependencies: ["s12"],
          implementationDetails: {
            services: ["shipping-service"],
            files: ["src/services/label-service.ts", "src/controllers/shipping-controller.ts"],
            coverage: 80
          }
        },
        {
          id: "s14",
          name: "Return Processing",
          description: "Process returned items and update inventory",
          status: "partial",
          dependencies: ["s13"],
          implementationDetails: {
            services: ["inventory-service", "returns-service"],
            files: ["src/services/returns-processing-service.ts"],
            coverage: 50
          }
        },
        {
          id: "s15",
          name: "Refund Processing",
          description: "Process refund to customer's original payment method",
          status: "missing",
          dependencies: ["s14"]
        }
      ]
    },
    {
      id: "p4",
      name: "Customer Support",
      description: "Process for handling customer inquiries and support tickets",
      category: "Customer Management",
      priority: "medium",
      overallStatus: "partial",
      steps: [
        {
          id: "s16",
          name: "Ticket Creation",
          description: "Customer creates support ticket through various channels",
          status: "implemented",
          dependencies: [],
          implementationDetails: {
            services: ["support-service"],
            files: ["src/controllers/ticket-controller.ts", "src/services/ticket-service.ts"],
            coverage: 90
          }
        },
        {
          id: "s17",
          name: "Ticket Assignment",
          description: "Assign ticket to appropriate support agent",
          status: "implemented",
          dependencies: ["s16"],
          implementationDetails: {
            services: ["support-service"],
            files: ["src/services/assignment-service.ts"],
            coverage: 85
          }
        },
        {
          id: "s18",
          name: "Ticket Resolution",
          description: "Agent resolves ticket and documents solution",
          status: "partial",
          dependencies: ["s17"],
          implementationDetails: {
            services: ["support-service"],
            files: ["src/services/resolution-service.ts"],
            coverage: 70
          }
        },
        {
          id: "s19",
          name: "Customer Satisfaction Survey",
          description: "Send survey to customer after ticket resolution",
          status: "missing",
          dependencies: ["s18"]
        }
      ]
    },
    {
      id: "p5",
      name: "Inventory Management",
      description: "Process for managing product inventory and stock levels",
      category: "Operations",
      priority: "high",
      overallStatus: "partial",
      steps: [
        {
          id: "s20",
          name: "Inventory Tracking",
          description: "Track current inventory levels across all products",
          status: "implemented",
          dependencies: [],
          implementationDetails: {
            services: ["inventory-service"],
            files: ["src/controllers/inventory-controller.ts", "src/services/inventory-tracking-service.ts"],
            coverage: 95
          }
        },
        {
          id: "s21",
          name: "Low Stock Alerts",
          description: "Generate alerts when products reach low stock thresholds",
          status: "implemented",
          dependencies: ["s20"],
          implementationDetails: {
            services: ["inventory-service", "notification-service"],
            files: ["src/services/stock-alert-service.ts"],
            coverage: 85
          }
        },
        {
          id: "s22",
          name: "Purchase Order Generation",
          description: "Automatically generate purchase orders for low stock items",
          status: "partial",
          dependencies: ["s21"],
          implementationDetails: {
            services: ["purchasing-service"],
            files: ["src/services/purchase-order-service.ts"],
            coverage: 60
          }
        },
        {
          id: "s23",
          name: "Supplier Integration",
          description: "Send purchase orders to suppliers via API integration",
          status: "missing",
          dependencies: ["s22"]
        },
        {
          id: "s24",
          name: "Inventory Receiving",
          description: "Process incoming inventory from suppliers",
          status: "partial",
          dependencies: ["s23"],
          implementationDetails: {
            services: ["inventory-service"],
            files: ["src/services/receiving-service.ts"],
            coverage: 55
          }
        }
      ]
    }
  ]);

  const [expandedProcesses, setExpandedProcesses] = useState<Record<string, boolean>>({});
  const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [showFullMap, setShowFullMap] = useState(false);

  // Get all unique categories
  const categories = Array.from(new Set(businessProcesses.map(process => process.category)));

  // Refresh processes
  const refreshProcesses = () => {
    console.log("Refreshing business processes...");
    // In a real application, this would fetch updated processes from an API
  };

  // Toggle process expansion
  const toggleProcess = (processId: string) => {
    setExpandedProcesses({
      ...expandedProcesses,
      [processId]: !expandedProcesses[processId]
    });
  };

  // Toggle step expansion
  const toggleStep = (stepId: string) => {
    setExpandedSteps({
      ...expandedSteps,
      [stepId]: !expandedSteps[stepId]
    });
  };

  // Toggle full map view
  const toggleFullMap = () => {
    setShowFullMap(!showFullMap);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "implemented":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Implemented</Badge>;
      case "partial":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Partial</Badge>;
      case "missing":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Missing</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "implemented":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "missing":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High Priority</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium Priority</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Low Priority</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Filter processes based on search query and filters
  const filteredProcesses = businessProcesses.filter(process => {
    // Filter by status
    if (statusFilter !== "all" && process.overallStatus !== statusFilter) {
      return false;
    }
    
    // Filter by category
    if (categoryFilter !== "all" && process.category !== categoryFilter) {
      return false;
    }
    
    // Filter by priority
    if (priorityFilter !== "all" && process.priority !== priorityFilter) {
      return false;
    }
    
    // Filter by search query
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      process.name.toLowerCase().includes(searchLower) ||
      process.description.toLowerCase().includes(searchLower) ||
      process.steps.some(step => 
        step.name.toLowerCase().includes(searchLower) ||
        step.description.toLowerCase().includes(searchLower)
      )
    );
  });

  // Calculate statistics
  const implementedCount = businessProcesses.filter(process => process.overallStatus === "implemented").length;
  const partialCount = businessProcesses.filter(process => process.overallStatus === "partial").length;
  const missingCount = businessProcesses.filter(process => process.overallStatus === "missing").length;
  
  const highPriorityCount = businessProcesses.filter(process => process.priority === "high").length;
  const mediumPriorityCount = businessProcesses.filter(process => process.priority === "medium").length;
  const lowPriorityCount = businessProcesses.filter(process => process.priority === "low").length;

  // Display processes based on full page or card view
  const displayProcesses = isFullPage || showFullMap ? filteredProcesses : filteredProcesses.slice(0, 3);

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              Business Process Map
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleFullMap}>
              {showFullMap ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={refreshProcesses}>
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
                <div className="text-2xl font-bold text-green-600">{implementedCount}</div>
                <div className="text-xs text-muted-foreground">Implemented</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{partialCount}</div>
                <div className="text-xs text-muted-foreground">Partial</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{missingCount}</div>
                <div className="text-xs text-muted-foreground">Missing</div>
              </div>
              <div className="border-l h-8 mx-2"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">{highPriorityCount}</div>
                <div className="text-xs text-muted-foreground">High Priority</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{mediumPriorityCount}</div>
                <div className="text-xs text-muted-foreground">Medium Priority</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{lowPriorityCount}</div>
                <div className="text-xs text-muted-foreground">Low Priority</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search processes..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="implemented">Implemented</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="missing">Missing</SelectItem>
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
          
          <div className="space-y-4">
            {displayProcesses.length === 0 ? (
              <div className="text-center p-4 border rounded-lg bg-muted/40">
                <p className="text-muted-foreground">No business processes found matching your filters.</p>
              </div>
            ) : (
              displayProcesses.map((process) => (
                <div key={process.id} className="rounded-lg border overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-3 bg-muted/40 cursor-pointer"
                    onClick={() => toggleProcess(process.id)}
                  >
                    <div className="flex items-center gap-2">
                      {getStatusIcon(process.overallStatus)}
                      <h3 className="font-medium">{process.name}</h3>
                      {getStatusBadge(process.overallStatus)}
                      {getPriorityBadge(process.priority)}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">
                        {process.steps.length} steps
                      </div>
                      {expandedProcesses[process.id] ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                  
                  {expandedProcesses[process.id] && (
                    <div className="p-3 space-y-3">
                      <p className="text-sm text-muted-foreground">{process.description}</p>
                      <div className="text-sm">
                        <Badge variant="outline" className="bg-muted">
                          {process.category}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3 mt-4">
                        {process.steps.map((step, index) => (
                          <div key={step.id} className="relative">
                            {/* Connecting lines */}
                            {index > 0 && (
                              <div className="absolute left-4 -top-3 w-0.5 h-3 bg-muted-foreground/30"></div>
                            )}
                            {index < process.steps.length - 1 && (
                              <div className="absolute left-4 top-4 w-0.5 h-full bg-muted-foreground/30"></div>
                            )}
                            
                            <div className="rounded border overflow-hidden ml-8">
                              <div 
                                className="flex items-center justify-between p-2 bg-muted/20 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStep(step.id);
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(step.status)}
                                  <h4 className="font-medium text-sm">{step.name}</h4>
                                  {getStatusBadge(step.status)}
                                </div>
                                <div className="flex items-center gap-2">
                                  {expandedSteps[step.id] ? (
                                    <ChevronUp className="h-3 w-3" />
                                  ) : (
                                    <ChevronDown className="h-3 w-3" />
                                  )}
                                </div>
                              </div>
                              
                              {expandedSteps[step.id] && (
                                <div className="p-2 space-y-2">
                                  <p className="text-xs text-muted-foreground">{step.description}</p>
                                  
                                  {step.dependencies.length > 0 && (
                                    <div className="text-xs">
                                      <span className="text-muted-foreground">Dependencies: </span>
                                      {step.dependencies.map((depId) => {
                                        const depStep = process.steps.find(s => s.id === depId);
                                        return depStep ? (
                                          <Badge key={depId} variant="outline" className="ml-1">
                                            {depStep.name}
                                          </Badge>
                                        ) : null;
                                      })}
                                    </div>
                                  )}
                                  
                                  {step.implementationDetails && (
                                    <div className="space-y-1 pt-1">
                                      <div className="text-xs flex items-center justify-between">
                                        <span className="text-muted-foreground">Implementation Coverage:</span>
                                        <span className={`font-medium ${
                                          step.implementationDetails.coverage >= 80 ? "text-green-600" :
                                          step.implementationDetails.coverage >= 50 ? "text-amber-600" :
                                          "text-red-600"
                                        }`}>
                                          {step.implementationDetails.coverage}%
                                        </span>
                                      </div>
                                      
                                      <div className="text-xs">
                                        <span className="text-muted-foreground">Services: </span>
                                        {step.implementationDetails.services.map((service, i) => (
                                          <Badge key={i} variant="outline" className="ml-1 text-xs">
                                            {service}
                                          </Badge>
                                        ))}
                                      </div>
                                      
                                      <div className="text-xs">
                                        <span className="text-muted-foreground">Files: </span>
                                        {step.implementationDetails.files.map((file, i) => (
                                          <div key={i} className="ml-1 mt-1 text-xs">
                                            <code className="bg-muted rounded px-1 py-0.5">{file}</code>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          
          {!isFullPage && !showFullMap && filteredProcesses.length > 3 && (
            <Button variant="outline" size="sm" className="w-full" onClick={toggleFullMap}>
              View All Processes
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
