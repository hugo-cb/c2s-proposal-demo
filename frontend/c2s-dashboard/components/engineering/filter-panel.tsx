"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Filter,
  Code,
  FolderTree,
  AlertTriangle,
  Languages,
  Check,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// Example languages
interface Language {
  id: string;
  name: string;
  count: number;
}

const languages: Language[] = [
  { id: "js", name: "JavaScript", count: 124 },
  { id: "ts", name: "TypeScript", count: 89 },
  { id: "py", name: "Python", count: 56 },
  { id: "java", name: "Java", count: 42 },
  { id: "go", name: "Go", count: 18 },
  { id: "rb", name: "Ruby", count: 15 },
  { id: "php", name: "PHP", count: 12 },
  { id: "cs", name: "C#", count: 8 }
];

// Example directories
interface Directory {
  id: string;
  name: string;
  count: number;
}

const directories: Directory[] = [
  { id: "src", name: "src", count: 156 },
  { id: "src/components", name: "src/components", count: 78 },
  { id: "src/utils", name: "src/utils", count: 32 },
  { id: "src/pages", name: "src/pages", count: 24 },
  { id: "src/api", name: "src/api", count: 18 },
  { id: "src/hooks", name: "src/hooks", count: 14 },
  { id: "src/contexts", name: "src/contexts", count: 8 },
  { id: "src/styles", name: "src/styles", count: 6 }
];

// Example severity levels
interface SeverityLevel {
  id: string;
  name: string;
  count: number;
}

const severityLevels: SeverityLevel[] = [
  { id: "critical", name: "Critical", count: 12 },
  { id: "high", name: "High", count: 34 },
  { id: "medium", name: "Medium", count: 87 },
  { id: "low", name: "Low", count: 124 },
  { id: "info", name: "Info", count: 56 }
];

// Example metric types
interface MetricType {
  id: string;
  name: string;
}

const metricTypes: MetricType[] = [
  { id: "complexity", name: "Complexity" },
  { id: "code_smells", name: "Code Smells" },
  { id: "bugs", name: "Bugs" },
  { id: "coverage", name: "Test Coverage" },
  { id: "duplication", name: "Duplication" }
];

export function FilterPanel() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedDirectories, setSelectedDirectories] = useState<string[]>([]);
  const [selectedSeverities, setSelectedSeverities] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [complexityRange, setComplexityRange] = useState<number[]>([0, 10]);
  const [coverageRange, setCoverageRange] = useState<number[]>([0, 100]);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleLanguage = (id: string) => {
    if (selectedLanguages.includes(id)) {
      setSelectedLanguages(selectedLanguages.filter(langId => langId !== id));
    } else {
      setSelectedLanguages([...selectedLanguages, id]);
    }
  };
  
  const toggleDirectory = (id: string) => {
    if (selectedDirectories.includes(id)) {
      setSelectedDirectories(selectedDirectories.filter(dirId => dirId !== id));
    } else {
      setSelectedDirectories([...selectedDirectories, id]);
    }
  };
  
  const toggleSeverity = (id: string) => {
    if (selectedSeverities.includes(id)) {
      setSelectedSeverities(selectedSeverities.filter(sevId => sevId !== id));
    } else {
      setSelectedSeverities([...selectedSeverities, id]);
    }
  };
  
  const toggleMetric = (id: string) => {
    if (selectedMetrics.includes(id)) {
      setSelectedMetrics(selectedMetrics.filter(metricId => metricId !== id));
    } else {
      setSelectedMetrics([...selectedMetrics, id]);
    }
  };
  
  const clearAllFilters = () => {
    setSelectedLanguages([]);
    setSelectedDirectories([]);
    setSelectedSeverities([]);
    setSelectedMetrics([]);
    setComplexityRange([0, 10]);
    setCoverageRange([0, 100]);
  };
  
  const applyFilters = () => {
    // In a real application, this would trigger a data fetch with the selected filters
    console.log("Applied filters:", {
      languages: selectedLanguages,
      directories: selectedDirectories,
      severities: selectedSeverities,
      metrics: selectedMetrics,
      complexityRange,
      coverageRange
    });
    
    // Collapse the panel after applying filters
    setIsExpanded(false);
  };

  // Calculate active filter count
  const activeFilterCount = 
    selectedLanguages.length + 
    selectedDirectories.length + 
    selectedSeverities.length + 
    selectedMetrics.length + 
    ((complexityRange[0] > 0 || complexityRange[1] < 10) ? 1 : 0) + 
    ((coverageRange[0] > 0 || coverageRange[1] < 100) ? 1 : 0);

  return (
    <Card className="w-full">
      <CardHeader 
        className="flex flex-row items-center justify-between pb-2 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <span>Filter Panel</span>
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
            {/* Languages Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Languages className="h-4 w-4" />
                <h3 className="text-sm font-medium">Languages</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                {languages.map((language) => (
                  <div key={language.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`lang-${language.id}`} 
                      checked={selectedLanguages.includes(language.id)}
                      onCheckedChange={() => toggleLanguage(language.id)}
                    />
                    <Label 
                      htmlFor={`lang-${language.id}`}
                      className="text-sm flex items-center justify-between w-full"
                    >
                      <span>{language.name}</span>
                      <span className="text-xs text-muted-foreground">{language.count}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Directories Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FolderTree className="h-4 w-4" />
                <h3 className="text-sm font-medium">Directories</h3>
              </div>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {directories.map((directory) => (
                  <div key={directory.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`dir-${directory.id}`} 
                      checked={selectedDirectories.includes(directory.id)}
                      onCheckedChange={() => toggleDirectory(directory.id)}
                    />
                    <Label 
                      htmlFor={`dir-${directory.id}`}
                      className="text-sm flex items-center justify-between w-full"
                    >
                      <span>{directory.name}</span>
                      <span className="text-xs text-muted-foreground">{directory.count}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Severity Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <h3 className="text-sm font-medium">Severity</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
                {severityLevels.map((severity) => (
                  <div key={severity.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`sev-${severity.id}`} 
                      checked={selectedSeverities.includes(severity.id)}
                      onCheckedChange={() => toggleSeverity(severity.id)}
                    />
                    <Label 
                      htmlFor={`sev-${severity.id}`}
                      className="text-sm flex items-center justify-between w-full"
                    >
                      <span>{severity.name}</span>
                      <span className="text-xs text-muted-foreground">{severity.count}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Metric Types Filter */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Code className="h-4 w-4" />
                <h3 className="text-sm font-medium">Metric Types</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
                {metricTypes.map((metric) => (
                  <div key={metric.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`metric-${metric.id}`} 
                      checked={selectedMetrics.includes(metric.id)}
                      onCheckedChange={() => toggleMetric(metric.id)}
                    />
                    <Label 
                      htmlFor={`metric-${metric.id}`}
                      className="text-sm"
                    >
                      {metric.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Complexity Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <h3 className="text-sm font-medium">Complexity Range</h3>
                </div>
                <span className="text-xs text-muted-foreground">
                  {complexityRange[0]} - {complexityRange[1]}
                </span>
              </div>
              <Slider
                defaultValue={complexityRange}
                min={0}
                max={10}
                step={1}
                onValueChange={setComplexityRange}
                className="mb-4"
              />
            </div>
            
            {/* Coverage Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <h3 className="text-sm font-medium">Coverage Range (%)</h3>
                </div>
                <span className="text-xs text-muted-foreground">
                  {coverageRange[0]}% - {coverageRange[1]}%
                </span>
              </div>
              <Slider
                defaultValue={coverageRange}
                min={0}
                max={100}
                step={5}
                onValueChange={setCoverageRange}
              />
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
