"use client";

import { AppShell } from "@/components/layout/app-shell";
import { ProjectSelector } from "@/components/dashboard/project-selector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusinessCapabilityMap } from "@/components/business/business-capability-map";
import { TraceabilityMatrix } from "@/components/business/traceability-matrix";
import { DomainCoverageChart } from "@/components/business/domain-coverage-chart";
import { DomainModuleSummary } from "@/components/business/domain-module-summary";
import { SensitiveDataHeatmap } from "@/components/business/sensitive-data-heatmap";
import { LLMTraceabilityPanel } from "@/components/business/llm-traceability-panel";
import { BusinessExpectationEditor } from "@/components/business/business-expectation-editor";
import { BusinessProcessMap } from "@/components/business/business-process-map";
import { EntityRelationshipDiagram } from "@/components/business/entity-relationship-diagram";
import { BusinessFilter } from "@/components/business/business-filter";

export default function BusinessPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Business Dashboard</h1>
          <div className="w-full md:w-[300px]">
            <ProjectSelector />
          </div>
        </div>

        <BusinessFilter />

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="capabilities">Business Capabilities</TabsTrigger>
              <TabsTrigger value="traceability">Traceability</TabsTrigger>
              <TabsTrigger value="domains">Domains</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="processes">Business Processes</TabsTrigger>
              <TabsTrigger value="expectations">Business Expectations</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <BusinessCapabilityMap className="lg:col-span-2" />
              <DomainCoverageChart />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <DomainModuleSummary className="lg:col-span-2" />
              <LLMTraceabilityPanel />
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <SensitiveDataHeatmap />
              <BusinessProcessMap />
            </div>
          </TabsContent>
          
          <TabsContent value="capabilities" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Business Capability Map</h2>
              <p className="text-muted-foreground mb-4">
                Comprehensive visualization of business capabilities and their implementation in the codebase.
              </p>
              <BusinessCapabilityMap isFullPage />
            </div>
          </TabsContent>
          
          <TabsContent value="traceability" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Traceability Matrix</h2>
                <p className="text-muted-foreground mb-4">
                  Detailed matrix showing the relationship between business requirements and code implementation.
                </p>
                <TraceabilityMatrix isFullPage />
              </div>
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">LLM Traceability Insights</h2>
                <p className="text-muted-foreground mb-4">
                  AI-generated insights on traceability between business requirements and code implementation.
                </p>
                <LLMTraceabilityPanel isFullPage />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="domains" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Domain Coverage</h2>
                <p className="text-muted-foreground mb-4">
                  Analysis of domain coverage across the codebase.
                </p>
                <DomainCoverageChart isFullPage />
              </div>
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Domain Module Summary</h2>
                <p className="text-muted-foreground mb-4">
                  Summary of modules by business domain.
                </p>
                <DomainModuleSummary isFullPage />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="data" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Sensitive Data Heatmap</h2>
                <p className="text-muted-foreground mb-4">
                  Heatmap showing sensitive data areas (GDPR, PII) in the codebase.
                </p>
                <SensitiveDataHeatmap isFullPage />
              </div>
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Entity Relationship Diagram</h2>
                <p className="text-muted-foreground mb-4">
                  Visualization of business entities and their relationships.
                </p>
                <EntityRelationshipDiagram isFullPage />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="processes" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Business Process Map</h2>
              <p className="text-muted-foreground mb-4">
                Map of critical business processes and their implementation in the codebase.
              </p>
              <BusinessProcessMap isFullPage />
            </div>
          </TabsContent>
          
          <TabsContent value="expectations" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Business Expectations</h2>
              <p className="text-muted-foreground mb-4">
                Define and edit business expectations for the system.
              </p>
              <BusinessExpectationEditor isFullPage />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
