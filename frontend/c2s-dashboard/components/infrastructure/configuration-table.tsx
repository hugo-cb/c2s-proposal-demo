"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Settings, 
  RefreshCw,
  Search,
  Eye,
  EyeOff,
  Filter,
  Copy,
  FileText,
  ArrowUpDown
} from "lucide-react";

interface ConfigItem {
  id: string;
  key: string;
  value: string;
  type: "env" | "config" | "secret";
  source: string;
  environment: string;
  isSecret: boolean;
}

interface ConfigurationTableProps {
  className?: string;
  isFullPage?: boolean;
}

export function ConfigurationTable({ className, isFullPage = false }: ConfigurationTableProps) {
  // Sample data for configuration and environment variables
  const [configItems, setConfigItems] = useState<ConfigItem[]>([
    {
      id: "c1",
      key: "DATABASE_URL",
      value: "postgresql://user:password@localhost:5432/mydb",
      type: "env",
      source: ".env.production",
      environment: "production",
      isSecret: true
    },
    {
      id: "c2",
      key: "API_KEY",
      value: "sk_test_abcdefghijklmnopqrstuvwxyz",
      type: "secret",
      source: ".env.production",
      environment: "production",
      isSecret: true
    },
    {
      id: "c3",
      key: "PORT",
      value: "3000",
      type: "env",
      source: ".env.production",
      environment: "production",
      isSecret: false
    },
    {
      id: "c4",
      key: "NODE_ENV",
      value: "production",
      type: "env",
      source: ".env.production",
      environment: "production",
      isSecret: false
    },
    {
      id: "c5",
      key: "LOG_LEVEL",
      value: "info",
      type: "config",
      source: "config.json",
      environment: "production",
      isSecret: false
    },
    {
      id: "c6",
      key: "REDIS_URL",
      value: "redis://localhost:6379",
      type: "env",
      source: ".env.production",
      environment: "production",
      isSecret: true
    },
    {
      id: "c7",
      key: "AWS_REGION",
      value: "us-east-1",
      type: "config",
      source: "terraform/variables.tf",
      environment: "production",
      isSecret: false
    },
    {
      id: "c8",
      key: "S3_BUCKET",
      value: "my-app-uploads",
      type: "config",
      source: "terraform/storage.tf",
      environment: "production",
      isSecret: false
    },
    {
      id: "c9",
      key: "JWT_SECRET",
      value: "very-secure-jwt-secret-key-that-should-be-long-and-random",
      type: "secret",
      source: ".env.production",
      environment: "production",
      isSecret: true
    },
    {
      id: "c10",
      key: "DATABASE_URL",
      value: "postgresql://user:password@localhost:5432/mydb_dev",
      type: "env",
      source: ".env.development",
      environment: "development",
      isSecret: true
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showSecrets, setShowSecrets] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [sortField, setSortField] = useState<string>("key");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Refresh configuration data
  const refreshData = () => {
    console.log("Refreshing configuration data...");
    // In a real application, this would fetch updated data from an API
  };

  // Toggle show/hide secrets
  const toggleShowSecrets = () => {
    setShowSecrets(!showSecrets);
  };

  // Copy value to clipboard
  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    console.log("Copied to clipboard:", value);
    // In a real application, this would show a toast notification
  };

  // Handle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort config items
  const filteredAndSortedItems = configItems
    .filter(item => {
      // Filter by search query
      if (searchQuery && !item.key.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !item.value.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.source.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Filter by environment
      if (selectedEnvironment !== "all" && item.environment !== selectedEnvironment) {
        return false;
      }
      
      // Filter by type
      if (selectedType !== "all" && item.type !== selectedType) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by selected field
      const fieldA = a[sortField as keyof ConfigItem];
      const fieldB = b[sortField as keyof ConfigItem];
      
      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDirection === "asc" 
          ? fieldA.localeCompare(fieldB) 
          : fieldB.localeCompare(fieldA);
      }
      
      return 0;
    });

  // Get type badge
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "env":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">ENV</Badge>;
      case "config":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">CONFIG</Badge>;
      case "secret":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">SECRET</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get environment badge
  const getEnvironmentBadge = (environment: string) => {
    switch (environment) {
      case "production":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">PROD</Badge>;
      case "staging":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">STAGING</Badge>;
      case "development":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">DEV</Badge>;
      case "testing":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">TEST</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Mask secret value
  const maskValue = (value: string) => {
    return "•".repeat(Math.min(value.length, 12));
  };

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuration and Environment Variables
            </div>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="w-full md:w-1/3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search configurations..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedEnvironment(selectedEnvironment === "all" ? "production" : "all")}
                className={selectedEnvironment !== "all" ? "bg-blue-50 border-blue-200" : ""}
              >
                <Filter className="h-4 w-4 mr-1" />
                {selectedEnvironment === "all" ? "All Environments" : "Production Only"}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedType(selectedType === "all" ? "secret" : "all")}
                className={selectedType !== "all" ? "bg-red-50 border-red-200" : ""}
              >
                <Filter className="h-4 w-4 mr-1" />
                {selectedType === "all" ? "All Types" : "Secrets Only"}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleShowSecrets}
              >
                {showSecrets ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-1" />
                    Hide Secrets
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-1" />
                    Show Secrets
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th 
                      className="px-4 py-2 text-left font-medium cursor-pointer hover:bg-muted/80"
                      onClick={() => handleSort("key")}
                    >
                      <div className="flex items-center">
                        Key
                        {sortField === "key" && (
                          <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-2 text-left font-medium cursor-pointer hover:bg-muted/80"
                      onClick={() => handleSort("value")}
                    >
                      <div className="flex items-center">
                        Value
                        {sortField === "value" && (
                          <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-2 text-left font-medium cursor-pointer hover:bg-muted/80"
                      onClick={() => handleSort("type")}
                    >
                      <div className="flex items-center">
                        Type
                        {sortField === "type" && (
                          <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-2 text-left font-medium cursor-pointer hover:bg-muted/80"
                      onClick={() => handleSort("environment")}
                    >
                      <div className="flex items-center">
                        Environment
                        {sortField === "environment" && (
                          <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-4 py-2 text-left font-medium cursor-pointer hover:bg-muted/80"
                      onClick={() => handleSort("source")}
                    >
                      <div className="flex items-center">
                        Source
                        {sortField === "source" && (
                          <ArrowUpDown className={`h-4 w-4 ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} />
                        )}
                      </div>
                    </th>
                    <th className="px-4 py-2 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedItems.length > 0 ? (
                    filteredAndSortedItems.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/50">
                        <td className="px-4 py-2 font-medium">{item.key}</td>
                        <td className="px-4 py-2 font-mono text-xs">
                          <div className="flex items-center gap-2">
                            <span className="max-w-[200px] truncate">
                              {item.isSecret && !showSecrets ? maskValue(item.value) : item.value}
                            </span>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0"
                              onClick={() => copyToClipboard(item.value)}
                              title="Copy to clipboard"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          {getTypeBadge(item.type)}
                        </td>
                        <td className="px-4 py-2">
                          {getEnvironmentBadge(item.environment)}
                        </td>
                        <td className="px-4 py-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <FileText className="h-3.5 w-3.5" />
                            <span>{item.source}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 w-7 p-0"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                        No configuration items found matching your filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {!isFullPage && filteredAndSortedItems.length > 10 && (
            <Button variant="outline" size="sm" className="w-full">
              View All Configuration Items
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
