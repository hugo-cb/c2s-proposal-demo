"use client";

import { AppShell } from "@/components/layout/app-shell";
import { ProjectSelector } from "@/components/dashboard/project-selector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { C4ModelViewer } from "@/components/architecture/c4-model-viewer";
import { LayerMapVisualizer } from "@/components/architecture/layer-map-visualizer";
import { DesignPatterns } from "@/components/architecture/design-patterns";
import { TOGAFViews } from "@/components/architecture/togaf-views";
import { ExpectationDiffViewer } from "@/components/architecture/expectation-diff-viewer";
import { ArchitectureFilter } from "@/components/architecture/architecture-filter";
import { ComponentDrillDown } from "@/components/architecture/component-drill-down";
import { LifecycleVisualization } from "@/components/architecture/lifecycle-visualization";
import { ExpectationEditor } from "@/components/architecture/expectation-editor";
import { ExpectationTraceability } from "@/components/architecture/expectation-traceability";

export default function ArchitecturePage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Architecture Dashboard</h1>
          <div className="w-full md:w-[300px]">
            <ProjectSelector />
          </div>
        </div>

        <ArchitectureFilter />

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="c4-model">C4 Model</TabsTrigger>
              <TabsTrigger value="layers">Layer Map</TabsTrigger>
              <TabsTrigger value="patterns">Design Patterns</TabsTrigger>
              <TabsTrigger value="togaf">TOGAF Views</TabsTrigger>
              <TabsTrigger value="expectations">Expectations</TabsTrigger>
              <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <C4ModelViewer />
              <LayerMapVisualizer />
            </div>
            
            <div className="grid gap-6 lg:grid-cols-2">
              <DesignPatterns />
              <ExpectationDiffViewer />
            </div>
          </TabsContent>
          
          <TabsContent value="c4-model" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Detailed C4 Model</h2>
              <p className="text-muted-foreground mb-4">
                Interactive visualization of the C4 model (Context, Containers, Components, Code) to represent the system architecture at different levels of abstraction.
              </p>
              <C4ModelViewer isFullPage />
            </div>
            <ComponentDrillDown />
          </TabsContent>
          
          <TabsContent value="layers" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Layer Map</h2>
              <p className="text-muted-foreground mb-4">
                Visualization of the architectural layers of the system, showing the organization and separation of responsibilities.
              </p>
              <LayerMapVisualizer isFullPage />
            </div>
          </TabsContent>
          
          <TabsContent value="patterns" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Detected Design Patterns</h2>
              <p className="text-muted-foreground mb-4">
                Analysis and identification of design patterns used in the source code.
              </p>
              <DesignPatterns isFullPage />
            </div>
          </TabsContent>
          
          <TabsContent value="togaf" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">TOGAF Views</h2>
              <p className="text-muted-foreground mb-4">
                Different architectural perspectives based on the TOGAF framework.
              </p>
              <TOGAFViews />
            </div>
          </TabsContent>
          
          <TabsContent value="expectations" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Expectation Editor</h2>
                <p className="text-muted-foreground mb-4">
                  Define and edit architectural expectations for the system.
                </p>
                <ExpectationEditor />
              </div>
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Expectation Differences</h2>
                <p className="text-muted-foreground mb-4">
                  Compare architectural expectations with the current implementation.
                </p>
                <ExpectationDiffViewer isFullPage />
              </div>
            </div>
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Expectation Traceability</h2>
              <p className="text-muted-foreground mb-4">
                Track the implementation of architectural expectations over time.
              </p>
              <ExpectationTraceability />
            </div>
          </TabsContent>
          
          <TabsContent value="lifecycle" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Lifecycle Visualization</h2>
              <p className="text-muted-foreground mb-4">
                Analysis of the component lifecycle and architecture evolution over time.
              </p>
              <LifecycleVisualization />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
