"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Filter,
  Layers,
  Box,
  Database,
  ChevronDown,
  ChevronUp,
  Check,
  X
} from "lucide-react";

// Example domains
interface Domain {
  id: string;
  name: string;
  count: number;
}

const domains: Domain[] = [
  { id: "core", name: "Core", count: 42 },
  { id: "auth", name: "Authentication", count: 18 },
  { id: "payment", name: "Payments", count: 24 },
  { id: "user", name: "Users", count: 36 },
  { id: "notification", name: "Notifications", count: 15 },
  { id: "reporting", name: "Reporting", count: 22 },
  { id: "admin", name: "Administration", count: 28 },
  { id: "api", name: "API", count: 31 }
];

// Example layers
interface Layer {
  id: string;
  name: string;
  count: number;
}

const layers: Layer[] = [
  { id: "presentation", name: "Presentation", count: 45 },
  { id: "application", name: "Application", count: 67 },
  { id: "domain", name: "Domain", count: 83 },
  { id: "infrastructure", name: "Infrastructure", count: 56 },
  { id: "persistence", name: "Persistence", count: 34 },
  { id: "integration", name: "Integration", count: 29 }
];

// Component types
interface ComponentType {
  id: string;
  name: string;
  count: number;
}

const componentTypes: ComponentType[] = [
  { id: "service", name: "Services", count: 48 },
  { id: "repository", name: "Repositories", count: 32 },
  { id: "controller", name: "Controllers", count: 41 },
  { id: "entity", name: "Entities", count: 56 },
  { id: "dto", name: "DTOs", count: 38 },
  { id: "factory", name: "Factories", count: 19 },
  { id: "util", name: "Utilities", count: 27 }
];

// Design patterns
interface DesignPattern {
  id: string;
  name: string;
}

const designPatterns: DesignPattern[] = [
  { id: "singleton", name: "Singleton" },
  { id: "factory", name: "Factory Method" },
  { id: "strategy", name: "Strategy" },
  { id: "observer", name: "Observer" },
  { id: "adapter", name: "Adapter" },
  { id: "decorator", name: "Decorator" },
  { id: "repository", name: "Repository" },
  { id: "command", name: "Command" }
];

export function ArchitectureFilter() {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedLayers, setSelectedLayers] = useState<string[]>([]);
  const [selectedComponentTypes, setSelectedComponentTypes] = useState<string[]>([]);
  const [selectedPatterns, setSelectedPatterns] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleDomain = (id: string) => {
    if (selectedDomains.includes(id)) {
      setSelectedDomains(selectedDomains.filter(domainId => domainId !== id));
    } else {
      setSelectedDomains([...selectedDomains, id]);
    }
  };
  
  const toggleLayer = (id: string) => {
    if (selectedLayers.includes(id)) {
      setSelectedLayers(selectedLayers.filter(layerId => layerId !== id));
    } else {
      setSelectedLayers([...selectedLayers, id]);
    }
  };
  
  const toggleComponentType = (id: string) => {
    if (selectedComponentTypes.includes(id)) {
      setSelectedComponentTypes(selectedComponentTypes.filter(typeId => typeId !== id));
    } else {
      setSelectedComponentTypes([...selectedComponentTypes, id]);
    }
  };
  
  const togglePattern = (id: string) => {
    if (selectedPatterns.includes(id)) {
      setSelectedPatterns(selectedPatterns.filter(patternId => patternId !== id));
    } else {
      setSelectedPatterns([...selectedPatterns, id]);
    }
  };
  
  const clearAllFilters = () => {
    setSelectedDomains([]);
    setSelectedLayers([]);
    setSelectedComponentTypes([]);
    setSelectedPatterns([]);
  };
  
  const applyFilters = () => {
    // In a real application, this would trigger a data search with the selected filters
    console.log("Applied filters:", {
      domains: selectedDomains,
      layers: selectedLayers,
      componentTypes: selectedComponentTypes,
      patterns: selectedPatterns
    });
    
    // Collapse the panel after applying filters
    setIsExpanded(false);
  };

  // Calculate the count of active filters
  const activeFilterCount = 
    selectedDomains.length + 
    selectedLayers.length + 
    selectedComponentTypes.length + 
    selectedPatterns.length;

  return (
    <Card className="w-full">
      <CardHeader 
        className="flex flex-row items-center justify-between pb-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <span>Architecture Filters</span>
            {activeFilterCount > 0 && (
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          {isExpanded && (
            <>
              <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); clearAllFilters(); }} className="gap-1">
                <X className="h-4 w-4" />
                Clear
              </Button>
              <Button size="sm" onClick={(e) => { e.stopPropagation(); applyFilters(); }} className="gap-1">
                <Check className="h-4 w-4" />
                Apply
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="space-y-4">
            {/* Domain Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Box className="h-4 w-4" />
                <h3 className="text-sm font-medium">Domains</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {domains.map((domain) => (
                  <div key={domain.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`domain-${domain.id}`} 
                      checked={selectedDomains.includes(domain.id)}
                      onCheckedChange={() => toggleDomain(domain.id)}
                    />
                    <Label 
                      htmlFor={`domain-${domain.id}`}
                      className="text-sm flex items-center justify-between w-full"
                    >
                      <span>{domain.name}</span>
                      <span className="text-xs text-muted-foreground">{domain.count}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Layer Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="h-4 w-4" />
                <h3 className="text-sm font-medium">Layers</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                {layers.map((layer) => (
                  <div key={layer.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`layer-${layer.id}`} 
                      checked={selectedLayers.includes(layer.id)}
                      onCheckedChange={() => toggleLayer(layer.id)}
                    />
                    <Label 
                      htmlFor={`layer-${layer.id}`}
                      className="text-sm flex items-center justify-between w-full"
                    >
                      <span>{layer.name}</span>
                      <span className="text-xs text-muted-foreground">{layer.count}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Component Types Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Database className="h-4 w-4" />
                <h3 className="text-sm font-medium">Component Types</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {componentTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`type-${type.id}`} 
                      checked={selectedComponentTypes.includes(type.id)}
                      onCheckedChange={() => toggleComponentType(type.id)}
                    />
                    <Label 
                      htmlFor={`type-${type.id}`}
                      className="text-sm flex items-center justify-between w-full"
                    >
                      <span>{type.name}</span>
                      <span className="text-xs text-muted-foreground">{type.count}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Design Patterns Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Box className="h-4 w-4" />
                <h3 className="text-sm font-medium">Design Patterns</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {designPatterns.map((pattern) => (
                  <div key={pattern.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`pattern-${pattern.id}`} 
                      checked={selectedPatterns.includes(pattern.id)}
                      onCheckedChange={() => togglePattern(pattern.id)}
                    />
                    <Label 
                      htmlFor={`pattern-${pattern.id}`}
                      className="text-sm"
                    >
                      {pattern.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
