"use client";

import { AppShell } from "@/components/layout/app-shell";
import { ProjectSelector } from "@/components/dashboard/project-selector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfrastructureReadinessGauge } from "@/components/infrastructure/infrastructure-readiness-gauge";
import { DetectedArtifacts } from "@/components/infrastructure/detected-artifacts";
import { ConfigurationTable } from "@/components/infrastructure/configuration-table";
import { CIPipelineVisualizer } from "@/components/infrastructure/ci-pipeline-visualizer";
import { SecurityAlerts } from "@/components/infrastructure/security-alerts";
import { CriticalArtifactAlert } from "@/components/infrastructure/critical-artifact-alert";
import { DeploymentChecklist } from "@/components/infrastructure/deployment-checklist";
import { ExternalDependencies } from "@/components/infrastructure/external-dependencies";
import { ObservabilitySummary } from "@/components/infrastructure/observability-summary";
import { InfrastructureExpectationEditor } from "@/components/infrastructure/infrastructure-expectation-editor";
import { SecurityReport } from "@/components/infrastructure/security-report";
import { ArtifactChangeHistory } from "@/components/infrastructure/artifact-change-history";
import { InfrastructureFilter } from "@/components/infrastructure/infrastructure-filter";

export default function InfrastructurePage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Infrastructure Dashboard</h1>
          <div className="w-full md:w-[300px]">
            <ProjectSelector />
          </div>
        </div>

        <InfrastructureFilter />

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="deployment">Deployment Readiness</TabsTrigger>
              <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="pipeline">CI/CD Pipeline</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="observability">Observability</TabsTrigger>
              <TabsTrigger value="expectations">Expectations</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <InfrastructureReadinessGauge />
              <CriticalArtifactAlert />
            </div>
            
            <SecurityAlerts />
            
            <div className="grid gap-6 lg:grid-cols-2">
              <DetectedArtifacts />
              <ObservabilitySummary />
            </div>
          </TabsContent>
          
          <TabsContent value="deployment" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Deployment Readiness</h2>
              <p className="text-muted-foreground mb-4">
                Comprehensive checklist and assessment of the system's readiness for deployment to production environments.
              </p>
              <DeploymentChecklist isFullPage />
            </div>
          </TabsContent>
          
          <TabsContent value="artifacts" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Infrastructure Artifacts</h2>
              <p className="text-muted-foreground mb-4">
                Detected infrastructure artifacts and their configurations across the codebase.
              </p>
              <DetectedArtifacts isFullPage />
            </div>
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Artifact Change History</h2>
              <p className="text-muted-foreground mb-4">
                Historical changes to critical infrastructure artifacts over time.
              </p>
              <ArtifactChangeHistory />
            </div>
          </TabsContent>
          
          <TabsContent value="configuration" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Configuration and Environment Variables</h2>
              <p className="text-muted-foreground mb-4">
                Comprehensive view of all configuration settings and environment variables used in the system.
              </p>
              <ConfigurationTable isFullPage />
            </div>
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">External Dependencies</h2>
              <p className="text-muted-foreground mb-4">
                Visualization of all external dependencies and services required by the system.
              </p>
              <ExternalDependencies />
            </div>
          </TabsContent>
          
          <TabsContent value="pipeline" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">CI/CD Pipeline Visualization</h2>
              <p className="text-muted-foreground mb-4">
                Visual representation of the continuous integration and deployment pipeline.
              </p>
              <CIPipelineVisualizer isFullPage />
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Security Alerts</h2>
              <p className="text-muted-foreground mb-4">
                Critical security issues and vulnerabilities detected in the infrastructure.
              </p>
              <SecurityAlerts isFullPage />
            </div>
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Security Report</h2>
              <p className="text-muted-foreground mb-4">
                Comprehensive security assessment of the infrastructure and deployment configuration.
              </p>
              <SecurityReport />
            </div>
          </TabsContent>
          
          <TabsContent value="observability" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Observability Summary</h2>
              <p className="text-muted-foreground mb-4">
                Overview of logging, monitoring, and tracing capabilities in the system.
              </p>
              <ObservabilitySummary isFullPage />
            </div>
          </TabsContent>
          
          <TabsContent value="expectations" className="space-y-6">
            <div className="rounded-lg border p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-4">Infrastructure Expectations</h2>
              <p className="text-muted-foreground mb-4">
                Define and edit infrastructure expectations for the system.
              </p>
              <InfrastructureExpectationEditor />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
