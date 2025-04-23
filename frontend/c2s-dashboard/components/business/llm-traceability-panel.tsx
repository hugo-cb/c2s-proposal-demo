"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  RefreshCw,
  Brain,
  MessageSquare,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  Search,
  FileText,
  Code
} from "lucide-react";

interface TraceabilityInsight {
  id: string;
  type: "gap" | "recommendation" | "explanation";
  title: string;
  description: string;
  confidence: number;
  relatedRequirements: string[];
  relatedCode: string[];
  reasoning: string;
  feedback?: "helpful" | "not_helpful";
}

interface LLMTraceabilityPanelProps {
  className?: string;
  isFullPage?: boolean;
}

export function LLMTraceabilityPanel({ className, isFullPage = false }: LLMTraceabilityPanelProps) {
  // Sample data for LLM-generated insights
  const [insights, setInsights] = useState<TraceabilityInsight[]>([
    {
      id: "i1",
      type: "gap",
      title: "Missing Implementation for User Preferences",
      description: "The 'User Preferences' capability mentioned in business requirements is not fully implemented in the codebase.",
      confidence: 92,
      relatedRequirements: ["REQ-015: User Preferences Management", "REQ-023: User Settings"],
      relatedCode: ["user-service/src/models/user.ts", "profile-service/src/controllers/profile-controller.ts"],
      reasoning: "The business requirements specify that users should be able to customize their experience through preferences, but the current implementation only stores basic preference data without the necessary controllers and UI components to manage them."
    },
    {
      id: "i2",
      type: "recommendation",
      title: "Improve Traceability for Payment Processing",
      description: "Add explicit traceability links between payment processing requirements and implementation.",
      confidence: 87,
      relatedRequirements: ["REQ-004: Payment Gateway Integration", "REQ-012: Payment Processing"],
      relatedCode: ["payment-service/src/services/payment-processor.ts", "checkout-service/src/controllers/checkout-controller.ts"],
      reasoning: "While the payment processing functionality is implemented, there are no explicit links (e.g., comments, documentation) connecting the code to the specific business requirements. Adding these references would improve traceability and make future maintenance easier."
    },
    {
      id: "i3",
      type: "explanation",
      title: "Business Logic Distribution in Order Processing",
      description: "Explanation of how order processing business logic is distributed across multiple services.",
      confidence: 95,
      relatedRequirements: ["REQ-003: Order Processing", "REQ-008: Order Management"],
      relatedCode: ["order-service/src/services/order-service.ts", "cart-service/src/services/cart-service.ts", "inventory-service/src/services/inventory-service.ts"],
      reasoning: "The order processing capability is implemented across multiple services: cart-service handles the shopping cart, order-service manages order creation and status, and inventory-service handles stock updates. This distributed approach follows microservice principles but requires careful coordination to maintain business rule consistency."
    },
    {
      id: "i4",
      type: "gap",
      title: "Incomplete Implementation of Reporting Requirements",
      description: "The reporting capabilities described in business requirements are only partially implemented.",
      confidence: 89,
      relatedRequirements: ["REQ-020: Business Analytics", "REQ-021: Sales Reporting"],
      relatedCode: ["reporting-service/src/services/report-generator.ts"],
      reasoning: "The business requirements specify comprehensive reporting capabilities including customizable dashboards, but the current implementation only provides basic report generation. The advanced analytics and customization features are not yet implemented."
    },
    {
      id: "i5",
      type: "recommendation",
      title: "Consolidate Customer-related Business Logic",
      description: "Consider consolidating customer-related business logic that is currently spread across multiple services.",
      confidence: 78,
      relatedRequirements: ["REQ-002: Customer Management", "REQ-014: Customer Profiles"],
      relatedCode: ["user-service/src/services/user-service.ts", "profile-service/src/services/profile-service.ts", "customer-service/src/services/customer-service.ts"],
      reasoning: "Customer-related business logic is currently distributed across three different services, which may lead to duplication and consistency issues. Consolidating this logic or implementing a clear domain boundary would better align with the business capability of customer management."
    },
    {
      id: "i6",
      type: "explanation",
      title: "Authentication Flow Implementation",
      description: "Explanation of how the authentication flow implements business security requirements.",
      confidence: 94,
      relatedRequirements: ["REQ-001: User Authentication", "REQ-016: Security Requirements"],
      relatedCode: ["auth-service/src/services/auth-service.ts", "auth-service/src/controllers/auth-controller.ts"],
      reasoning: "The authentication implementation follows the business security requirements by implementing multi-factor authentication, password policies, and session management. The auth-service centralizes these concerns and provides a clear API for other services to verify user identity."
    }
  ]);

  const [expandedInsights, setExpandedInsights] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [userQuery, setUserQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Toggle insight expansion
  const toggleInsight = (insightId: string) => {
    setExpandedInsights({
      ...expandedInsights,
      [insightId]: !expandedInsights[insightId]
    });
  };

  // Refresh insights
  const refreshInsights = () => {
    console.log("Refreshing LLM-generated insights...");
    // In a real application, this would fetch updated insights from an API
  };

  // Submit user query
  const submitQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;
    
    setIsGenerating(true);
    console.log("Submitting query:", userQuery);
    
    // Simulate API call delay
    setTimeout(() => {
      // In a real application, this would send the query to an API and get a response
      const newInsight: TraceabilityInsight = {
        id: `i${insights.length + 1}`,
        type: "explanation",
        title: `Explanation for "${userQuery}"`,
        description: `AI-generated explanation based on your query about ${userQuery}.`,
        confidence: 85,
        relatedRequirements: ["REQ-003: Order Processing", "REQ-008: Order Management"],
        relatedCode: ["order-service/src/services/order-service.ts"],
        reasoning: "Based on the codebase analysis, the functionality you asked about is implemented in the order-service module, which handles the business logic for processing orders. The implementation aligns with the business requirements REQ-003 and REQ-008."
      };
      
      setInsights([newInsight, ...insights]);
      setUserQuery("");
      setIsGenerating(false);
      setExpandedInsights({
        ...expandedInsights,
        [newInsight.id]: true
      });
    }, 2000);
  };

  // Provide feedback on insight
  const provideFeedback = (insightId: string, feedback: "helpful" | "not_helpful") => {
    setInsights(insights.map(insight => {
      if (insight.id === insightId) {
        return {
          ...insight,
          feedback
        };
      }
      return insight;
    }));
  };

  // Get insight type badge
  const getInsightTypeBadge = (type: string) => {
    switch (type) {
      case "gap":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Gap</Badge>;
      case "recommendation":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Recommendation</Badge>;
      case "explanation":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Explanation</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get insight type icon
  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case "gap":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "recommendation":
        return <Lightbulb className="h-4 w-4 text-blue-500" />;
      case "explanation":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  // Filter insights based on search query
  const filteredInsights = insights.filter(insight => {
    if (!searchQuery) return true;
    
    return (
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.relatedRequirements.some(req => req.toLowerCase().includes(searchQuery.toLowerCase())) ||
      insight.relatedCode.some(code => code.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Display insights based on full page or card view
  const displayInsights = isFullPage ? filteredInsights : filteredInsights.slice(0, 3);

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              LLM Traceability Insights
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshInsights}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <form onSubmit={submitQuery} className="space-y-2">
            <div className="flex items-center gap-2">
              <Input
                type="text"
                placeholder="Ask about business capability implementation..."
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask
                  </>
                )}
              </Button>
            </div>
          </form>
          
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search insights..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="space-y-4">
            {displayInsights.map((insight) => (
              <div key={insight.id} className="rounded-lg border overflow-hidden">
                <div 
                  className="flex items-center justify-between p-3 bg-muted/40 cursor-pointer"
                  onClick={() => toggleInsight(insight.id)}
                >
                  <div className="flex items-center gap-2">
                    {getInsightTypeIcon(insight.type)}
                    <h3 className="font-medium">{insight.title}</h3>
                    {getInsightTypeBadge(insight.type)}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm">
                      <Badge variant="outline" className="bg-muted">
                        {insight.confidence}% confidence
                      </Badge>
                    </div>
                    {expandedInsights[insight.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
                
                {expandedInsights[insight.id] && (
                  <div className="p-3 space-y-3">
                    <p className="text-sm">{insight.description}</p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Related Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {insight.relatedRequirements.map((req, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            <FileText className="h-3 w-3" />
                            <span>{req}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Related Code:</h4>
                      <div className="flex flex-wrap gap-2">
                        {insight.relatedCode.map((code, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1">
                            <Code className="h-3 w-3" />
                            <span>{code}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">AI Reasoning:</h4>
                      <div className="rounded-md bg-muted p-2 text-sm">
                        {insight.reasoning}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-muted-foreground">
                        Was this insight helpful?
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant={insight.feedback === "helpful" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => provideFeedback(insight.id, "helpful")}
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant={insight.feedback === "not_helpful" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => provideFeedback(insight.id, "not_helpful")}
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {!isFullPage && insights.length > 3 && (
            <Button variant="outline" size="sm" className="w-full">
              View All Insights
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Import AlertCircle component
import { AlertCircle } from "lucide-react";
