"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  RefreshCw,
  Package,
  Code,
  FileCode,
  GitBranch,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface Module {
  id: string;
  name: string;
  type: "service" | "component" | "utility" | "model";
  files: number;
  loc: number;
  capabilities: string[];
  lastModified: string;
}

interface DomainModuleSummaryProps {
  className?: string;
  isFullPage?: boolean;
}

export function DomainModuleSummary({ className, isFullPage = false }: DomainModuleSummaryProps) {
  // Sample data for domain modules
  const [domainModules, setDomainModules] = useState<Record<string, Module[]>>({
    "Sales": [
      {
        id: "m1",
        name: "sales-service",
        type: "service",
        files: 28,
        loc: 3450,
        capabilities: ["Order Processing", "Pricing", "Discounts"],
        lastModified: "2025-04-05T14:30:00Z"
      },
      {
        id: "m2",
        name: "order-component",
        type: "component",
        files: 15,
        loc: 1250,
        capabilities: ["Order Display", "Order Creation"],
        lastModified: "2025-04-04T11:15:00Z"
      },
      {
        id: "m3",
        name: "pricing-utils",
        type: "utility",
        files: 8,
        loc: 650,
        capabilities: ["Price Calculation", "Discount Application"],
        lastModified: "2025-04-03T09:45:00Z"
      }
    ],
    "Marketing": [
      {
        id: "m4",
        name: "campaign-service",
        type: "service",
        files: 22,
        loc: 2800,
        capabilities: ["Campaign Management", "Audience Targeting"],
        lastModified: "2025-04-02T16:20:00Z"
      },
      {
        id: "m5",
        name: "promotion-component",
        type: "component",
        files: 12,
        loc: 980,
        capabilities: ["Promotion Display", "Coupon Management"],
        lastModified: "2025-04-01T13:10:00Z"
      }
    ],
    "Finance": [
      {
        id: "m6",
        name: "payment-service",
        type: "service",
        files: 35,
        loc: 4200,
        capabilities: ["Payment Processing", "Invoicing", "Refunds"],
        lastModified: "2025-04-06T10:30:00Z"
      },
      {
        id: "m7",
        name: "invoice-model",
        type: "model",
        files: 5,
        loc: 320,
        capabilities: ["Invoice Data Structure"],
        lastModified: "2025-04-05T15:45:00Z"
      },
      {
        id: "m8",
        name: "tax-utils",
        type: "utility",
        files: 10,
        loc: 780,
        capabilities: ["Tax Calculation", "Tax Reporting"],
        lastModified: "2025-04-04T09:15:00Z"
      }
    ],
    "Human Resources": [
      {
        id: "m9",
        name: "employee-service",
        type: "service",
        files: 25,
        loc: 3100,
        capabilities: ["Employee Management", "Onboarding"],
        lastModified: "2025-04-03T14:20:00Z"
      },
      {
        id: "m10",
        name: "profile-component",
        type: "component",
        files: 14,
        loc: 1150,
        capabilities: ["Profile Display", "Profile Editing"],
        lastModified: "2025-04-02T11:30:00Z"
      }
    ],
    "Operations": [
      {
        id: "m11",
        name: "inventory-service",
        type: "service",
        files: 30,
        loc: 3800,
        capabilities: ["Inventory Management", "Stock Tracking"],
        lastModified: "2025-04-01T16:45:00Z"
      },
      {
        id: "m12",
        name: "logistics-component",
        type: "component",
        files: 18,
        loc: 1450,
        capabilities: ["Shipping Management", "Delivery Tracking"],
        lastModified: "2025-03-31T13:20:00Z"
      }
    ],
    "Customer Service": [
      {
        id: "m13",
        name: "support-service",
        type: "service",
        files: 26,
        loc: 3250,
        capabilities: ["Ticket Management", "Customer Communication"],
        lastModified: "2025-03-30T15:10:00Z"
      },
      {
        id: "m14",
        name: "chat-component",
        type: "component",
        files: 20,
        loc: 1650,
        capabilities: ["Live Chat", "Message History"],
        lastModified: "2025-03-29T10:45:00Z"
      }
    ]
  });

  const [activeTab, setActiveTab] = useState("Sales");
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Refresh module data
  const refreshData = () => {
    console.log("Refreshing domain module data...");
    // In a real application, this would fetch updated data from an API
  };

  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    setExpandedModules({
      ...expandedModules,
      [moduleId]: !expandedModules[moduleId]
    });
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

  // Get module type icon
  const getModuleTypeIcon = (type: string) => {
    switch (type) {
      case "service":
        return <Package className="h-4 w-4" />;
      case "component":
        return <Code className="h-4 w-4" />;
      case "utility":
        return <FileCode className="h-4 w-4" />;
      case "model":
        return <GitBranch className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  // Get module type badge
  const getModuleTypeBadge = (type: string) => {
    switch (type) {
      case "service":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 capitalize">{type}</Badge>;
      case "component":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 capitalize">{type}</Badge>;
      case "utility":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 capitalize">{type}</Badge>;
      case "model":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 capitalize">{type}</Badge>;
      default:
        return <Badge variant="outline" className="capitalize">{type}</Badge>;
    }
  };

  // Calculate domain statistics
  const domainNames = Object.keys(domainModules);
  const totalModules = Object.values(domainModules).reduce((sum, modules) => sum + modules.length, 0);
  const totalFiles = Object.values(domainModules).reduce((sum, modules) => 
    sum + modules.reduce((moduleSum, module) => moduleSum + module.files, 0), 0);
  const totalLoc = Object.values(domainModules).reduce((sum, modules) => 
    sum + modules.reduce((moduleSum, module) => moduleSum + module.loc, 0), 0);

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Domain Module Summary
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{domainNames.length}</div>
                <div className="text-xs text-muted-foreground">Domains</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalModules}</div>
                <div className="text-xs text-muted-foreground">Modules</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalFiles}</div>
                <div className="text-xs text-muted-foreground">Files</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalLoc.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Lines of Code</div>
              </div>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="overflow-x-auto">
              <TabsList className="inline-flex w-auto">
                {domainNames.map((domain) => (
                  <TabsTrigger key={domain} value={domain}>
                    {domain}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {domainNames.map((domain) => (
              <TabsContent key={domain} value={domain} className="space-y-4">
                <div className="space-y-4">
                  {domainModules[domain].map((module) => (
                    <div key={module.id} className="rounded-lg border overflow-hidden">
                      <div 
                        className="flex items-center justify-between p-3 bg-muted/40 cursor-pointer"
                        onClick={() => toggleModule(module.id)}
                      >
                        <div className="flex items-center gap-2">
                          {getModuleTypeIcon(module.type)}
                          <h3 className="font-medium">{module.name}</h3>
                          {getModuleTypeBadge(module.type)}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-muted-foreground">
                            {module.files} files, {module.loc.toLocaleString()} LOC
                          </div>
                          {expandedModules[module.id] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      
                      {expandedModules[module.id] && (
                        <div className="p-3 space-y-3">
                          <div className="flex flex-col gap-2">
                            <div className="text-sm font-medium">Business Capabilities:</div>
                            <div className="flex flex-wrap gap-2">
                              {module.capabilities.map((capability, index) => (
                                <Badge key={index} variant="secondary">{capability}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="text-muted-foreground">
                              Last modified: {formatDate(module.lastModified)}
                            </div>
                            <Button variant="ghost" size="sm">
                              <span className="mr-1">View Details</span>
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          
          {!isFullPage && (
            <Button variant="outline" size="sm" className="w-full">
              View All Modules
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
