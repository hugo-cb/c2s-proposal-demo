"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Settings, 
  Save,
  Plus,
  Trash2,
  FileCode,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Edit,
  Eye,
  EyeOff,
  RefreshCw
} from "lucide-react";

interface Expectation {
  id: string;
  name: string;
  description: string;
  category: "security" | "performance" | "reliability" | "compliance" | "configuration";
  definition: string;
  status: "passing" | "failing" | "warning" | "not_tested";
  lastChecked: string;
}

interface ExpectationCategory {
  name: string;
  expectations: Expectation[];
}

interface InfrastructureExpectationEditorProps {
  className?: string;
}

export function InfrastructureExpectationEditor({ className }: InfrastructureExpectationEditorProps) {
  // Sample data for expectations
  const [categories, setCategories] = useState<ExpectationCategory[]>([
    {
      name: "security",
      expectations: [
        {
          id: "s1",
          name: "HTTPS Enforcement",
          description: "All external endpoints must use HTTPS with valid certificates",
          category: "security",
          definition: "# HTTPS Enforcement Check\ndeny[msg] {\n  input.kind == \"Ingress\"\n  not input.spec.tls\n  msg = \"Ingress must have TLS configured\"\n}",
          status: "passing",
          lastChecked: "2025-04-07T16:45:00Z"
        },
        {
          id: "s2",
          name: "No Root Containers",
          description: "Containers should not run as root user",
          category: "security",
          definition: "# No Root Containers Check\ndeny[msg] {\n  input.kind == \"Deployment\"\n  container := input.spec.template.spec.containers[_]\n  not container.securityContext.runAsNonRoot\n  msg = sprintf(\"Container '%s' should set runAsNonRoot: true\", [container.name])\n}",
          status: "failing",
          lastChecked: "2025-04-07T16:45:00Z"
        }
      ]
    },
    {
      name: "performance",
      expectations: [
        {
          id: "p1",
          name: "Resource Limits",
          description: "All containers must have CPU and memory limits defined",
          category: "performance",
          definition: "# Resource Limits Check\ndeny[msg] {\n  input.kind == \"Deployment\"\n  container := input.spec.template.spec.containers[_]\n  not container.resources.limits.cpu\n  msg = sprintf(\"Container '%s' must have CPU limits\", [container.name])\n}",
          status: "warning",
          lastChecked: "2025-04-07T16:45:00Z"
        }
      ]
    },
    {
      name: "reliability",
      expectations: [
        {
          id: "r1",
          name: "Minimum Replicas",
          description: "Production deployments should have at least 2 replicas",
          category: "reliability",
          definition: "# Minimum Replicas Check\ndeny[msg] {\n  input.kind == \"Deployment\"\n  input.metadata.labels.environment == \"production\"\n  input.spec.replicas < 2\n  msg = \"Production deployments should have at least 2 replicas\"\n}",
          status: "passing",
          lastChecked: "2025-04-07T16:45:00Z"
        }
      ]
    },
    {
      name: "compliance",
      expectations: [
        {
          id: "c1",
          name: "Required Labels",
          description: "All resources must have required labels (owner, cost-center, environment)",
          category: "compliance",
          definition: "# Required Labels Check\nrequired_labels = [\"owner\", \"cost-center\", \"environment\"]\n\ndeny[msg] {\n  input.kind == \"Deployment\"\n  label := required_labels[_]\n  not input.metadata.labels[label]\n  msg = sprintf(\"Missing required label '%s'\", [label])\n}",
          status: "failing",
          lastChecked: "2025-04-07T16:45:00Z"
        }
      ]
    },
    {
      name: "configuration",
      expectations: [
        {
          id: "cf1",
          name: "Environment Variables",
          description: "Sensitive environment variables should use secrets, not direct values",
          category: "configuration",
          definition: "# Sensitive Env Vars Check\nsensitive_vars = [\"API_KEY\", \"PASSWORD\", \"SECRET\", \"TOKEN\", \"CREDENTIAL\"]\n\ndeny[msg] {\n  input.kind == \"Deployment\"\n  container := input.spec.template.spec.containers[_]\n  env := container.env[_]\n  contains(upper(env.name), sensitive_vars[_])\n  env.value\n  msg = sprintf(\"Container '%s' has sensitive environment variable '%s' with direct value\", [container.name, env.name])\n}",
          status: "passing",
          lastChecked: "2025-04-07T16:45:00Z"
        }
      ]
    }
  ]);

  const [activeTab, setActiveTab] = useState("security");
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  const [newExpectation, setNewExpectation] = useState<Partial<Expectation>>({
    name: "",
    description: "",
    category: "security",
    definition: "",
    status: "not_tested"
  });
  const [showNewExpectationForm, setShowNewExpectationForm] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passing":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "failing":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "not_tested":
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passing":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Passing</Badge>;
      case "warning":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Warning</Badge>;
      case "failing":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failing</Badge>;
      case "not_tested":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Not Tested</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Toggle edit mode for an expectation
  const toggleEditMode = (id: string) => {
    setEditMode({
      ...editMode,
      [id]: !editMode[id]
    });
  };

  // Run expectation tests
  const runTests = () => {
    console.log("Running infrastructure expectation tests...");
  };

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Infrastructure Expectations
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={runTests}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Run Tests
            </Button>
            <Button variant="default" size="sm" onClick={() => setShowNewExpectationForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Expectation
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="reliability">Reliability</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </TabsList>
          
          {categories.map((category) => (
            <TabsContent key={category.name} value={category.name} className="space-y-4">
              {category.expectations.map((expectation) => (
                <div key={expectation.id} className="border rounded-lg overflow-hidden">
                  <div className="p-4 bg-muted/20">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(expectation.status)}
                          <h3 className="font-medium">{expectation.name}</h3>
                          {getStatusBadge(expectation.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{expectation.description}</p>
                        <div className="text-xs text-muted-foreground mt-2">
                          Last checked: {formatDate(expectation.lastChecked)}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleEditMode(expectation.id)}
                        >
                          {editMode[expectation.id] ? (
                            <Eye className="h-4 w-4" />
                          ) : (
                            <Edit className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {!editMode[expectation.id] && (
                    <div className="p-4 border-t bg-muted/10">
                      <div className="flex items-center gap-2 mb-2">
                        <FileCode className="h-4 w-4" />
                        <h4 className="text-sm font-medium">Rego Policy Definition</h4>
                      </div>
                      <pre className="text-xs overflow-x-auto p-2 bg-muted rounded-md">
                        {expectation.definition}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
