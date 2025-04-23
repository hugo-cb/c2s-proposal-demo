"use client";

import React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Box, 
  Code, 
  ExternalLink, 
  ChevronRight,
  Search
} from "lucide-react";

// Sample data for design patterns
interface DesignPatternExample {
  id: string;
  name: string;
  path: string;
  description: string;
}

interface DesignPatternData {
  id: string;
  name: string;
  category: string;
  count: number;
  description: string;
  benefits: string[];
  examples: DesignPatternExample[];
}

const patternData: DesignPatternData[] = [
  {
    id: "singleton",
    name: "Singleton",
    category: "Creational",
    count: 12,
    description: "Ensures that a class has only one instance and provides a global point of access to it.",
    benefits: [
      "Controlled access to the single instance",
      "Reduced use of global variables",
      "Allows refinement of operations and representation",
      "Supports a variable number of instances"
    ],
    examples: [
      { 
        id: "config-manager", 
        name: "ConfigManager", 
        path: "src/core/config/ConfigManager.ts",
        description: "Application configuration manager that maintains a single instance for the entire system."
      },
      { 
        id: "connection-pool", 
        name: "ConnectionPool", 
        path: "src/infrastructure/database/ConnectionPool.ts",
        description: "Database connection pool that ensures connection reuse."
      }
    ]
  },
  {
    id: "factory-method",
    name: "Factory Method",
    category: "Creational",
    count: 8,
    description: "Defines an interface for creating an object, but lets subclasses decide which class to instantiate.",
    benefits: [
      "Eliminates the need for application-specific code in classes",
      "Provides hooks for subclasses",
      "Connects parallel class hierarchies"
    ],
    examples: [
      { 
        id: "repository-factory", 
        name: "RepositoryFactory", 
        path: "src/infrastructure/factories/RepositoryFactory.ts",
        description: "Factory that creates different types of repositories based on parameters."
      },
      { 
        id: "payment-processor-factory", 
        name: "PaymentProcessorFactory", 
        path: "src/domain/payment/factories/PaymentProcessorFactory.ts",
        description: "Creates specific payment processors for different gateways."
      }
    ]
  },
  {
    id: "strategy",
    name: "Strategy",
    category: "Behavioral",
    count: 15,
    description: "Defines a family of algorithms, encapsulates each one, and makes them interchangeable.",
    benefits: [
      "Alternative to using subclasses",
      "Eliminates conditional statements",
      "Provides different implementations of the same behavior",
      "Allows switching algorithms used within an object at runtime"
    ],
    examples: [
      { 
        id: "notification-strategy", 
        name: "NotificationStrategy", 
        path: "src/application/notifications/strategies/NotificationStrategy.ts",
        description: "Defines different strategies for sending notifications (email, SMS, push)."
      },
      { 
        id: "tax-calculation-strategy", 
        name: "TaxCalculationStrategy", 
        path: "src/domain/billing/strategies/TaxCalculationStrategy.ts",
        description: "Implements different algorithms for tax calculation based on region."
      }
    ]
  },
  {
    id: "observer",
    name: "Observer",
    category: "Behavioral",
    count: 6,
    description: "Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.",
    benefits: [
      "Decoupling between dependent objects",
      "Support for broadcast communication",
      "Dynamic notifications"
    ],
    examples: [
      { 
        id: "event-bus", 
        name: "EventBus", 
        path: "src/infrastructure/events/EventBus.ts",
        description: "Event system that allows components to subscribe and receive notifications."
      },
      { 
        id: "order-status-observer", 
        name: "OrderStatusObserver", 
        path: "src/domain/order/observers/OrderStatusObserver.ts",
        description: "Observes changes in order status and notifies interested systems."
      }
    ]
  },
  {
    id: "repository",
    name: "Repository",
    category: "Architectural",
    count: 24,
    description: "Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects.",
    benefits: [
      "Decouples business logic from data access logic",
      "Centralizes data access logic",
      "Facilitates unit testing by replacing the repository with a mock"
    ],
    examples: [
      { 
        id: "user-repository", 
        name: "UserRepository", 
        path: "src/infrastructure/repositories/UserRepository.ts",
        description: "Repository for user CRUD operations in the database."
      },
      { 
        id: "product-repository", 
        name: "ProductRepository", 
        path: "src/infrastructure/repositories/ProductRepository.ts",
        description: "Manages access and persistence of products in the system."
      }
    ]
  },
  {
    id: "adapter",
    name: "Adapter",
    category: "Structural",
    count: 10,
    description: "Converts the interface of a class into another interface that clients expect. Allows classes to work together that couldn't otherwise due to incompatible interfaces.",
    benefits: [
      "Allows classes with incompatible interfaces to work together",
      "Reuses existing classes with a new interface",
      "Isolates client code from changes in third-party code"
    ],
    examples: [
      { 
        id: "payment-gateway-adapter", 
        name: "PaymentGatewayAdapter", 
        path: "src/infrastructure/adapters/PaymentGatewayAdapter.ts",
        description: "Adapts different payment gateway APIs to a common interface."
      },
      { 
        id: "legacy-system-adapter", 
        name: "LegacySystemAdapter", 
        path: "src/infrastructure/adapters/LegacySystemAdapter.ts",
        description: "Adapts a legacy system to the new application architecture."
      }
    ]
  }
];

