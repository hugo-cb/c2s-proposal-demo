"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Save,
  AlertTriangle,
  Bell,
  Gauge,
  Shield,
  Code,
  Layers,
  Server,
  Briefcase,
  Plus,
  Trash2,
  Settings
} from "lucide-react";

interface AlertsConfigurationProps {
  className?: string;
}

interface AlertThreshold {
  id: string;
  name: string;
  perspective: "engineering" | "architecture" | "infrastructure" | "business" | "all";
  metric: string;
  operator: "less_than" | "greater_than" | "equal_to";
  value: number;
  severity: "info" | "warning" | "critical";
  enabled: boolean;
}

export function AlertsConfiguration({ className }: AlertsConfigurationProps) {
  const [alertThresholds, setAlertThresholds] = useState<AlertThreshold[]>([
    {
      id: "at1",
      name: "Low Code Quality",
      perspective: "engineering",
      metric: "code_quality_score",
      operator: "less_than",
      value: 70,
      severity: "warning",
      enabled: true
    },
    {
      id: "at2",
      name: "Critical Test Coverage",
      perspective: "engineering",
      metric: "test_coverage",
      operator: "less_than",
      value: 50,
      severity: "critical",
      enabled: true
    },
    {
      id: "at3",
      name: "Architecture Compliance",
      perspective: "architecture",
      metric: "architecture_compliance",
      operator: "less_than",
      value: 80,
      severity: "warning",
      enabled: true
    },
    {
      id: "at4",
      name: "Security Vulnerability",
      perspective: "infrastructure",
      metric: "security_score",
      operator: "less_than",
      value: 90,
      severity: "critical",
      enabled: true
    },
    {
      id: "at5",
      name: "Business Capability Coverage",
      perspective: "business",
      metric: "capability_coverage",
      operator: "less_than",
      value: 75,
      severity: "warning",
      enabled: true
    }
  ]);

  const [newThreshold, setNewThreshold] = useState<AlertThreshold>({
    id: "",
    name: "",
    perspective: "all",
    metric: "",
    operator: "less_than",
    value: 80,
    severity: "warning",
    enabled: true
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    alertsEnabled: true,
    emailNotifications: true,
    inAppNotifications: true,
    pushNotifications: false,
    autoResolve: true,
    alertDigest: "daily",
    snoozeTime: 24
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const handleAddThreshold = () => {
    const newId = `at${Date.now()}`;
    setAlertThresholds([
      ...alertThresholds,
      {
        ...newThreshold,
        id: newId
      }
    ]);
    setNewThreshold({
      id: "",
      name: "",
      perspective: "all",
      metric: "",
      operator: "less_than",
      value: 80,
      severity: "warning",
      enabled: true
    });
    setShowAddForm(false);
  };

  const handleRemoveThreshold = (id: string) => {
    setAlertThresholds(alertThresholds.filter(threshold => threshold.id !== id));
  };

  const handleToggleThreshold = (id: string) => {
    setAlertThresholds(
      alertThresholds.map(threshold => {
        if (threshold.id === id) {
          return {
            ...threshold,
            enabled: !threshold.enabled
          };
        }
        return threshold;
      })
    );
  };

  // Get perspective icon
  const getPerspectiveIcon = (perspective: string) => {
    switch (perspective) {
      case "engineering":
        return <Code className="h-4 w-4 text-purple-500" />;
      case "architecture":
        return <Layers className="h-4 w-4 text-blue-500" />;
      case "infrastructure":
        return <Server className="h-4 w-4 text-green-500" />;
      case "business":
        return <Briefcase className="h-4 w-4 text-amber-500" />;
      default:
        return <Settings className="h-4 w-4 text-gray-500" />;
    }
  };

  // Get severity badge
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "info":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Info</Badge>;
      case "warning":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Warning</Badge>;
      case "critical":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get operator text
  const getOperatorText = (operator: string) => {
    switch (operator) {
      case "less_than":
        return "is less than";
      case "greater_than":
        return "is greater than";
      case "equal_to":
        return "is equal to";
      default:
        return "is";
    }
  };

  // Get metric display name
  const getMetricDisplayName = (metric: string) => {
    return metric.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className={`space-y-6 ${className || ''}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Alert Thresholds</CardTitle>
              <CardDescription>
                Configure thresholds for when alerts should be triggered
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? "Cancel" : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Threshold
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {showAddForm && (
            <Card className="border-dashed">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Add New Alert Threshold</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="threshold-name">Alert Name</Label>
                    <Input
                      id="threshold-name"
                      placeholder="e.g., Low Test Coverage"
                      value={newThreshold.name}
                      onChange={(e) => setNewThreshold({ ...newThreshold, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="threshold-perspective">Perspective</Label>
                    <Select
                      value={newThreshold.perspective}
                      onValueChange={(value: any) => setNewThreshold({ ...newThreshold, perspective: value })}
                    >
                      <SelectTrigger id="threshold-perspective">
                        <SelectValue placeholder="Select perspective" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Perspectives</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="architecture">Architecture</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="threshold-metric">Metric</Label>
                    <Input
                      id="threshold-metric"
                      placeholder="e.g., test_coverage"
                      value={newThreshold.metric}
                      onChange={(e) => setNewThreshold({ ...newThreshold, metric: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="threshold-severity">Severity</Label>
                    <Select
                      value={newThreshold.severity}
                      onValueChange={(value: any) => setNewThreshold({ ...newThreshold, severity: value })}
                    >
                      <SelectTrigger id="threshold-severity">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="threshold-operator">Operator</Label>
                    <Select
                      value={newThreshold.operator}
                      onValueChange={(value: any) => setNewThreshold({ ...newThreshold, operator: value })}
                    >
                      <SelectTrigger id="threshold-operator">
                        <SelectValue placeholder="Select operator" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="less_than">Less Than</SelectItem>
                        <SelectItem value="greater_than">Greater Than</SelectItem>
                        <SelectItem value="equal_to">Equal To</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="threshold-value">Threshold Value</Label>
                    <div className="flex items-center gap-2">
                      <Slider
                        id="threshold-value"
                        min={0}
                        max={100}
                        step={1}
                        value={[newThreshold.value]}
                        onValueChange={(value) => setNewThreshold({ ...newThreshold, value: value[0] })}
                        className="flex-1"
                      />
                      <span className="w-8 text-center">{newThreshold.value}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleAddThreshold} 
                  disabled={!newThreshold.name || !newThreshold.metric}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Threshold
                </Button>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {alertThresholds.length === 0 ? (
              <div className="text-center p-4 border rounded-lg bg-muted/40">
                <p className="text-muted-foreground">No alert thresholds configured.</p>
              </div>
            ) : (
              alertThresholds.map((threshold) => (
                <div 
                  key={threshold.id} 
                  className={`flex items-start justify-between p-4 border rounded-lg ${
                    !threshold.enabled ? "bg-muted/30" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-muted rounded-md">
                      {getPerspectiveIcon(threshold.perspective)}
                    </div>
                    <div>
                      <div className="font-medium">{threshold.name}</div>
                      <div className="flex items-center gap-2 mt-1">
                        {getSeverityBadge(threshold.severity)}
                        <span className="text-sm text-muted-foreground">
                          {threshold.perspective === "all" ? "All Perspectives" : threshold.perspective.charAt(0).toUpperCase() + threshold.perspective.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        When <span className="font-medium">{getMetricDisplayName(threshold.metric)}</span> {getOperatorText(threshold.operator)} <span className="font-medium">{threshold.value}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id={threshold.id}
                      checked={threshold.enabled}
                      onCheckedChange={() => handleToggleThreshold(threshold.id)}
                      className="data-[state=checked]:bg-green-500"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveThreshold(threshold.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Alert Settings</CardTitle>
          <CardDescription>
            Configure general settings for alerts and notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="alerts-enabled">Enable Alerts</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Master toggle for all alerts and notifications
                </p>
              </div>
              <Switch
                id="alerts-enabled"
                checked={alertSettings.alertsEnabled}
                onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, alertsEnabled: checked })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alert notifications via email
                </p>
              </div>
              <Switch
                id="email-notifications"
                checked={alertSettings.emailNotifications}
                onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, emailNotifications: checked })}
                disabled={!alertSettings.alertsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alert notifications within the application
                </p>
              </div>
              <Switch
                id="in-app-notifications"
                checked={alertSettings.inAppNotifications}
                onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, inAppNotifications: checked })}
                disabled={!alertSettings.alertsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alert notifications on your mobile device
                </p>
              </div>
              <Switch
                id="push-notifications"
                checked={alertSettings.pushNotifications}
                onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, pushNotifications: checked })}
                disabled={!alertSettings.alertsEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-resolve">Auto-Resolve Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically resolve alerts when conditions are no longer met
                </p>
              </div>
              <Switch
                id="auto-resolve"
                checked={alertSettings.autoResolve}
                onCheckedChange={(checked) => setAlertSettings({ ...alertSettings, autoResolve: checked })}
                disabled={!alertSettings.alertsEnabled}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="alert-digest">Alert Digest Frequency</Label>
              <Select
                value={alertSettings.alertDigest}
                onValueChange={(value) => setAlertSettings({ ...alertSettings, alertDigest: value })}
                disabled={!alertSettings.alertsEnabled}
              >
                <SelectTrigger id="alert-digest">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Hourly</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="never">Never (Real-time only)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="snooze-time">Default Snooze Time</Label>
                <span className="text-sm">{alertSettings.snoozeTime} hours</span>
              </div>
              <Slider
                id="snooze-time"
                min={1}
                max={72}
                step={1}
                value={[alertSettings.snoozeTime]}
                onValueChange={(value) => setAlertSettings({ ...alertSettings, snoozeTime: value[0] })}
                disabled={!alertSettings.alertsEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Alert History & Analytics</CardTitle>
          <CardDescription>
            View and analyze past alerts and their impact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-muted-foreground" />
                <Label>Alert Metrics</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Track and analyze alert frequency and resolution times
              </p>
            </div>
            <Button variant="outline" size="sm">
              View Analytics
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                <Label>Alert History</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                View historical alerts and their resolutions
              </p>
            </div>
            <Button variant="outline" size="sm">
              View History
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <Label>Security Audit Log</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                View security-related alerts and audit trail
              </p>
            </div>
            <Button variant="outline" size="sm">
              View Audit Log
            </Button>
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
