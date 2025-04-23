"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  RefreshCw,
  Database,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Filter,
  Download,
  Eye,
  EyeOff,
  ArrowRight
} from "lucide-react";

interface EntityAttribute {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  isRequired?: boolean;
  referencedEntity?: string;
  description?: string;
}

interface Entity {
  id: string;
  name: string;
  description: string;
  domain: string;
  attributes: EntityAttribute[];
  relationships: {
    entityId: string;
    type: "one-to-one" | "one-to-many" | "many-to-many" | "many-to-one";
    description: string;
  }[];
}

interface EntityRelationshipDiagramProps {
  className?: string;
  isFullPage?: boolean;
}

export function EntityRelationshipDiagram({ className, isFullPage = false }: EntityRelationshipDiagramProps) {
  // Sample data for entities
  const [entities, setEntities] = useState<Entity[]>([
    {
      id: "e1",
      name: "Customer",
      description: "Represents a customer who can place orders",
      domain: "Customer Management",
      attributes: [
        { name: "id", type: "UUID", isPrimaryKey: true, isRequired: true, description: "Unique identifier for the customer" },
        { name: "email", type: "String", isRequired: true, description: "Customer's email address, used for login" },
        { name: "firstName", type: "String", isRequired: true, description: "Customer's first name" },
        { name: "lastName", type: "String", isRequired: true, description: "Customer's last name" },
        { name: "phoneNumber", type: "String", description: "Customer's phone number" },
        { name: "createdAt", type: "DateTime", isRequired: true, description: "When the customer account was created" },
        { name: "updatedAt", type: "DateTime", isRequired: true, description: "When the customer account was last updated" }
      ],
      relationships: [
        { entityId: "e2", type: "one-to-many", description: "A customer can have multiple addresses" },
        { entityId: "e3", type: "one-to-many", description: "A customer can place multiple orders" },
        { entityId: "e7", type: "one-to-one", description: "A customer has one loyalty profile" }
      ]
    },
    {
      id: "e2",
      name: "Address",
      description: "Represents a physical address associated with a customer",
      domain: "Customer Management",
      attributes: [
        { name: "id", type: "UUID", isPrimaryKey: true, isRequired: true, description: "Unique identifier for the address" },
        { name: "customerId", type: "UUID", isForeignKey: true, isRequired: true, referencedEntity: "Customer", description: "Reference to the customer who owns this address" },
        { name: "type", type: "Enum", isRequired: true, description: "Type of address (shipping, billing, etc.)" },
        { name: "street", type: "String", isRequired: true, description: "Street address" },
        { name: "city", type: "String", isRequired: true, description: "City" },
        { name: "state", type: "String", isRequired: true, description: "State or province" },
        { name: "postalCode", type: "String", isRequired: true, description: "Postal or ZIP code" },
        { name: "country", type: "String", isRequired: true, description: "Country" },
        { name: "isDefault", type: "Boolean", isRequired: true, description: "Whether this is the customer's default address" }
      ],
      relationships: [
        { entityId: "e1", type: "many-to-one", description: "Many addresses belong to one customer" }
      ]
    },
    {
      id: "e3",
      name: "Order",
      description: "Represents a customer order",
      domain: "Sales",
      attributes: [
        { name: "id", type: "UUID", isPrimaryKey: true, isRequired: true, description: "Unique identifier for the order" },
        { name: "customerId", type: "UUID", isForeignKey: true, isRequired: true, referencedEntity: "Customer", description: "Reference to the customer who placed the order" },
        { name: "orderNumber", type: "String", isRequired: true, description: "Human-readable order number" },
        { name: "status", type: "Enum", isRequired: true, description: "Current status of the order" },
        { name: "subtotal", type: "Decimal", isRequired: true, description: "Order subtotal before tax and shipping" },
        { name: "tax", type: "Decimal", isRequired: true, description: "Tax amount" },
        { name: "shippingCost", type: "Decimal", isRequired: true, description: "Shipping cost" },
        { name: "discount", type: "Decimal", isRequired: true, description: "Discount amount" },
        { name: "total", type: "Decimal", isRequired: true, description: "Total order amount" },
        { name: "shippingAddressId", type: "UUID", isForeignKey: true, isRequired: true, referencedEntity: "Address", description: "Reference to the shipping address" },
        { name: "billingAddressId", type: "UUID", isForeignKey: true, isRequired: true, referencedEntity: "Address", description: "Reference to the billing address" },
        { name: "createdAt", type: "DateTime", isRequired: true, description: "When the order was created" },
        { name: "updatedAt", type: "DateTime", isRequired: true, description: "When the order was last updated" }
      ],
      relationships: [
        { entityId: "e1", type: "many-to-one", description: "Many orders belong to one customer" },
        { entityId: "e4", type: "one-to-many", description: "An order can have multiple order items" },
        { entityId: "e5", type: "one-to-one", description: "An order has one payment" },
        { entityId: "e6", type: "one-to-many", description: "An order can have multiple shipments" }
      ]
    },
    {
      id: "e4",
      name: "OrderItem",
      description: "Represents an item within an order",
      domain: "Sales",
      attributes: [
        { name: "id", type: "UUID", isPrimaryKey: true, isRequired: true, description: "Unique identifier for the order item" },
        { name: "orderId", type: "UUID", isForeignKey: true, isRequired: true, referencedEntity: "Order", description: "Reference to the parent order" },
        { name: "productId", type: "UUID", isForeignKey: true, isRequired: true, referencedEntity: "Product", description: "Reference to the product" },
        { name: "quantity", type: "Integer", isRequired: true, description: "Quantity of the product" },
        { name: "unitPrice", type: "Decimal", isRequired: true, description: "Price per unit at time of purchase" },
        { name: "subtotal", type: "Decimal", isRequired: true, description: "Subtotal for this item (quantity * unitPrice)" },
        { name: "discount", type: "Decimal", isRequired: true, description: "Discount amount for this item" },
        { name: "tax", type: "Decimal", isRequired: true, description: "Tax amount for this item" },
        { name: "total", type: "Decimal", isRequired: true, description: "Total for this item" }
      ],
      relationships: [
        { entityId: "e3", type: "many-to-one", description: "Many order items belong to one order" },
        { entityId: "e9", type: "many-to-one", description: "Many order items reference one product" }
      ]
    },
    {
      id: "e5",
      name: "Payment",
      description: "Represents a payment for an order",
      domain: "Finance",
      attributes: [
        { name: "id", type: "UUID", isPrimaryKey: true, isRequired: true, description: "Unique identifier for the payment" },
        { name: "orderId", type: "UUID", isForeignKey: true, isRequired: true, referencedEntity: "Order", description: "Reference to the order" },
        { name: "amount", type: "Decimal", isRequired: true, description: "Payment amount" },
        { name: "method", type: "Enum", isRequired: true, description: "Payment method (credit card, PayPal, etc.)" },
        { name: "status", type: "Enum", isRequired: true, description: "Payment status" },
        { name: "transactionId", type: "String", description: "External payment gateway transaction ID" },
        { name: "createdAt", type: "DateTime", isRequired: true, description: "When the payment was created" },
        { name: "updatedAt", type: "DateTime", isRequired: true, description: "When the payment was last updated" }
      ],
      relationships: [
        { entityId: "e3", type: "one-to-one", description: "One payment is for one order" }
      ]
    },
    {
      id: "e6",
      name: "Shipment",
      description: "Represents a shipment for an order",
      domain: "Logistics",
      attributes: [
        { name: "id", type: "UUID", isPrimaryKey: true, isRequired: true, description: "Unique identifier for the shipment" },
        { name: "orderId", type: "UUID", isForeignKey: true, isRequired: true, referencedEntity: "Order", description: "Reference to the order" },
        { name: "carrier", type: "String", isRequired: true, description: "Shipping carrier" },
        { name: "trackingNumber", type: "String", description: "Tracking number" },
        { name: "status", type: "Enum", isRequired: true, description: "Shipment status" },
        { name: "shippedAt", type: "DateTime", description: "When the shipment was sent" },
        { name: "deliveredAt", type: "DateTime", description: "When the shipment was delivered" },
        { name: "createdAt", type: "DateTime", isRequired: true, description: "When the shipment record was created" },
        { name: "updatedAt", type: "DateTime", isRequired: true, description: "When the shipment record was last updated" }
      ],
      relationships: [
        { entityId: "e3", type: "many-to-one", description: "Many shipments belong to one order" }
      ]
    },
    {
      id: "e7",
      name: "LoyaltyProfile",
      description: "Represents a customer's loyalty program profile",
      domain: "Customer Management",
      attributes: [
        { name: "id", type: "UUID", isPrimaryKey: true, isRequired: true, description: "Unique identifier for the loyalty profile" },
        { name: "customerId", type: "UUID", isForeignKey: true, isRequired: true, referencedEntity: "Customer", description: "Reference to the customer" },
        { name: "tier", type: "Enum", isRequired: true, description: "Loyalty tier (bronze, silver, gold, etc.)" },
        { name: "points", type: "Integer", isRequired: true, description: "Current loyalty points balance" },
        { name: "lifetimePoints", type: "Integer", isRequired: true, description: "Lifetime loyalty points earned" },
        { name: "createdAt", type: "DateTime", isRequired: true, description: "When the loyalty profile was created" },
        { name: "updatedAt", type: "DateTime", isRequired: true, description: "When the loyalty profile was last updated" }
      ],
      relationships: [
        { entityId: "e1", type: "one-to-one", description: "One loyalty profile belongs to one customer" },
        { entityId: "e8", type: "one-to-many", description: "A loyalty profile has many point transactions" }
      ]
    },
    {
      id: "e8",
      name: "LoyaltyTransaction",
      description: "Represents a transaction in a customer's loyalty points",
      domain: "Customer Management",
      attributes: [
        { name: "id", type: "UUID", isPrimaryKey: true, isRequired: true, description: "Unique identifier for the loyalty transaction" },
        { name: "loyaltyProfileId", type: "UUID", isForeignKey: true, isRequired: true, referencedEntity: "LoyaltyProfile", description: "Reference to the loyalty profile" },
        { name: "orderId", type: "UUID", isForeignKey: true, referencedEntity: "Order", description: "Reference to the related order, if applicable" },
        { name: "type", type: "Enum", isRequired: true, description: "Transaction type (earn, redeem, expire, etc.)" },
        { name: "points", type: "Integer", isRequired: true, description: "Points earned or redeemed" },
        { name: "description", type: "String", description: "Description of the transaction" },
        { name: "createdAt", type: "DateTime", isRequired: true, description: "When the transaction occurred" }
      ],
      relationships: [
        { entityId: "e7", type: "many-to-one", description: "Many loyalty transactions belong to one loyalty profile" },
        { entityId: "e3", type: "many-to-one", description: "Many loyalty transactions can be related to one order" }
      ]
    },
    {
      id: "e9",
      name: "Product",
      description: "Represents a product that can be sold",
      domain: "Catalog",
      attributes: [
        { name: "id", type: "UUID", isPrimaryKey: true, isRequired: true, description: "Unique identifier for the product" },
        { name: "sku", type: "String", isRequired: true, description: "Stock keeping unit, unique product identifier" },
        { name: "name", type: "String", isRequired: true, description: "Product name" },
        { name: "description", type: "Text", description: "Product description" },
        { name: "price", type: "Decimal", isRequired: true, description: "Product price" },
        { name: "cost", type: "Decimal", description: "Product cost" },
        { name: "categoryId", type: "UUID", isForeignKey: true, isRequired: true, referencedEntity: "Category", description: "Reference to the product category" },
        { name: "inventoryQuantity", type: "Integer", isRequired: true, description: "Current inventory quantity" },
        { name: "isActive", type: "Boolean", isRequired: true, description: "Whether the product is active and can be purchased" },
        { name: "createdAt", type: "DateTime", isRequired: true, description: "When the product was created" },
        { name: "updatedAt", type: "DateTime", isRequired: true, description: "When the product was last updated" }
      ],
      relationships: [
        { entityId: "e10", type: "many-to-one", description: "Many products belong to one category" },
        { entityId: "e4", type: "one-to-many", description: "A product can be in multiple order items" }
      ]
    },
    {
      id: "e10",
      name: "Category",
      description: "Represents a product category",
      domain: "Catalog",
      attributes: [
        { name: "id", type: "UUID", isPrimaryKey: true, isRequired: true, description: "Unique identifier for the category" },
        { name: "name", type: "String", isRequired: true, description: "Category name" },
        { name: "description", type: "Text", description: "Category description" },
        { name: "parentId", type: "UUID", isForeignKey: true, referencedEntity: "Category", description: "Reference to the parent category, if any" },
        { name: "isActive", type: "Boolean", isRequired: true, description: "Whether the category is active" },
        { name: "createdAt", type: "DateTime", isRequired: true, description: "When the category was created" },
        { name: "updatedAt", type: "DateTime", isRequired: true, description: "When the category was last updated" }
      ],
      relationships: [
        { entityId: "e10", type: "many-to-one", description: "Many categories can have one parent category" },
        { entityId: "e10", type: "one-to-many", description: "A category can have many subcategories" },
        { entityId: "e9", type: "one-to-many", description: "A category can have many products" }
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState<string>("all");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showFullDiagram, setShowFullDiagram] = useState(false);
  const [showAttributes, setShowAttributes] = useState(true);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLDivElement>(null);

  // Get all unique domains
  const domains = Array.from(new Set(entities.map(entity => entity.domain)));

  // Refresh entities
  const refreshEntities = () => {
    console.log("Refreshing entities...");
    // In a real application, this would fetch updated entities from an API
  };

  // Zoom in
  const zoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 10, 150));
  };

  // Zoom out
  const zoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 10, 50));
  };

  // Toggle full diagram
  const toggleFullDiagram = () => {
    setShowFullDiagram(!showFullDiagram);
  };

  // Toggle attributes visibility
  const toggleAttributes = () => {
    setShowAttributes(!showAttributes);
  };

  // Select entity
  const selectEntity = (entityId: string) => {
    setSelectedEntity(selectedEntity === entityId ? null : entityId);
  };

  // Download diagram
  const downloadDiagram = () => {
    console.log("Downloading diagram...");
    // In a real application, this would generate and download a diagram image
  };

  // Filter entities based on search query and domain filter
  const filteredEntities = entities.filter(entity => {
    // Filter by domain
    if (domainFilter !== "all" && entity.domain !== domainFilter) {
      return false;
    }
    
    // Filter by search query
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      entity.name.toLowerCase().includes(searchLower) ||
      entity.description.toLowerCase().includes(searchLower) ||
      entity.attributes.some(attr => 
        attr.name.toLowerCase().includes(searchLower) ||
        (attr.description && attr.description.toLowerCase().includes(searchLower))
      )
    );
  });

  // Get relationship type badge
  const getRelationshipTypeBadge = (type: string) => {
    switch (type) {
      case "one-to-one":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">1:1</Badge>;
      case "one-to-many":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">1:N</Badge>;
      case "many-to-many":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">N:M</Badge>;
      case "many-to-one":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">N:1</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get attribute badge
  const getAttributeBadge = (attribute: EntityAttribute) => {
    if (attribute.isPrimaryKey) {
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">PK</Badge>;
    } else if (attribute.isForeignKey) {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">FK</Badge>;
    } else if (attribute.isRequired) {
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Required</Badge>;
    }
    return null;
  };

  // Get entity by ID
  const getEntityById = (id: string) => {
    return entities.find(entity => entity.id === id);
  };

  // Calculate statistics
  const totalEntities = entities.length;
  const totalAttributes = entities.reduce((sum, entity) => sum + entity.attributes.length, 0);
  const totalRelationships = entities.reduce((sum, entity) => sum + entity.relationships.length, 0);

  // Display entities based on full page, full diagram, or selected entity
  let displayEntities = filteredEntities;
  
  if (!isFullPage && !showFullDiagram && selectedEntity) {
    // If an entity is selected, show it and its directly related entities
    const selectedEntityObj = getEntityById(selectedEntity);
    if (selectedEntityObj) {
      const relatedEntityIds = selectedEntityObj.relationships.map(rel => rel.entityId);
      displayEntities = filteredEntities.filter(entity => 
        entity.id === selectedEntity || relatedEntityIds.includes(entity.id)
      );
    }
  } else if (!isFullPage && !showFullDiagram && !selectedEntity) {
    // If no entity is selected and not showing full diagram, limit to a few entities
    displayEntities = filteredEntities.slice(0, 3);
  }

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Entity Relationship Diagram
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleAttributes}>
              {showAttributes ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={toggleFullDiagram}>
              {showFullDiagram ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={refreshEntities}>
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
                <div className="text-2xl font-bold">{totalEntities}</div>
                <div className="text-xs text-muted-foreground">Entities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalAttributes}</div>
                <div className="text-xs text-muted-foreground">Attributes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalRelationships}</div>
                <div className="text-xs text-muted-foreground">Relationships</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={zoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm">{zoomLevel}%</span>
              <Button variant="outline" size="sm" onClick={zoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={downloadDiagram}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search entities..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={domainFilter} onValueChange={setDomainFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                  {domains.map((domain) => (
                    <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div 
            ref={canvasRef}
            className="relative border rounded-lg p-4 overflow-auto bg-white"
            style={{ 
              minHeight: "400px",
              maxHeight: isFullPage ? "800px" : "500px",
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: "top left"
            }}
          >
            {displayEntities.length === 0 ? (
              <div className="text-center p-4">
                <p className="text-muted-foreground">No entities found matching your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayEntities.map((entity) => (
                  <div 
                    key={entity.id}
                    className={`border rounded-lg overflow-hidden ${
                      selectedEntity === entity.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => selectEntity(entity.id)}
                  >
                    <div className="bg-muted/40 p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{entity.name}</h3>
                        <Badge variant="outline" className="bg-muted">
                          {entity.domain}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{entity.description}</p>
                    </div>
                    
                    {showAttributes && (
                      <div className="p-3 border-t">
                        <h4 className="text-sm font-medium mb-2">Attributes</h4>
                        <div className="space-y-1">
                          {entity.attributes.map((attr, index) => (
                            <div key={index} className="text-xs flex items-start">
                              <div className="flex-1">
                                <span className="font-medium">{attr.name}</span>
                                <span className="text-muted-foreground ml-1">({attr.type})</span>
                              </div>
                              <div>
                                {getAttributeBadge(attr)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="p-3 border-t">
                      <h4 className="text-sm font-medium mb-2">Relationships</h4>
                      <div className="space-y-2">
                        {entity.relationships.map((rel, index) => {
                          const relatedEntity = getEntityById(rel.entityId);
                          return relatedEntity ? (
                            <div key={index} className="text-xs flex items-center gap-1">
                              <span className="font-medium">{entity.name}</span>
                              <ArrowRight className="h-3 w-3" />
                              <span className="font-medium">{relatedEntity.name}</span>
                              {getRelationshipTypeBadge(rel.type)}
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {!isFullPage && !showFullDiagram && filteredEntities.length > 3 && !selectedEntity && (
            <Button variant="outline" size="sm" className="w-full" onClick={toggleFullDiagram}>
              View Full Diagram
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
