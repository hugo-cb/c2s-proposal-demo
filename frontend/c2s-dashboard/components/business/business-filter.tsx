"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BusinessFilterProps {
  className?: string;
}

export function BusinessFilter({ className }: BusinessFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedCapability, setSelectedCapability] = useState("all");

  // Sample data for domains and capabilities
  const domains = [
    { id: "all", name: "All Domains" },
    { id: "sales", name: "Sales" },
    { id: "marketing", name: "Marketing" },
    { id: "finance", name: "Finance" },
    { id: "hr", name: "Human Resources" },
    { id: "operations", name: "Operations" },
    { id: "customer", name: "Customer Service" }
  ];

  const capabilities = [
    { id: "all", name: "All Capabilities" },
    { id: "user-management", name: "User Management" },
    { id: "order-processing", name: "Order Processing" },
    { id: "payment-processing", name: "Payment Processing" },
    { id: "reporting", name: "Reporting & Analytics" },
    { id: "inventory", name: "Inventory Management" },
    { id: "customer-support", name: "Customer Support" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    console.log("Domain:", selectedDomain);
    console.log("Capability:", selectedCapability);
    // In a real application, this would trigger a search with the selected filters
  };

  return (
    <div className={`rounded-lg border p-4 ${className || ''}`}>
      <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="grid gap-2 flex-1">
          <label htmlFor="search" className="text-sm font-medium">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              type="search"
              placeholder="Search business capabilities, entities, or processes..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-2 md:w-[200px]">
          <label htmlFor="domain" className="text-sm font-medium">
            Domain
          </label>
          <Select value={selectedDomain} onValueChange={setSelectedDomain}>
            <SelectTrigger id="domain">
              <SelectValue placeholder="Select domain" />
            </SelectTrigger>
            <SelectContent>
              {domains.map((domain) => (
                <SelectItem key={domain.id} value={domain.id}>
                  {domain.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2 md:w-[200px]">
          <label htmlFor="capability" className="text-sm font-medium">
            Capability
          </label>
          <Select value={selectedCapability} onValueChange={setSelectedCapability}>
            <SelectTrigger id="capability">
              <SelectValue placeholder="Select capability" />
            </SelectTrigger>
            <SelectContent>
              {capabilities.map((capability) => (
                <SelectItem key={capability.id} value={capability.id}>
                  {capability.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="mt-2 md:mt-0">
          Apply Filters
        </Button>
      </form>
    </div>
  );
}
