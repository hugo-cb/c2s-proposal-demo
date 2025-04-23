"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  RefreshCw,
  FilePlus,
  Save,
  Trash2,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit,
  Play,
  Plus,
  FileCode
} from "lucide-react";

interface BusinessExpectation {
  id: string;
  name: string;
  description: string;
  category: string;
  rule: string;
  status: "active" | "draft" | "disabled";
  lastModified: string;
  lastRun?: string;
  results?: {
    passed: boolean;
    details?: string;
  };
}

interface BusinessExpectationEditorProps {
  className?: string;
  isFullPage?: boolean;
}

export function BusinessExpectationEditor({ className, isFullPage = false }: BusinessExpectationEditorProps) {
  // Sample data for business expectations
  const [expectations, setExpectations] = useState<BusinessExpectation[]>([
    {
      id: "e1",
      name: "Order Total Calculation",
      description: "Verify that order totals are calculated correctly including taxes and discounts",
      category: "Order Processing",
      rule: `package business.rules

import future.keywords.in

# Check if order total is calculated correctly
default order_total_valid = false

order_total_valid {
  input.order.total == sum([
    input.order.subtotal,
    input.order.tax,
    -input.order.discount
  ])
}`,
      status: "active",
      lastModified: "2025-04-10T14:30:00Z",
      lastRun: "2025-04-10T15:45:00Z",
      results: {
        passed: true
      }
    },
    {
      id: "e2",
      name: "Customer Discount Eligibility",
      description: "Ensure that customer discounts are applied according to loyalty program rules",
      category: "Customer Management",
      rule: `package business.rules

import future.keywords.in

# Check if customer discount is applied correctly
default discount_valid = false

discount_valid {
  customer := input.customer
  customer.loyalty_tier == "gold"
  input.order.discount >= (input.order.subtotal * 0.1)
}

discount_valid {
  customer := input.customer
  customer.loyalty_tier == "silver"
  input.order.discount >= (input.order.subtotal * 0.05)
}`,
      status: "active",
      lastModified: "2025-04-09T11:20:00Z",
      lastRun: "2025-04-10T15:45:00Z",
      results: {
        passed: false,
        details: "Discount for silver tier customers is not applied correctly"
      }
    },
    {
      id: "e3",
      name: "Inventory Availability Check",
      description: "Verify that orders only include items that are in stock",
      category: "Inventory Management",
      rule: `package business.rules

import future.keywords.in

# Check if all ordered items are in stock
default inventory_available = false

inventory_available {
  all_items_in_stock
}

all_items_in_stock {
  item := input.order.items[_]
  inventory := input.inventory[item.product_id]
  item.quantity <= inventory.available_quantity
}`,
      status: "draft",
      lastModified: "2025-04-08T09:45:00Z"
    },
    {
      id: "e4",
      name: "Payment Method Validation",
      description: "Ensure that payment methods are valid for the order type",
      category: "Payment Processing",
      rule: `package business.rules

import future.keywords.in

# Check if payment method is valid for order type
default payment_method_valid = false

payment_method_valid {
  input.order.type == "standard"
  input.payment.method in ["credit_card", "paypal", "bank_transfer"]
}

payment_method_valid {
  input.order.type == "subscription"
  input.payment.method in ["credit_card", "direct_debit"]
}`,
      status: "active",
      lastModified: "2025-04-07T16:30:00Z",
      lastRun: "2025-04-10T15:45:00Z",
      results: {
        passed: true
      }
    },
    {
      id: "e5",
      name: "Shipping Address Validation",
      description: "Verify that shipping addresses are complete and valid",
      category: "Order Processing",
      rule: `package business.rules

import future.keywords.in

# Check if shipping address is valid
default shipping_address_valid = false

required_fields = ["street", "city", "postal_code", "country"]

shipping_address_valid {
  address := input.order.shipping_address
  
  # Check that all required fields are present and not empty
  all_fields_present(address)
  
  # Additional validation for specific countries
  country_specific_validation(address)
}

all_fields_present(address) {
  field := required_fields[_]
  address[field]
  address[field] != ""
}

country_specific_validation(address) {
  address.country == "US"
  count(address.postal_code) == 5
}

country_specific_validation(address) {
  address.country != "US"
}`,
      status: "disabled",
      lastModified: "2025-04-06T10:15:00Z"
    },
    {
      id: "e6",
      name: "Return Policy Compliance",
      description: "Ensure that returns comply with the company's return policy",
      category: "Returns Management",
      rule: `package business.rules

import future.keywords.in

# Check if return request complies with policy
default return_policy_compliant = false

return_policy_compliant {
  # Check if return is within allowed timeframe
  within_return_period
  
  # Check if return reason is valid
  valid_return_reason
  
  # Check if item is in returnable condition
  returnable_condition
}

within_return_period {
  purchase_date := time.parse_rfc3339(input.order.purchase_date)
  return_date := time.parse_rfc3339(input.return.request_date)
  
  # Calculate days since purchase
  days_since_purchase := (return_date - purchase_date) / (24 * 60 * 60)
  
  # Return must be within 30 days
  days_since_purchase <= 30
}

valid_return_reason {
  input.return.reason in ["defective", "wrong_item", "not_as_described", "changed_mind"]
}

returnable_condition {
  input.return.item_condition in ["new", "unopened", "defective"]
}`,
      status: "draft",
      lastModified: "2025-04-05T13:40:00Z"
    }
  ]);

  const [activeTab, setActiveTab] = useState("Order Processing");
  const [editingExpectation, setEditingExpectation] = useState<BusinessExpectation | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Get all unique categories
  const categories = Array.from(new Set(expectations.map(exp => exp.category)));

  // Refresh expectations
  const refreshExpectations = () => {
    console.log("Refreshing business expectations...");
    // In a real application, this would fetch updated expectations from an API
  };

  // Start editing an expectation
  const startEditing = (expectation: BusinessExpectation) => {
    setEditingExpectation({ ...expectation });
    setIsCreating(false);
  };

  // Start creating a new expectation
  const startCreating = () => {
    setEditingExpectation({
      id: `e${expectations.length + 1}`,
      name: "",
      description: "",
      category: activeTab,
      rule: `package business.rules

import future.keywords.in

# Define your business rule here
default rule_name = false

rule_name {
  # Your rule logic here
}`,
      status: "draft",
      lastModified: new Date().toISOString()
    });
    setIsCreating(true);
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
  const getResultBadge = (expectation: BusinessExpectation) => {
    if (!expectation.results) {
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Not Run</Badge>;
    }
    
    return expectation.results.passed ? (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Passed</Badge>
    ) : (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>
    );
  };

  // Filter expectations based on active tab and search query
  const filteredExpectations = expectations.filter(exp => {
    const matchesCategory = exp.category === activeTab;
    
    if (!searchQuery) return matchesCategory;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      matchesCategory &&
      (exp.name.toLowerCase().includes(searchLower) ||
       exp.description.toLowerCase().includes(searchLower) ||
       exp.rule.toLowerCase().includes(searchLower))
    );
  });

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Business Expectation Editor
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={refreshExpectations}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Input
                type="search"
                placeholder="Search expectations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={startCreating}>
              <Plus className="h-4 w-4 mr-2" />
              New Expectation
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="overflow-x-auto">
              <TabsList className="inline-flex w-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {categories.map((category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                {editingExpectation && editingExpectation.category === category ? (
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
                        placeholder="Describe the business expectation"
                        rows={2}
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
                        placeholder="Define the business rule using Rego"
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
                        <p className="text-muted-foreground">No expectations found in this category.</p>
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
                                <Play className="h-4 w-4" />
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
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
