"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Layers,
  Check,
  AlertTriangle,
  XCircle
} from "lucide-react";

interface BusinessCapability {
  id: string;
  name: string;
  description: string;
  coverage: number;
  status: "implemented" | "partial" | "missing";
  modules: string[];
  subcapabilities?: BusinessCapability[];
}

interface BusinessCapabilityMapProps {
  className?: string;
  isFullPage?: boolean;
}

export function BusinessCapabilityMap({ className, isFullPage = false }: BusinessCapabilityMapProps) {
  // Sample data for business capabilities
  const [capabilities, setCapabilities] = useState<BusinessCapability[]>([
    {
      id: "c1",
      name: "User Management",
      description: "Capabilities related to user accounts and authentication",
      coverage: 85,
      status: "implemented",
      modules: ["auth", "user-service", "profile-manager"],
      subcapabilities: [
        {
          id: "c1-1",
          name: "Authentication",
          description: "User login and authentication processes",
          coverage: 95,
          status: "implemented",
          modules: ["auth"]
        },
        {
          id: "c1-2",
          name: "User Profiles",
          description: "User profile management",
          coverage: 80,
          status: "implemented",
          modules: ["profile-manager"]
        },
        {
          id: "c1-3",
          name: "Role Management",
          description: "User roles and permissions",
          coverage: 75,
          status: "partial",
          modules: ["auth", "user-service"]
        }
      ]
    },
    {
      id: "c2",
      name: "Order Processing",
      description: "Capabilities related to order management",
      coverage: 90,
      status: "implemented",
      modules: ["order-service", "cart-service", "inventory-service"],
      subcapabilities: [
        {
          id: "c2-1",
          name: "Shopping Cart",
          description: "Shopping cart functionality",
          coverage: 100,
          status: "implemented",
          modules: ["cart-service"]
        },
        {
          id: "c2-2",
          name: "Checkout",
          description: "Order checkout process",
          coverage: 90,
          status: "implemented",
          modules: ["order-service", "payment-service"]
        },
        {
          id: "c2-3",
          name: "Order Tracking",
          description: "Order status and tracking",
          coverage: 85,
          status: "implemented",
          modules: ["order-service"]
        }
      ]
    },
    {
      id: "c3",
      name: "Payment Processing",
      description: "Capabilities related to payment handling",
      coverage: 70,
      status: "partial",
      modules: ["payment-service", "billing-service"],
      subcapabilities: [
        {
          id: "c3-1",
          name: "Payment Methods",
          description: "Support for various payment methods",
          coverage: 80,
          status: "implemented",
          modules: ["payment-service"]
        },
        {
          id: "c3-2",
          name: "Invoicing",
          description: "Invoice generation and management",
          coverage: 60,
          status: "partial",
          modules: ["billing-service"]
        },
        {
          id: "c3-3",
          name: "Refunds",
          description: "Refund processing",
          coverage: 50,
          status: "partial",
          modules: ["payment-service"]
        }
      ]
    },
    {
      id: "c4",
      name: "Reporting & Analytics",
      description: "Business intelligence and reporting capabilities",
      coverage: 40,
      status: "partial",
      modules: ["analytics-service", "reporting-engine"],
      subcapabilities: [
        {
          id: "c4-1",
          name: "Sales Reports",
          description: "Sales performance reporting",
          coverage: 65,
          status: "partial",
          modules: ["reporting-engine"]
        },
        {
          id: "c4-2",
          name: "User Analytics",
          description: "User behavior analytics",
          coverage: 45,
          status: "partial",
          modules: ["analytics-service"]
        },
        {
          id: "c4-3",
          name: "Business Intelligence",
          description: "Advanced business analytics",
          coverage: 20,
          status: "missing",
          modules: []
        }
      ]
    },
    {
      id: "c5",
      name: "Customer Support",
      description: "Customer service and support capabilities",
      coverage: 30,
      status: "partial",
      modules: ["support-ticket", "knowledge-base"],
      subcapabilities: [
        {
          id: "c5-1",
          name: "Ticket Management",
          description: "Support ticket handling",
          coverage: 60,
          status: "partial",
          modules: ["support-ticket"]
        },
        {
          id: "c5-2",
          name: "Knowledge Base",
          description: "Self-service knowledge base",
          coverage: 40,
          status: "partial",
          modules: ["knowledge-base"]
        },
        {
          id: "c5-3",
          name: "Live Chat",
          description: "Real-time customer support chat",
          coverage: 0,
          status: "missing",
          modules: []
        }
      ]
    }
  ]);

  const [expandedCapabilities, setExpandedCapabilities] = useState<Record<string, boolean>>({});

  // Toggle capability expansion
  const toggleCapability = (capabilityId: string) => {
    setExpandedCapabilities({
      ...expandedCapabilities,
      [capabilityId]: !expandedCapabilities[capabilityId]
    });
  };

  // Refresh capability data
  const refreshData = () => {
    console.log("Refreshing business capability data...");
    // In a real application, this would fetch updated data from an API
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
        return <Check className="h-5 w-5 text-green-500" />;
      case "partial":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "missing":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  // Get coverage class
  const getCoverageClass = (coverage: number) => {
    if (coverage >= 80) return "bg-green-500";
    if (coverage >= 50) return "bg-amber-500";
    return "bg-red-500";
  };

  // Calculate overall coverage
  const totalCapabilities = capabilities.length + capabilities.reduce((sum, cap) => sum + (cap.subcapabilities?.length || 0), 0);
  const implementedCapabilities = capabilities.filter(cap => cap.status === "implemented").length +
    capabilities.reduce((sum, cap) => sum + (cap.subcapabilities?.filter(sub => sub.status === "implemented").length || 0), 0);
  const partialCapabilities = capabilities.filter(cap => cap.status === "partial").length +
    capabilities.reduce((sum, cap) => sum + (cap.subcapabilities?.filter(sub => sub.status === "partial").length || 0), 0);
  const missingCapabilities = capabilities.filter(cap => cap.status === "missing").length +
    capabilities.reduce((sum, cap) => sum + (cap.subcapabilities?.filter(sub => sub.status === "missing").length || 0), 0);
  
  const overallCoverage = Math.round((implementedCapabilities + (partialCapabilities * 0.5)) / totalCapabilities * 100);

  // Display capabilities based on full page or card view
  const displayCapabilities = isFullPage ? capabilities : capabilities.slice(0, 3);

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Business Capability Map
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{overallCoverage}%</div>
                <div className="text-xs text-muted-foreground">Coverage</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{implementedCapabilities}</div>
                <div className="text-xs text-muted-foreground">Implemented</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{partialCapabilities}</div>
                <div className="text-xs text-muted-foreground">Partial</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{missingCapabilities}</div>
                <div className="text-xs text-muted-foreground">Missing</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {displayCapabilities.map((capability) => (
              <div key={capability.id} className="rounded-lg border overflow-hidden">
                <div 
                  className="flex items-center justify-between p-3 bg-muted/40 cursor-pointer"
                  onClick={() => toggleCapability(capability.id)}
                >
                  <div className="flex items-center gap-2">
                    {getStatusIcon(capability.status)}
                    <h3 className="font-medium">{capability.name}</h3>
                    {getStatusBadge(capability.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm">{capability.coverage}%</div>
                    {expandedCapabilities[capability.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
                
                {expandedCapabilities[capability.id] && (
                  <div className="p-3 space-y-3">
                    <p className="text-sm text-muted-foreground">{capability.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {capability.modules.map((module) => (
                        <Badge key={module} variant="secondary">{module}</Badge>
                      ))}
                    </div>
                    
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getCoverageClass(capability.coverage)}`} 
                        style={{ width: `${capability.coverage}%` }}
                      ></div>
                    </div>
                    
                    {capability.subcapabilities && capability.subcapabilities.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-medium">Sub-capabilities</h4>
                        <div className="space-y-2">
                          {capability.subcapabilities.map((subcapability) => (
                            <div key={subcapability.id} className="rounded border p-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(subcapability.status)}
                                  <div>
                                    <div className="font-medium text-sm">{subcapability.name}</div>
                                    <div className="text-xs text-muted-foreground">{subcapability.description}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getStatusBadge(subcapability.status)}
                                  <div className="text-sm">{subcapability.coverage}%</div>
                                </div>
                              </div>
                              
                              {subcapability.modules.length > 0 && (
                                <div className="mt-2 flex flex-wrap gap-1">
                                  {subcapability.modules.map((module) => (
                                    <Badge key={module} variant="outline" className="text-xs">{module}</Badge>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {!isFullPage && capabilities.length > 3 && (
            <Button variant="outline" size="sm" className="w-full" asChild>
              <span>
                <ExternalLink className="h-4 w-4 mr-2" />
                View All Capabilities
              </span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
