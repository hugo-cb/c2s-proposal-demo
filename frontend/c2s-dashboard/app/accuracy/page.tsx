"use client";

import { AccuracyScoreCard } from "@/components/accuracy/accuracy-score-card";
import { AccuracyTrendChart } from "@/components/accuracy/accuracy-trend-chart";
import { EditableExpectationsForm } from "@/components/accuracy/editable-expectations-form";
import { ExpectationDiffViewer } from "@/components/accuracy/expectation-diff-viewer";
import { ExpectationComparisonTable } from "@/components/accuracy/expectation-comparison-table";
import { PerspectiveAccuracyComparison } from "@/components/accuracy/perspective-accuracy-comparison";
import { AccuracyInsightsPanel } from "@/components/accuracy/accuracy-insights-panel";
import { AppShell } from "@/components/layout/app-shell";

export default function AccuracyPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6 p-6">
        <h1 className="text-2xl font-bold">Accuracy Analysis Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AccuracyScoreCard perspective="engineering" />
          <AccuracyScoreCard perspective="architecture" />
          <AccuracyScoreCard perspective="infrastructure" />
          <AccuracyScoreCard perspective="business" />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <AccuracyTrendChart />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <AccuracyInsightsPanel />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <PerspectiveAccuracyComparison />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <ExpectationComparisonTable />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EditableExpectationsForm />
          <ExpectationDiffViewer />
        </div>
      </div>
    </AppShell>
  );
}
