"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Sample environment options
const environments = [
  { value: "all", label: "All Environments" },
  { value: "production", label: "Production" },
  { value: "staging", label: "Staging" },
  { value: "development", label: "Development" },
  { value: "testing", label: "Testing" }
];

// Sample artifact types
const artifactTypes = [
  { value: "all", label: "All Artifacts" },
  { value: "docker", label: "Docker" },
  { value: "kubernetes", label: "Kubernetes" },
  { value: "terraform", label: "Terraform" },
  { value: "cloudformation", label: "CloudFormation" },
  { value: "ansible", label: "Ansible" },
  { value: "jenkins", label: "Jenkins" },
  { value: "github-actions", label: "GitHub Actions" }
];

export function InfrastructureFilter() {
  const [environment, setEnvironment] = useState("all");
  const [artifactType, setArtifactType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching with:", { environment, artifactType, searchQuery });
    // In a real application, this would trigger a search or filter operation
  };

  return (
    <div className="rounded-lg border p-4">
      <form onSubmit={handleSearch} className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="w-full md:w-1/4">
          <label className="text-sm font-medium mb-1 block">Environment</label>
          <Select value={environment} onValueChange={setEnvironment}>
            <SelectTrigger>
              <SelectValue placeholder="Select environment" />
            </SelectTrigger>
            <SelectContent>
              {environments.map((env) => (
                <SelectItem key={env.value} value={env.value}>
                  {env.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/4">
          <label className="text-sm font-medium mb-1 block">Artifact Type</label>
          <Select value={artifactType} onValueChange={setArtifactType}>
            <SelectTrigger>
              <SelectValue placeholder="Select artifact type" />
            </SelectTrigger>
            <SelectContent>
              {artifactTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/3">
          <label className="text-sm font-medium mb-1 block">Search</label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search artifacts, configs, or issues..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Button type="submit" className="mt-2 md:mt-0">
          Apply Filters
        </Button>
      </form>
    </div>
  );
}
