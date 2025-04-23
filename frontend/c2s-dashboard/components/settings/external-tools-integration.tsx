"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Link, 
  Github, 
  GitBranch, 
  GitMerge, 
  Webhook, 
  Trello, 
  Slack, 
  Save,
  Plus,
  Trash2,
  RefreshCw,
  Check,
  X
} from "lucide-react";

interface ExternalToolsIntegrationProps {
  className?: string;
}

interface Integration {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "pending";
  lastSync?: string;
  icon: React.ReactNode;
  config?: Record<string, string>;
}

export function ExternalToolsIntegration({ className }: ExternalToolsIntegrationProps) {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "github",
      name: "GitHub",
      type: "version-control",
      status: "connected",
      lastSync: "2025-04-07T12:30:00Z",
      icon: <Github className="h-5 w-5" />,
      config: {
        organization: "acme-corp",
        repository: "main-project"
      }
    },
    {
      id: "gitlab",
      name: "GitLab",
      type: "version-control",
      status: "disconnected",
      icon: <GitBranch className="h-5 w-5" />
    },
    {
      id: "bitbucket",
      name: "Bitbucket",
      type: "version-control",
      status: "disconnected",
      icon: <GitMerge className="h-5 w-5" />
    },
    {
      id: "jira",
      name: "Jira",
      type: "project-management",
      status: "connected",
      lastSync: "2025-04-07T10:15:00Z",
      icon: <Trello className="h-5 w-5" />,
      config: {
        domain: "acme-corp.atlassian.net",
        project: "MAIN"
      }
    },
    {
      id: "slack",
      name: "Slack",
      type: "communication",
      status: "connected",
      lastSync: "2025-04-07T14:45:00Z",
      icon: <Slack className="h-5 w-5" />,
      config: {
        workspace: "acme-corp",
        channel: "#engineering"
      }
    },
    {
      id: "webhook",
      name: "Custom Webhook",
      type: "notification",
      status: "connected",
      lastSync: "2025-04-06T09:20:00Z",
      icon: <Webhook className="h-5 w-5" />,
      config: {
        url: "https://hooks.example.com/callback",
        events: "accuracy,security"
      }
    }
  ]);

  const [newIntegration, setNewIntegration] = useState({
    name: "",
    type: "",
    url: ""
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleAddIntegration = () => {
    setIsAdding(true);
    // Simulate API call
    setTimeout(() => {
      const newId = `custom-${Date.now()}`;
      setIntegrations([
        ...integrations,
        {
          id: newId,
          name: newIntegration.name,
          type: newIntegration.type,
          status: "pending",
          icon: <Link className="h-5 w-5" />,
          config: {
            url: newIntegration.url
          }
        }
      ]);
      setNewIntegration({
        name: "",
        type: "",
        url: ""
      });
      setIsAdding(false);
      setShowAddForm(false);
    }, 1000);
  };

  const handleRemoveIntegration = (id: string) => {
    setIntegrations(integrations.filter(integration => integration.id !== id));
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations(
      integrations.map(integration => {
        if (integration.id === id) {
          return {
            ...integration,
            status: integration.status === "connected" ? "disconnected" : "connected",
            lastSync: integration.status === "disconnected" ? new Date().toISOString() : integration.lastSync
          };
        }
        return integration;
      })
    );
  };

  const handleSyncIntegration = (id: string) => {
    setIntegrations(
      integrations.map(integration => {
        if (integration.id === id) {
          return {
            ...integration,
            lastSync: new Date().toISOString()
          };
        }
        return integration;
      })
    );
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Connected</Badge>;
      case "disconnected":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Disconnected</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get type badge
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "version-control":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Version Control</Badge>;
      case "project-management":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Project Management</Badge>;
      case "communication":
        return <Badge variant="outline" className="bg-cyan-50 text-cyan-700 border-cyan-200">Communication</Badge>;
      case "notification":
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Notification</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">{type}</Badge>;
    }
  };

  return (
    <div className={`space-y-6 ${className || ''}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">External Tools Integration</CardTitle>
              <CardDescription>
                Connect and manage integrations with external tools and services
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Integration
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {showAddForm && (
            <Card className="border-dashed">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Add New Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="integration-name">Integration Name</Label>
                    <Input
                      id="integration-name"
                      placeholder="e.g., Jenkins, CircleCI"
                      value={newIntegration.name}
                      onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="integration-type">Integration Type</Label>
                    <Input
                      id="integration-type"
                      placeholder="e.g., CI/CD, Analytics"
                      value={newIntegration.type}
                      onChange={(e) => setNewIntegration({ ...newIntegration, type: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="integration-url">Integration URL</Label>
                  <Input
                    id="integration-url"
                    placeholder="https://..."
                    value={newIntegration.url}
                    onChange={(e) => setNewIntegration({ ...newIntegration, url: e.target.value })}
                  />
                </div>
                <Button 
                  onClick={handleAddIntegration} 
                  disabled={isAdding || !newIntegration.name || !newIntegration.type || !newIntegration.url}
                  className="w-full"
                >
                  {isAdding ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Integration
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {integrations.map((integration) => (
              <div key={integration.id} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-muted rounded-md">
                    {integration.icon}
                  </div>
                  <div>
                    <div className="font-medium">{integration.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      {getTypeBadge(integration.type)}
                      {getStatusBadge(integration.status)}
                    </div>
                    {integration.config && (
                      <div className="mt-2 space-y-1">
                        {Object.entries(integration.config).map(([key, value]) => (
                          <div key={key} className="text-xs text-muted-foreground">
                            <span className="font-medium">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground mt-2">
                      Last synced: {formatDate(integration.lastSync)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {integration.status === "connected" && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleSyncIntegration(integration.id)}
                      className="h-8 w-8 p-0"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span className="sr-only">Sync</span>
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleToggleIntegration(integration.id)}
                    className="h-8 w-8 p-0"
                  >
                    {integration.status === "connected" ? (
                      <X className="h-4 w-4 text-red-500" />
                    ) : (
                      <Check className="h-4 w-4 text-green-500" />
                    )}
                    <span className="sr-only">
                      {integration.status === "connected" ? "Disconnect" : "Connect"}
                    </span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleRemoveIntegration(integration.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Default Integration Settings</CardTitle>
          <CardDescription>
            Configure default settings for all integrations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-sync">Automatic Synchronization</Label>
              <p className="text-sm text-muted-foreground">
                Automatically sync data with integrated tools
              </p>
            </div>
            <Switch id="auto-sync" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="bidirectional-sync">Bidirectional Sync</Label>
              <p className="text-sm text-muted-foreground">
                Changes in either system will be reflected in the other
              </p>
            </div>
            <Switch id="bidirectional-sync" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sync-notifications">Sync Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications when synchronization occurs
              </p>
            </div>
            <Switch id="sync-notifications" />
          </div>
        </CardContent>
      </Card>

      <CardFooter className="flex justify-end gap-4 px-0">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </CardFooter>
    </div>
  );
}