interface DesignPatternsProps {
  className?: string;
  isFullPage?: boolean;
}

export function DesignPatterns({ className, isFullPage = false }: DesignPatternsProps) {
  const [activePattern, setActivePattern] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter patterns based on search and selected category
  const filteredPatterns = patternData.filter(pattern => {
    const matchesSearch = pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         pattern.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeTab === "all" || pattern.category.toLowerCase() === activeTab.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  // Get the active pattern
  const selectedPattern = activePattern 
    ? patternData.find(pattern => pattern.id === activePattern) 
    : null;
  
  // Render pattern card
  const renderPatternCard = (pattern: DesignPatternData) => {
    return (
      <div
        key={pattern.id}
        className={`rounded-lg border p-3 cursor-pointer transition-colors ${
          activePattern === pattern.id 
            ? 'border-primary bg-primary/5' 
            : 'hover:bg-muted/50'
        }`}
        onClick={() => setActivePattern(pattern.id)}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{pattern.name}</h3>
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {pattern.count}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{pattern.category}</p>
        <p className="text-xs mt-2 line-clamp-2">{pattern.description}</p>
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2 h-7 w-full justify-between text-xs"
        >
          <span>View details</span>
          <ChevronRight className="h-3 w-3" />
        </Button>
      </div>
    );
  };
  
  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <Box className="h-5 w-5" />
            Detected Design Patterns
          </div>
        </CardTitle>
        {!isFullPage && (
          <Button variant="outline" size="sm" asChild>
            <a href="/architecture/patterns">
              <ExternalLink className="h-4 w-4 mr-2" />
              View All
            </a>
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search patterns..."
              className="w-full rounded-md border border-input pl-8 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category tabs */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="Creational" className="flex-1">Creational</TabsTrigger>
              <TabsTrigger value="Structural" className="flex-1">Structural</TabsTrigger>
              <TabsTrigger value="Behavioral" className="flex-1">Behavioral</TabsTrigger>
              <TabsTrigger value="Architectural" className="flex-1">Architectural</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="grid gap-4 md:grid-cols-2">
            {/* Pattern list */}
            <div className={selectedPattern && isFullPage ? '' : 'md:col-span-2'}>
              {filteredPatterns.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No patterns found for the selected criteria.
                </div>
              ) : (
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPatterns.map(pattern => renderPatternCard(pattern))}
                </div>
              )}
            </div>
            
            {/* Selected pattern details */}
            {selectedPattern && isFullPage && (
              <div className="md:col-span-1">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">{selectedPattern.name}</h2>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {selectedPattern.category}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Description</h3>
                      <p className="text-sm">{selectedPattern.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Benefits</h3>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {selectedPattern.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Found Examples ({selectedPattern.count})</h3>
                      <div className="space-y-2">
                        {selectedPattern.examples.map((example) => (
                          <div key={example.id} className="rounded-md border p-3">
                            <div className="flex items-center gap-2">
                              <Code className="h-4 w-4 text-blue-500" />
                              <h4 className="font-medium text-sm">{example.name}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{example.path}</p>
                            <p className="text-xs mt-2">{example.description}</p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-2 h-6 text-xs"
                            >
                              View code
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Pattern summary */}
          {!isFullPage && (
            <div className="rounded-lg border p-4">
              <h3 className="text-sm font-medium mb-2">Detected Patterns Summary</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{patternData.filter(p => p.category === "Creational").reduce((sum, p) => sum + p.count, 0)}</span>
                  <span className="text-xs text-muted-foreground">Creational Patterns</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{patternData.filter(p => p.category === "Structural").reduce((sum, p) => sum + p.count, 0)}</span>
                  <span className="text-xs text-muted-foreground">Structural Patterns</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{patternData.filter(p => p.category === "Behavioral").reduce((sum, p) => sum + p.count, 0)}</span>
                  <span className="text-xs text-muted-foreground">Behavioral Patterns</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">{patternData.filter(p => p.category === "Architectural").reduce((sum, p) => sum + p.count, 0)}</span>
                  <span className="text-xs text-muted-foreground">Architectural Patterns</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
