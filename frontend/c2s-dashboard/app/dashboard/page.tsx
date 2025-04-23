"use client";

import { Code, Layers, Server, Briefcase } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { ProjectSelector } from "@/components/dashboard/project-selector";
import { PerspectiveCard } from "@/components/dashboard/perspective-card";
import { AccuracyChart } from "@/components/dashboard/accuracy-chart";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { ProjectsList } from "@/components/dashboard/projects-list";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <div className="w-full md:w-[300px]">
            <ProjectSelector />
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <PerspectiveCard
            title="Engineering"
            icon={<Code className="h-4 w-4 text-blue-500" />}
            value={92}
            change={5}
            description="Code quality and test coverage analysis"
          />
          <PerspectiveCard
            title="Architecture"
            icon={<Layers className="h-4 w-4 text-purple-500" />}
            value={85}
            change={-2}
            description="Architectural patterns and dependencies"
          />
          <PerspectiveCard
            title="Infrastructure"
            icon={<Server className="h-4 w-4 text-green-500" />}
            value={78}
            change={3}
            description="Operational readiness and deployment security"
          />
          <PerspectiveCard
            title="Business"
            icon={<Briefcase className="h-4 w-4 text-amber-500" />}
            value={90}
            change={7}
            description="Business capabilities alignment"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <AccuracyChart />
          <RecentActivities />
        </div>
        
        <div>
          <ProjectsList />
        </div>
      </div>
    </AppShell>
  );
}
