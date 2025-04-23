"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw,
  ShieldAlert,
  AlertTriangle,
  Lock,
  Eye,
  EyeOff,
  FileText,
  Info,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface SensitiveDataItem {
  id: string;
  name: string;
  type: "pii" | "gdpr" | "financial" | "health" | "credentials";
  severity: "high" | "medium" | "low";
  locations: {
    module: string;
    file: string;
    lineNumbers: number[];
  }[];
  description: string;
  complianceRisks: string[];
}

interface SensitiveDataHeatmapProps {
  className?: string;
  isFullPage?: boolean;
}

export function SensitiveDataHeatmap({ className, isFullPage = false }: SensitiveDataHeatmapProps) {
  // Sample data for sensitive data
  const [sensitiveData, setSensitiveData] = useState<SensitiveDataItem[]>([
    {
      id: "sd1",
      name: "Customer Personal Information",
      type: "pii",
      severity: "high",
      locations: [
        {
          module: "user-service",
          file: "src/models/user.ts",
          lineNumbers: [45, 46, 47, 48]
        },
        {
          module: "profile-service",
          file: "src/models/profile.ts",
          lineNumbers: [23, 24, 25]
        }
      ],
      description: "Customer names, addresses, phone numbers, and email addresses stored in user profiles",
      complianceRisks: ["GDPR Article 5", "CCPA Section 1798.100"]
    },
    {
      id: "sd2",
      name: "Payment Information",
      type: "financial",
      severity: "high",
      locations: [
        {
          module: "payment-service",
          file: "src/models/payment.ts",
          lineNumbers: [32, 33, 34]
        },
        {
          module: "checkout-service",
          file: "src/services/payment-processor.ts",
          lineNumbers: [78, 79, 80, 81]
        }
      ],
      description: "Credit card numbers, expiration dates, and CVV codes processed during checkout",
      complianceRisks: ["PCI DSS Requirement 3", "GDPR Article 5"]
    },
    {
      id: "sd3",
      name: "User Authentication Credentials",
      type: "credentials",
      severity: "high",
      locations: [
        {
          module: "auth-service",
          file: "src/services/auth-service.ts",
          lineNumbers: [56, 57]
        },
        {
          module: "user-service",
          file: "src/controllers/user-controller.ts",
          lineNumbers: [112, 113]
        }
      ],
      description: "User passwords and authentication tokens",
      complianceRisks: ["NIST 800-63B", "OWASP Top 10 A02:2021"]
    },
    {
      id: "sd4",
      name: "Customer Address Information",
      type: "pii",
      severity: "medium",
      locations: [
        {
          module: "shipping-service",
          file: "src/models/shipping-address.ts",
          lineNumbers: [28, 29, 30, 31]
        }
      ],
      description: "Customer shipping and billing addresses",
      complianceRisks: ["GDPR Article 5", "CCPA Section 1798.100"]
    },
    {
      id: "sd5",
      name: "Order History",
      type: "gdpr",
      severity: "medium",
      locations: [
        {
          module: "order-service",
          file: "src/models/order.ts",
          lineNumbers: [42, 43, 44]
        },
        {
          module: "reporting-service",
          file: "src/services/order-reporting.ts",
          lineNumbers: [87, 88]
        }
      ],
      description: "Customer purchase history and order details",
      complianceRisks: ["GDPR Article 17 (Right to be forgotten)", "CCPA Section 1798.105"]
    },
    {
      id: "sd6",
      name: "Employee Data",
      type: "pii",
      severity: "high",
      locations: [
        {
          module: "hr-service",
          file: "src/models/employee.ts",
          lineNumbers: [35, 36, 37, 38, 39, 40]
        }
      ],
      description: "Employee personal information including SSN, bank details, and home addresses",
      complianceRisks: ["GDPR Article 9", "Employment Laws"]
    },
    {
      id: "sd7",
      name: "Customer Support Conversations",
      type: "gdpr",
      severity: "low",
      locations: [
        {
          module: "support-service",
          file: "src/models/support-ticket.ts",
          lineNumbers: [52, 53]
        },
        {
          module: "chat-service",
          file: "src/services/chat-history.ts",
          lineNumbers: [67, 68, 69]
        }
      ],
      description: "Customer support chat logs and ticket details that may contain personal information",
      complianceRisks: ["GDPR Article 5", "CCPA Section 1798.100"]
    }
  ]);

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [showDetails, setShowDetails] = useState(true);

  // Refresh sensitive data
  const refreshData = () => {
    console.log("Refreshing sensitive data...");
    // In a real application, this would fetch updated data from an API
  };

  // Toggle item expansion
  const toggleItem = (itemId: string) => {
    setExpandedItems({
      ...expandedItems,
      [itemId]: !expandedItems[itemId]
    });
  };

  // Toggle details visibility
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  // Get severity badge
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High Risk</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium Risk</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Low Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get type badge
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "pii":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">PII</Badge>;
      case "gdpr":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">GDPR</Badge>;
      case "financial":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Financial</Badge>;
      case "health":
        return <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">Health</Badge>;
      case "credentials":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Credentials</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pii":
        return <Info className="h-4 w-4 text-purple-500" />;
      case "gdpr":
        return <ShieldAlert className="h-4 w-4 text-green-500" />;
      case "financial":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />;
      case "health":
        return <AlertTriangle className="h-4 w-4 text-cyan-500" />;
      case "credentials":
        return <Lock className="h-4 w-4 text-red-500" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  // Calculate statistics
  const highRiskCount = sensitiveData.filter(item => item.severity === "high").length;
  const mediumRiskCount = sensitiveData.filter(item => item.severity === "medium").length;
  const lowRiskCount = sensitiveData.filter(item => item.severity === "low").length;
  
  const piiCount = sensitiveData.filter(item => item.type === "pii").length;
  const gdprCount = sensitiveData.filter(item => item.type === "gdpr").length;
  const financialCount = sensitiveData.filter(item => item.type === "financial").length;
  const credentialsCount = sensitiveData.filter(item => item.type === "credentials").length;

  // Display items based on full page or card view
  const displayItems = isFullPage ? sensitiveData : sensitiveData.slice(0, 4);

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Sensitive Data Heatmap
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleDetails}>
              {showDetails ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
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
                <div className="text-2xl font-bold text-red-600">{highRiskCount}</div>
                <div className="text-xs text-muted-foreground">High Risk</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600">{mediumRiskCount}</div>
                <div className="text-xs text-muted-foreground">Medium Risk</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{lowRiskCount}</div>
                <div className="text-xs text-muted-foreground">Low Risk</div>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                PII: {piiCount}
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                GDPR: {gdprCount}
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Financial: {financialCount}
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                Credentials: {credentialsCount}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-4">
            {displayItems.map((item) => (
              <div key={item.id} className={`rounded-lg border overflow-hidden ${
                item.severity === "high" ? "border-red-200" : 
                item.severity === "medium" ? "border-amber-200" : 
                "border-blue-200"
              }`}>
                <div 
                  className={`flex items-center justify-between p-3 cursor-pointer ${
                    item.severity === "high" ? "bg-red-50" : 
                    item.severity === "medium" ? "bg-amber-50" : 
                    "bg-blue-50"
                  }`}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="flex items-center gap-2">
                    {getTypeIcon(item.type)}
                    <h3 className="font-medium">{item.name}</h3>
                    {getTypeBadge(item.type)}
                    {getSeverityBadge(item.severity)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">
                      {item.locations.length} location{item.locations.length !== 1 ? 's' : ''}
                    </div>
                    {expandedItems[item.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
                
                {expandedItems[item.id] && (
                  <div className="p-3 space-y-3">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                    
                    {showDetails && (
                      <>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Locations:</h4>
                          <div className="space-y-2">
                            {item.locations.map((location, index) => (
                              <div key={index} className="rounded border p-2 bg-muted/20">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  <div>
                                    <div className="font-medium text-sm">{location.file}</div>
                                    <div className="text-xs text-muted-foreground">
                                      Module: {location.module}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      Lines: {location.lineNumbers.join(', ')}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Compliance Risks:</h4>
                          <div className="flex flex-wrap gap-2">
                            {item.complianceRisks.map((risk, index) => (
                              <Badge key={index} variant="secondary">{risk}</Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {!isFullPage && sensitiveData.length > 4 && (
            <Button variant="outline" size="sm" className="w-full">
              View All Sensitive Data
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
