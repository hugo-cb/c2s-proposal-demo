"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Layers, 
  ExternalLink, 
  Download,
  ZoomIn,
  ZoomOut,
  Info
} from "lucide-react";

// Types for layer map data
interface LayerComponent {
  id: string;
  name: string;
  type: string;
  count: number;
}

interface Layer {
  id: string;
  name: string;
  description: string;
  color: string;
  components: LayerComponent[];
}

// Sample data for layer map
const layersData: Layer[] = [
  {
    id: "presentation",
    name: "Presentation",
    description: "Layer responsible for user interface and data presentation",
    color: "#3b82f6",
    components: [
      { id: "user-controller", name: "UserController", type: "controller", count: 8 },
      { id: "auth-controller", name: "AuthController", type: "controller", count: 6 },
      { id: "payment-controller", name: "PaymentController", type: "controller", count: 5 },
      { id: "order-controller", name: "OrderController", type: "controller", count: 7 },
      { id: "product-controller", name: "ProductController", type: "controller", count: 9 },
      { id: "dashboard-component", name: "DashboardComponent", type: "ui-component", count: 4 },
      { id: "user-profile-component", name: "UserProfileComponent", type: "ui-component", count: 3 }
    ]
  },
  {
    id: "application",
    name: "Application",
    description: "Layer that implements business logic and coordinates operations",
    color: "#10b981",
    components: [
      { id: "user-service", name: "UserService", type: "service", count: 12 },
      { id: "auth-service", name: "AuthService", type: "service", count: 9 },
      { id: "payment-service", name: "PaymentService", type: "service", count: 14 },
      { id: "order-service", name: "OrderService", type: "service", count: 16 },
      { id: "product-service", name: "ProductService", type: "service", count: 11 },
      { id: "notification-service", name: "NotificationService", type: "service", count: 7 },
      { id: "report-service", name: "ReportService", type: "service", count: 8 }
    ]
  },
  {
    id: "domain",
    name: "Domain",
    description: "Layer that contains central business entities and rules",
    color: "#f59e0b",
    components: [
      { id: "user-entity", name: "UserEntity", type: "entity", count: 5 },
      { id: "order-entity", name: "OrderEntity", type: "entity", count: 6 },
      { id: "product-entity", name: "ProductEntity", type: "entity", count: 4 },
      { id: "payment-entity", name: "PaymentEntity", type: "entity", count: 7 },
      { id: "user-value-objects", name: "UserValueObjects", type: "value-object", count: 3 },
      { id: "order-factory", name: "OrderFactory", type: "factory", count: 2 },
      { id: "product-factory", name: "ProductFactory", type: "factory", count: 2 }
    ]
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    description: "Layer that implements persistence and external integrations",
    color: "#8b5cf6",
    components: [
      { id: "user-repository", name: "UserRepository", type: "repository", count: 9 },
      { id: "order-repository", name: "OrderRepository", type: "repository", count: 11 },
      { id: "product-repository", name: "ProductRepository", type: "repository", count: 8 },
      { id: "payment-repository", name: "PaymentRepository", type: "repository", count: 10 },
      { id: "database-config", name: "DatabaseConfig", type: "config", count: 3 },
      { id: "payment-gateway-adapter", name: "PaymentGatewayAdapter", type: "adapter", count: 5 },
      { id: "notification-adapter", name: "NotificationAdapter", type: "adapter", count: 4 }
    ]
  }
];

interface LayerMapVisualizerProps {
  className?: string;
  isFullPage?: boolean;
}

export function LayerMapVisualizer({ className, isFullPage = false }: LayerMapVisualizerProps) {
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  
  // Increases zoom
  const zoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.2, 2));
  };
  
  // Decreases zoom
  const zoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.2, 0.6));
  };
  
  // Finds the selected layer
  const activeLayer = selectedLayer 
    ? layersData.find(layer => layer.id === selectedLayer) 
    : null;
  
  // Exports the layer map as an image
  const handleExport = () => {
    // In a real implementation, this would capture the SVG or Canvas element
    // and convert it to an image for download
    console.log("Exporting layer map...");
  };
  
  // Filter components based on selected layer
  const filteredComponents = selectedLayer && selectedLayer !== "all"
    ? layersData.find(layer => layer.id === selectedLayer)?.components || []
    : layersData.flatMap(layer => layer.components);
  
  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Layer Map
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          {!isFullPage && (
            <Link href="/architecture/layers">
              <Button variant="outline" size="sm" className="gap-1">
                <ExternalLink className="h-4 w-4" />
                Full Screen
              </Button>
            </Link>
          )}
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full md:w-1/2">
              <label className="text-sm font-medium mb-1 block">Select Layer</label>
              <Select value={selectedLayer || "all"} onValueChange={setSelectedLayer}>
                <SelectTrigger>
                  <SelectValue placeholder="All layers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All layers</SelectItem>
                  {layersData.map((layer) => (
                    <SelectItem key={layer.id} value={layer.id}>
                      {layer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={zoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={zoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Layer map visualization */}
          <div 
            className={`border rounded-md overflow-hidden ${isFullPage ? 'h-[600px]' : 'h-[400px]'}`}
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center top' }}
          >
            <div className="p-4 h-full overflow-auto">
              <div className="flex flex-col gap-4">
                {(selectedLayer ? layersData.filter(layer => layer.id === selectedLayer) : layersData).map((layer) => (
                  <div 
                    key={layer.id} 
                    className="rounded-lg border p-4"
                    style={{ borderColor: layer.color }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold">{layer.name}</h3>
                        <p className="text-sm text-muted-foreground">{layer.description}</p>
                      </div>
                      <div 
                        className="rounded-full h-6 w-6 flex items-center justify-center text-white text-xs"
                        style={{ backgroundColor: layer.color }}
                      >
                        {layer.components.length}
                      </div>
                    </div>
                    
                    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                      {layer.components.map((component) => (
                        <div 
                          key={component.id} 
                          className="rounded-md border p-3 hover:bg-muted/50 cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">{component.name}</h4>
                            <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                              {component.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-muted-foreground">Components: {component.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Selected layer details */}
          {activeLayer && (
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">Selected Layer Details: {activeLayer.name}</h3>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Description</p>
                  <p className="text-sm">{activeLayer.description}</p>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Statistics</p>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <div className="rounded-md bg-muted p-2 text-center">
                      <p className="text-lg font-bold">{activeLayer.components.length}</p>
                      <p className="text-xs text-muted-foreground">Components</p>
                    </div>
                    <div className="rounded-md bg-muted p-2 text-center">
                      <p className="text-lg font-bold">
                        {activeLayer.components.reduce((sum, comp) => sum + comp.count, 0)}
                      </p>
                      <p className="text-xs text-muted-foreground">Elements</p>
                    </div>
                    <div className="rounded-md bg-muted p-2 text-center">
                      <p className="text-lg font-bold">
                        {new Set(activeLayer.components.map(comp => comp.type)).size}
                      </p>
                      <p className="text-xs text-muted-foreground">Types</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Component Types</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Array.from(new Set(activeLayer.components.map(comp => comp.type))).map((type) => (
                      <span 
                        key={type} 
                        className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Legend */}
          <div className="rounded-lg border p-4 mt-2">
            <h3 className="text-sm font-medium mb-2">Legend</h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {layersData.map((layer) => (
                <div key={layer.id} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: layer.color }}></div>
                  <span className="text-sm">{layer.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
