"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw,
  BarChart,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface DomainCoverage {
  id: string;
  name: string;
  coverage: number;
  previousCoverage: number;
  moduleCount: number;
  implementedCapabilities: number;
  totalCapabilities: number;
}

interface DomainCoverageChartProps {
  className?: string;
  isFullPage?: boolean;
}

export function DomainCoverageChart({ className, isFullPage = false }: DomainCoverageChartProps) {
  // Sample data for domain coverage
  const [domains, setDomains] = useState<DomainCoverage[]>([
    {
      id: "d1",
      name: "Sales",
      coverage: 85,
      previousCoverage: 80,
      moduleCount: 12,
      implementedCapabilities: 17,
      totalCapabilities: 20
    },
    {
      id: "d2",
      name: "Marketing",
      coverage: 75,
      previousCoverage: 70,
      moduleCount: 8,
      implementedCapabilities: 12,
      totalCapabilities: 16
    },
    {
      id: "d3",
      name: "Finance",
      coverage: 90,
      previousCoverage: 85,
      moduleCount: 15,
      implementedCapabilities: 18,
      totalCapabilities: 20
    },
    {
      id: "d4",
      name: "Human Resources",
      coverage: 60,
      previousCoverage: 65,
      moduleCount: 6,
      implementedCapabilities: 9,
      totalCapabilities: 15
    },
    {
      id: "d5",
      name: "Operations",
      coverage: 70,
      previousCoverage: 60,
      moduleCount: 10,
      implementedCapabilities: 14,
      totalCapabilities: 20
    },
    {
      id: "d6",
      name: "Customer Service",
      coverage: 80,
      previousCoverage: 75,
      moduleCount: 9,
      implementedCapabilities: 12,
      totalCapabilities: 15
    },
    {
      id: "d7",
      name: "Product Development",
      coverage: 65,
      previousCoverage: 55,
      moduleCount: 7,
      implementedCapabilities: 13,
      totalCapabilities: 20
    }
  ]);

  const [expandedDetails, setExpandedDetails] = useState(false);

  // Refresh domain coverage data
  const refreshData = () => {
    console.log("Refreshing domain coverage data...");
    // In a real application, this would fetch updated data from an API
  };

  // Toggle expanded details
  const toggleDetails = () => {
    setExpandedDetails(!expandedDetails);
  };

  // Sort domains by coverage
  const sortedDomains = [...domains].sort((a, b) => b.coverage - a.coverage);

  // Calculate overall coverage
  const totalImplementedCapabilities = domains.reduce((sum, domain) => sum + domain.implementedCapabilities, 0);
  const totalCapabilities = domains.reduce((sum, domain) => sum + domain.totalCapabilities, 0);
  const overallCoverage = Math.round((totalImplementedCapabilities / totalCapabilities) * 100);

  // Calculate coverage change
  const previousTotalImplemented = domains.reduce((sum, domain) => {
    const previousImplemented = Math.round((domain.previousCoverage / 100) * domain.totalCapabilities);
    return sum + previousImplemented;
  }, 0);
  const previousOverallCoverage = Math.round((previousTotalImplemented / totalCapabilities) * 100);
  const coverageChange = overallCoverage - previousOverallCoverage;

  // Get coverage class
  const getCoverageClass = (coverage: number) => {
    if (coverage >= 80) return "bg-green-500";
    if (coverage >= 60) return "bg-amber-500";
    return "bg-red-500";
  };

  // Get change icon and class
  const getChangeIcon = (current: number, previous: number) => {
    const change = current - previous;
    if (change > 0) {
      return {
        icon: <ArrowUpRight className="h-4 w-4 text-green-500" />,
        text: `+${change}%`,
        class: "text-green-500"
      };
    } else if (change < 0) {
      return {
        icon: <ArrowDownRight className="h-4 w-4 text-red-500" />,
        text: `${change}%`,
        class: "text-red-500"
      };
    } else {
      return {
        icon: null,
        text: "0%",
        class: "text-gray-500"
      };
    }
  };

  // Display domains based on full page or card view
  const displayDomains = isFullPage ? sortedDomains : sortedDomains.slice(0, 5);

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Domain Coverage
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-muted/20">
            <div className="text-center mb-2">
              <h3 className="text-lg font-semibold">Overall Domain Coverage</h3>
              <div className="text-3xl font-bold mt-1">{overallCoverage}%</div>
              <div className={`text-sm ${getChangeIcon(overallCoverage, previousOverallCoverage).class}`}>
                {getChangeIcon(overallCoverage, previousOverallCoverage).text} from previous analysis
              </div>
            </div>
            
            <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
              <div 
                className={`h-full ${
                  overallCoverage >= 80 ? "bg-green-500" : 
                  overallCoverage >= 60 ? "bg-amber-500" : 
                  "bg-red-500"
                }`} 
                style={{ width: `${overallCoverage}%` }}
              ></div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <div className="text-center">
                <div className="text-xl font-bold">{domains.length}</div>
                <div className="text-xs text-muted-foreground">Domains</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{totalImplementedCapabilities}</div>
                <div className="text-xs text-muted-foreground">Implemented Capabilities</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{totalCapabilities}</div>
                <div className="text-xs text-muted-foreground">Total Capabilities</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Domain Coverage Breakdown</h3>
              <Button variant="ghost" size="sm" onClick={toggleDetails}>
                {expandedDetails ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <div className="space-y-3">
              {displayDomains.map((domain) => (
                <div key={domain.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{domain.name}</Badge>
                      <span className="text-sm font-medium">{domain.coverage}%</span>
                      <span className={`text-xs ${getChangeIcon(domain.coverage, domain.previousCoverage).class}`}>
                        {getChangeIcon(domain.coverage, domain.previousCoverage).text}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {domain.implementedCapabilities}/{domain.totalCapabilities} capabilities
                    </div>
                  </div>
                  
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getCoverageClass(domain.coverage)}`} 
                      style={{ width: `${domain.coverage}%` }}
                    ></div>
                  </div>
                  
                  {expandedDetails && (
                    <div className="text-xs text-muted-foreground pl-2 border-l-2 border-muted ml-2">
                      <div>Modules: {domain.moduleCount}</div>
                      <div>Implemented Capabilities: {domain.implementedCapabilities}</div>
                      <div>Total Capabilities: {domain.totalCapabilities}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {!isFullPage && domains.length > 5 && (
            <Button variant="outline" size="sm" className="w-full">
              View All Domains
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
