"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
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
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Info
} from "lucide-react";

// C4 model view levels
const c4Levels = [
  { value: "context", label: "Context" },
  { value: "container", label: "Container" },
  { value: "component", label: "Component" },
  { value: "code", label: "Code" }
];

// Sample C4 model images for different levels
const c4Images = {
  "context": "/images/c4-context.png",
  "container": "/images/c4-container.png",
  "component": "/images/c4-component.png",
  "code": "/images/c4-code.png"
};

// Sample C4 model element details
const c4Elements = {
  "system": {
    name: "System",
    description: "Main system",
    type: "System"
  },
  "user": {
    name: "User",
    description: "End user of the system",
    type: "Person"
  },
  "webapp": {
    name: "Web Application",
    description: "Web interface",
    technology: "React, TypeScript",
    type: "Container"
  },
  "api": {
    name: "API",
    description: "REST API",
    technology: "Node.js, Express",
    type: "Container"
  },
  "database": {
    name: "Database",
    description: "Data storage",
    technology: "PostgreSQL",
    type: "Container"
  },
  "user_controller": {
    name: "UserController",
    description: "User controller",
    technology: "TypeScript",
    type: "Component"
  },
  "auth_service": {
    name: "AuthService",
    description: "Authentication service",
    technology: "TypeScript",
    type: "Component"
  }
};

interface C4ModelViewerProps {
  className?: string;
  isFullPage?: boolean;
}

export function C4ModelViewer({ className, isFullPage = false }: C4ModelViewerProps) {
  const [level, setLevel] = useState<string>("context");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedElement, setSelectedElement] = useState<any>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleElementClick = (elementId: string) => {
    const element = c4Elements[elementId as keyof typeof c4Elements];
    if (element) {
      setSelectedElement(element);
      setShowDetails(true);
    }
  };
  
  const handleReset = () => {
    setSelectedElement(null);
    setShowDetails(false);
  };
  
  // Export diagram as PNG
  const handleExport = () => {
    // Create a link to download the current image
    const link = document.createElement('a');
    link.href = c4Images[level as keyof typeof c4Images] || c4Images.context;
    link.download = `c4-model-${level}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            C4 Model Architecture
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!isFullPage && (
            <div className="rounded-lg border p-4 bg-muted/40">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  The C4 model provides a hierarchical way to think about software architecture using Context, Containers, Components, and Code.
                </p>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {c4Levels.map(c4Level => (
                    <SelectItem key={c4Level.value} value={c4Level.value}>
                      {c4Level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <ZoomOut className="h-4 w-4 mr-1" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
              {!isFullPage && (
                <Button variant="outline" size="sm" asChild>
                  <span>
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Full View
                  </span>
                </Button>
              )}
            </div>
          </div>
          
          <div 
            ref={containerRef} 
            className={`c4-container border rounded-md overflow-hidden ${isFullPage ? 'h-[calc(100vh-300px)]' : 'h-[500px]'}`}
          >
            <div className="relative w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
              <div className="text-center p-8">
                <Layers className="h-12 w-12 mx-auto mb-4 text-primary opacity-50" />
                <h3 className="text-lg font-medium mb-2">C4 Model Visualization</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-4">
                  This is a placeholder for the C4 model visualization. In a production environment, this would be an interactive diagram showing the {level} level of the C4 model.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {Object.keys(c4Elements).map(elementId => (
                    <Button 
                      key={elementId}
                      variant="outline" 
                      size="sm"
                      onClick={() => handleElementClick(elementId)}
                      className="text-xs"
                    >
                      {c4Elements[elementId as keyof typeof c4Elements].name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {showDetails && selectedElement && (
            <div className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">{selectedElement.name || 'Element Details'}</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)}>
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                {selectedElement.description && (
                  <div>
                    <span className="text-xs font-medium">Description:</span>
                    <p className="text-sm text-muted-foreground">{selectedElement.description}</p>
                  </div>
                )}
                
                {selectedElement.technology && (
                  <div>
                    <span className="text-xs font-medium">Technology:</span>
                    <p className="text-sm text-muted-foreground">{selectedElement.technology}</p>
                  </div>
                )}
                
                {selectedElement.type && (
                  <div>
                    <span className="text-xs font-medium">Type:</span>
                    <p className="text-sm text-muted-foreground">{selectedElement.type}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
