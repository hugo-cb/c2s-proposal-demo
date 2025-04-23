"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Save,
  Smartphone
} from "lucide-react";

interface NotificationPreferencesProps {
  className?: string;
}

export function NotificationPreferences({ className }: NotificationPreferencesProps) {
  const [emailNotifications, setEmailNotifications] = useState({
    accuracyAlerts: true,
    weeklyReports: true,
    securityAlerts: true,
    systemUpdates: false,
    projectChanges: true,
    commentMentions: true
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    accuracyAlerts: true,
    weeklyReports: false,
    securityAlerts: true,
    systemUpdates: true,
    projectChanges: true,
    commentMentions: true
  });

  const [pushNotifications, setPushNotifications] = useState({
    accuracyAlerts: false,
    weeklyReports: false,
    securityAlerts: true,
    systemUpdates: false,
    projectChanges: false,
    commentMentions: true
  });

  const [notificationFrequency, setNotificationFrequency] = useState("immediate");
  const [digestFrequency, setDigestFrequency] = useState("daily");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className={`space-y-6 ${className || ''}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Notification Preferences</CardTitle>
          <CardDescription>
            Configure how and when you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="in-app" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span>In-App</span>
              </TabsTrigger>
              <TabsTrigger value="push" className="flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                <span>Push</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <Label htmlFor="email-accuracy-alerts">Accuracy Alerts</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts when accuracy scores drop below thresholds
                    </p>
                  </div>
                  <Switch
                    id="email-accuracy-alerts"
                    checked={emailNotifications.accuracyAlerts}
                    onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, accuracyAlerts: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Label htmlFor="email-weekly-reports">Weekly Reports</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly summary reports of project status and metrics
                    </p>
                  </div>
                  <Switch
                    id="email-weekly-reports"
                    checked={emailNotifications.weeklyReports}
                    onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, weeklyReports: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <Label htmlFor="email-security-alerts">Security Alerts</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts for security vulnerabilities and issues
                    </p>
                  </div>
                  <Switch
                    id="email-security-alerts"
                    checked={emailNotifications.securityAlerts}
                    onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, securityAlerts: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      <Label htmlFor="email-system-updates">System Updates</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about system updates and new features
                    </p>
                  </div>
                  <Switch
                    id="email-system-updates"
                    checked={emailNotifications.systemUpdates}
                    onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, systemUpdates: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-purple-500" />
                      <Label htmlFor="email-project-changes">Project Changes</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when project settings or configurations change
                    </p>
                  </div>
                  <Switch
                    id="email-project-changes"
                    checked={emailNotifications.projectChanges}
                    onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, projectChanges: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-cyan-500" />
                      <Label htmlFor="email-comment-mentions">Comment Mentions</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when you are mentioned in comments
                    </p>
                  </div>
                  <Switch
                    id="email-comment-mentions"
                    checked={emailNotifications.commentMentions}
                    onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, commentMentions: checked })}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="in-app" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <Label htmlFor="in-app-accuracy-alerts">Accuracy Alerts</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts when accuracy scores drop below thresholds
                    </p>
                  </div>
                  <Switch
                    id="in-app-accuracy-alerts"
                    checked={inAppNotifications.accuracyAlerts}
                    onCheckedChange={(checked) => setInAppNotifications({ ...inAppNotifications, accuracyAlerts: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Label htmlFor="in-app-weekly-reports">Weekly Reports</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly summary reports of project status and metrics
                    </p>
                  </div>
                  <Switch
                    id="in-app-weekly-reports"
                    checked={inAppNotifications.weeklyReports}
                    onCheckedChange={(checked) => setInAppNotifications({ ...inAppNotifications, weeklyReports: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <Label htmlFor="in-app-security-alerts">Security Alerts</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts for security vulnerabilities and issues
                    </p>
                  </div>
                  <Switch
                    id="in-app-security-alerts"
                    checked={inAppNotifications.securityAlerts}
                    onCheckedChange={(checked) => setInAppNotifications({ ...inAppNotifications, securityAlerts: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      <Label htmlFor="in-app-system-updates">System Updates</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about system updates and new features
                    </p>
                  </div>
                  <Switch
                    id="in-app-system-updates"
                    checked={inAppNotifications.systemUpdates}
                    onCheckedChange={(checked) => setInAppNotifications({ ...inAppNotifications, systemUpdates: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-purple-500" />
                      <Label htmlFor="in-app-project-changes">Project Changes</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when project settings or configurations change
                    </p>
                  </div>
                  <Switch
                    id="in-app-project-changes"
                    checked={inAppNotifications.projectChanges}
                    onCheckedChange={(checked) => setInAppNotifications({ ...inAppNotifications, projectChanges: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-cyan-500" />
                      <Label htmlFor="in-app-comment-mentions">Comment Mentions</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when you are mentioned in comments
                    </p>
                  </div>
                  <Switch
                    id="in-app-comment-mentions"
                    checked={inAppNotifications.commentMentions}
                    onCheckedChange={(checked) => setInAppNotifications({ ...inAppNotifications, commentMentions: checked })}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="push" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                      <Label htmlFor="push-accuracy-alerts">Accuracy Alerts</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts when accuracy scores drop below thresholds
                    </p>
                  </div>
                  <Switch
                    id="push-accuracy-alerts"
                    checked={pushNotifications.accuracyAlerts}
                    onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, accuracyAlerts: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <Label htmlFor="push-weekly-reports">Weekly Reports</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive weekly summary reports of project status and metrics
                    </p>
                  </div>
                  <Switch
                    id="push-weekly-reports"
                    checked={pushNotifications.weeklyReports}
                    onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, weeklyReports: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <Label htmlFor="push-security-alerts">Security Alerts</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts for security vulnerabilities and issues
                    </p>
                  </div>
                  <Switch
                    id="push-security-alerts"
                    checked={pushNotifications.securityAlerts}
                    onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, securityAlerts: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      <Label htmlFor="push-system-updates">System Updates</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about system updates and new features
                    </p>
                  </div>
                  <Switch
                    id="push-system-updates"
                    checked={pushNotifications.systemUpdates}
                    onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, systemUpdates: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-purple-500" />
                      <Label htmlFor="push-project-changes">Project Changes</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when project settings or configurations change
                    </p>
                  </div>
                  <Switch
                    id="push-project-changes"
                    checked={pushNotifications.projectChanges}
                    onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, projectChanges: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-cyan-500" />
                      <Label htmlFor="push-comment-mentions">Comment Mentions</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when you are mentioned in comments
                    </p>
                  </div>
                  <Switch
                    id="push-comment-mentions"
                    checked={pushNotifications.commentMentions}
                    onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, commentMentions: checked })}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Notification Delivery</CardTitle>
          <CardDescription>
            Configure when and how often you receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="notification-frequency">Notification Frequency</Label>
              <Select
                value={notificationFrequency}
                onValueChange={setNotificationFrequency}
              >
                <SelectTrigger id="notification-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="hourly">Hourly Digest</SelectItem>
                  <SelectItem value="daily">Daily Digest</SelectItem>
                  <SelectItem value="weekly">Weekly Digest</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                How frequently you want to receive individual notifications
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="digest-frequency">Digest Frequency</Label>
              <Select
                value={digestFrequency}
                onValueChange={setDigestFrequency}
              >
                <SelectTrigger id="digest-frequency">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                How frequently you want to receive notification digests
              </p>
            </div>
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
              Save Preferences
            </>
          )}
        </Button>
      </CardFooter>
    </div>
  );
}
