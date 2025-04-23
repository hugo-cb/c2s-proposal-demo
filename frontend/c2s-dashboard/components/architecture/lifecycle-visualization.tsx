"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Activity, 
  Calendar, 
  Clock, 
  History,
  GitBranch,
  GitCommit,
  GitPullRequest
} from "lucide-react";

// Sample data for lifecycle visualization
const lifecycleData = {
  // Component evolution over time
  evolution: [
    { date: "2023-01", components: 45, services: 12, modules: 8 },
    { date: "2023-02", components: 48, services: 14, modules: 8 },
    { date: "2023-03", components: 52, services: 15, modules: 9 },
    { date: "2023-04", components: 55, services: 16, modules: 10 },
    { date: "2023-05", components: 58, services: 17, modules: 10 },
    { date: "2023-06", components: 62, services: 18, modules: 11 },
  ],
  
  // Component stability metrics
  stability: [
    { component: "AuthService", changes: 24, age: "6 months", stability: 0.85 },
    { component: "UserRepository", changes: 18, age: "8 months", stability: 0.92 },
    { component: "PaymentProcessor", changes: 32, age: "4 months", stability: 0.78 },
    { component: "NotificationManager", changes: 15, age: "7 months", stability: 0.89 },
    { component: "ProductCatalog", changes: 28, age: "5 months", stability: 0.82 },
  ],
  
  // Recent architectural changes
  changes: [
    { date: "2023-06-15", type: "Addition", description: "Added new microservice for analytics processing" },
    { date: "2023-06-10", type: "Refactor", description: "Refactored authentication flow to use OAuth 2.0" },
    { date: "2023-06-05", type: "Removal", description: "Removed legacy payment gateway integration" },
    { date: "2023-05-28", type: "Modification", description: "Updated API versioning strategy" },
    { date: "2023-05-20", type: "Addition", description: "Implemented event sourcing for order processing" },
  ]
};

// Time period options
const timePeriods = [
  { value: "1m", label: "Last Month" },
  { value: "3m", label: "Last 3 Months" },
  { value: "6m", label: "Last 6 Months" },
  { value: "1y", label: "Last Year" },
  { value: "all", label: "All Time" }
];

export function LifecycleVisualization() {
  const [timePeriod, setTimePeriod] = useState("6m");
  const [activeTab, setActiveTab] = useState("evolution");
  
  // Function to render evolution chart (simplified for this example)
  const renderEvolutionChart = () => {
    return (
      <div className="h-80 w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Component Growth Over Time</h3>
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              {timePeriods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Placeholder for actual chart - would use a charting library in real implementation */}
        <div className="bg-muted rounded-md h-64 flex items-center justify-center">
          <div className="text-center p-4">
            <BarChart className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Chart visualization would be rendered here using a library like recharts, Chart.js, or D3.js
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Showing data for {timePeriods.find(p => p.value === timePeriod)?.label.toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  // Function to render stability metrics
  const renderStabilityMetrics = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Component Stability Metrics</h3>
          <Button variant="outline" size="sm">
            <History className="h-4 w-4 mr-1" />
            View History
          </Button>
        </div>
        
        <div className="rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-2 text-xs font-medium">Component</th>
                <th className="text-center p-2 text-xs font-medium">Changes</th>
                <th className="text-center p-2 text-xs font-medium">Age</th>
                <th className="text-center p-2 text-xs font-medium">Stability Score</th>
              </tr>
            </thead>
            <tbody>
              {lifecycleData.stability.map((item, index) => (
                <tr key={index} className={index !== lifecycleData.stability.length - 1 ? "border-b" : ""}>
                  <td className="p-2 text-xs">{item.component}</td>
                  <td className="p-2 text-xs text-center">{item.changes}</td>
                  <td className="p-2 text-xs text-center">{item.age}</td>
                  <td className="p-2 text-xs text-center">
                    <div className="flex items-center justify-center">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            item.stability >= 0.9 ? "bg-green-500" : 
                            item.stability >= 0.8 ? "bg-yellow-500" : 
                            "bg-red-500"
                          }`}
                          style={{ width: `${item.stability * 100}%` }}
                        />
                      </div>
                      <span className="ml-2">{(item.stability * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Stability score is calculated based on change frequency, component age, and dependency impact.
        </p>
      </div>
    );
  };
  
  // Function to render recent changes
  const renderRecentChanges = () => {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium mb-2">Recent Architectural Changes</h3>
        
        <div className="space-y-3">
          {lifecycleData.changes.map((change, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-md border">
              <div className="mt-0.5">
                <GitCommit className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    change.type === "Addition" ? "bg-green-100 text-green-800" :
                    change.type === "Removal" ? "bg-red-100 text-red-800" :
                    change.type === "Refactor" ? "bg-blue-100 text-blue-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {change.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{change.date}</span>
                </div>
                <p className="text-sm mt-1">{change.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button variant="outline" size="sm">
            <GitBranch className="h-4 w-4 mr-1" />
            View All Changes
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Architecture Lifecycle Visualization
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              {timePeriods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="evolution" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Evolution</span>
            </TabsTrigger>
            <TabsTrigger value="stability" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Stability</span>
            </TabsTrigger>
            <TabsTrigger value="changes" className="flex items-center gap-1">
              <GitPullRequest className="h-4 w-4" />
              <span>Changes</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="evolution" className="mt-0">
            {renderEvolutionChart()}
          </TabsContent>
          
          <TabsContent value="stability" className="mt-0">
            {renderStabilityMetrics()}
          </TabsContent>
          
          <TabsContent value="changes" className="mt-0">
            {renderRecentChanges()}
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
          <p>
            This visualization tracks the evolution and stability of architectural components over time,
            helping identify trends, potential issues, and areas for improvement.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
