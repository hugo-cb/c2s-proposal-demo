"use client";

import { AppShell } from "@/components/layout/app-shell";
import { ProjectSelector } from "@/components/dashboard/project-selector";
import { CodeQualityTable } from "@/components/engineering/code-quality-table";
import { ComplexityTreemap } from "@/components/engineering/complexity-treemap";
import { CodeSmellsChart } from "@/components/engineering/code-smells-chart";
import { RefactoringSuggestions } from "@/components/engineering/refactoring-suggestions";
import { TestCoverageReport } from "@/components/engineering/test-coverage-report";
import { LLMInsights } from "@/components/engineering/llm-insights";
import { FilterPanel } from "@/components/engineering/filter-panel";
import { FileDrillDown } from "@/components/engineering/file-drill-down";
import { TemporalMetrics } from "@/components/engineering/temporal-metrics";
import { HistoricalComparison } from "@/components/engineering/historical-comparison";
import { ReportExport } from "@/components/engineering/report-export";
import { CodeGraph } from "@/components/engineering/code-graph";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EngineeringPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6 p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Engineering Dashboard</h1>
          <div className="w-full md:w-[300px]">
            <ProjectSelector />
          </div>
        </div>

        <FilterPanel />

        <Tabs defaultValue="overview" className="space-y-4">
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="code-quality">Code Quality</TabsTrigger>
              <TabsTrigger value="complexity">Complexity</TabsTrigger>
              <TabsTrigger value="test-coverage">Test Coverage</TabsTrigger>
              <TabsTrigger value="temporal">Temporal Analysis</TabsTrigger>
              <TabsTrigger value="code-graph">Code Graph</TabsTrigger>
              <TabsTrigger value="file-explorer">File Explorer</TabsTrigger>
              <TabsTrigger value="llm-insights">Code Insights</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <ComplexityTreemap />
              <CodeSmellsChart />
            </div>
            
            <CodeQualityTable />
            
            <div className="grid gap-6 lg:grid-cols-2">
              <HistoricalComparison />
              <CodeGraph />
            </div>
            
            <LLMInsights />
          </TabsContent>
          
          <TabsContent value="code-quality">
            <div className="space-y-6">
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Code Quality Analysis</h2>
                <p className="text-muted-foreground">
                  Detailed analysis of code quality metrics will be displayed here, including:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Code duplication analysis</li>
                  <li>Coding standards compliance</li>
                  <li>Static code analysis results</li>
                  <li>Technical debt quantification</li>
                </ul>
              </div>
              
              <CodeQualityTable />
              
              <LLMInsights />
            </div>
          </TabsContent>
          
          <TabsContent value="complexity">
            <div className="space-y-6">
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Code Complexity Analysis</h2>
                <p className="text-muted-foreground">
                  Detailed analysis of code complexity metrics will be displayed here, including:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Cyclomatic complexity</li>
                  <li>Cognitive complexity</li>
                  <li>Method length analysis</li>
                  <li>Dependency analysis</li>
                </ul>
              </div>
              
              <ComplexityTreemap />
              <RefactoringSuggestions />
            </div>
          </TabsContent>
          
          <TabsContent value="test-coverage">
            <div className="space-y-6">
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Test Coverage Analysis</h2>
                <p className="text-muted-foreground">
                  Detailed analysis of test coverage metrics will be displayed here, including:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Line coverage</li>
                  <li>Branch coverage</li>
                  <li>Test quality metrics</li>
                  <li>Uncovered critical paths</li>
                </ul>
              </div>
              
              <TestCoverageReport />
            </div>
          </TabsContent>
          
          <TabsContent value="temporal">
            <div className="space-y-6">
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Temporal Metrics Analysis</h2>
                <p className="text-muted-foreground">
                  Analyze how code quality metrics change over time:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Track trends in code quality</li>
                  <li>Monitor the impact of refactoring efforts</li>
                  <li>Identify patterns in development cycles</li>
                  <li>Compare metrics across different time periods</li>
                </ul>
              </div>
              
              <TemporalMetrics />
              <HistoricalComparison />
            </div>
          </TabsContent>
          
          <TabsContent value="code-graph">
            <div className="space-y-6">
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Code Dependency Graph</h2>
                <p className="text-muted-foreground">
                  Visualize the relationships and dependencies between different files in your codebase:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Identify highly connected modules</li>
                  <li>Analyze import/export relationships</li>
                  <li>Detect circular dependencies</li>
                  <li>Understand code architecture visually</li>
                </ul>
              </div>
              
              <CodeGraph />
            </div>
          </TabsContent>
          
          <TabsContent value="file-explorer">
            <div className="space-y-6">
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">File Explorer</h2>
                <p className="text-muted-foreground">
                  Drill down into specific files and directories to analyze code quality issues:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Identify problematic files with high complexity or many issues</li>
                  <li>View specific code snippets with issues</li>
                  <li>Analyze issues by severity and type</li>
                  <li>Navigate through your codebase structure</li>
                </ul>
              </div>
              
              <FileDrillDown />
            </div>
          </TabsContent>
          
          <TabsContent value="llm-insights">
            <div className="space-y-6">
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">LLM-Powered Code Analysis</h2>
                <p className="text-muted-foreground">
                  Our advanced language models analyze your codebase to provide actionable insights in the following areas:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Code quality improvements</li>
                  <li>Architectural recommendations</li>
                  <li>Security vulnerabilities</li>
                  <li>Performance optimizations</li>
                  <li>Refactoring suggestions with code examples</li>
                </ul>
              </div>
              
              <LLMInsights />
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="space-y-6">
              <div className="rounded-lg border p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4">Reports</h2>
                <p className="text-muted-foreground">
                  Generate and export reports for your engineering metrics:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                  <li>Create customized reports with selected metrics</li>
                  <li>Export in various formats (PDF, Excel, CSV)</li>
                  <li>Schedule regular report generation</li>
                  <li>Share reports with team members</li>
                </ul>
              </div>
              
              <ReportExport />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
