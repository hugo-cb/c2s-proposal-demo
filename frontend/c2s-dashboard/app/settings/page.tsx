"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppShell } from "@/components/layout/app-shell";
import { UserProfileSettings } from "@/components/settings/user-profile-settings";
import { NotificationPreferences } from "@/components/settings/notification-preferences";
import { ExternalToolsIntegration } from "@/components/settings/external-tools-integration";
import { DisplayPreferences } from "@/components/settings/display-preferences";
import { AlertsConfiguration } from "@/components/settings/alerts-configuration";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <AppShell>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Settings & Preferences</h1>
          <p className="text-muted-foreground">
            Configure your account settings, notification preferences, and customize your experience.
          </p>
        </div>

        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="profile">User Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="display">Display</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <UserProfileSettings />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <NotificationPreferences />
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-6">
            <ExternalToolsIntegration />
          </TabsContent>
          
          <TabsContent value="display" className="space-y-6">
            <DisplayPreferences />
          </TabsContent>
          
          <TabsContent value="alerts" className="space-y-6">
            <AlertsConfiguration />
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
