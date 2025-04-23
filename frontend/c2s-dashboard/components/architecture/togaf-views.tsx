"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutTemplate, 
  Database, 
  Layers, 
  Server,
  Info
} from "lucide-react";

export function TOGAFViews() {
  const [activeView, setActiveView] = useState("business");
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="h-5 w-5" />
            TOGAF Views
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="rounded-lg border p-4 bg-muted/40">
            <div className="flex items-start gap-2">
              <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
              <p className="text-sm text-muted-foreground">
                The TOGAF framework (The Open Group Architecture Framework) provides different architectural views to represent specific aspects of the system.
              </p>
            </div>
          </div>
          
          <Tabs value={activeView} onValueChange={setActiveView}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="business" className="text-xs">
                <div className="flex items-center gap-1">
                  <LayoutTemplate className="h-3 w-3" />
                  <span>Business</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="data" className="text-xs">
                <div className="flex items-center gap-1">
                  <Database className="h-3 w-3" />
                  <span>Data</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="application" className="text-xs">
                <div className="flex items-center gap-1">
                  <Layers className="h-3 w-3" />
                  <span>Application</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="technology" className="text-xs">
                <div className="flex items-center gap-1">
                  <Server className="h-3 w-3" />
                  <span>Technology</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="business">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2">Business View</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Represents the business processes, organizational functions, and actors involved in the system.
                  </p>
                  
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Business View Diagram</p>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <h4 className="text-xs font-medium">Business Capabilities</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>User Management</li>
                      <li>Payment Processing</li>
                      <li>Order Management</li>
                      <li>Notifications</li>
                      <li>Reports and Analytics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="data">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2">Data View</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Describes the logical and physical data structure and data management resources.
                  </p>
                  
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Data Model</p>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <h4 className="text-xs font-medium">Key Entities</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Users</li>
                      <li>Products</li>
                      <li>Orders</li>
                      <li>Payments</li>
                      <li>Notifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="application">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2">Application View</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Provides a blueprint for individual application systems, their interactions, and their relationships to business processes.
                  </p>
                  
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Application Architecture</p>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <h4 className="text-xs font-medium">Key Components</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>Web Application</li>
                      <li>Mobile Application</li>
                      <li>API Gateway</li>
                      <li>Authentication Service</li>
                      <li>Payment Service</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="technology">
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2">Technology View</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Describes the hardware, software, and network infrastructure needed to support the deployment of core applications.
                  </p>
                  
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Technology Infrastructure</p>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <h4 className="text-xs font-medium">Technology Stack</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      <li>React / Next.js</li>
                      <li>Node.js / Express</li>
                      <li>PostgreSQL</li>
                      <li>Docker</li>
                      <li>AWS / Cloud Services</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
