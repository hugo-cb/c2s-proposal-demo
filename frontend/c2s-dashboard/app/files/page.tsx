"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { FileExplorer } from "@/components/files/file-explorer";
import { FileDataTable } from "@/components/files/file-data-table";
import { CommitHistoryTimeline } from "@/components/files/commit-history-timeline";
import { CodeViewer } from "@/components/files/code-viewer";
import { FileMetricCards } from "@/components/files/file-metric-cards";
import { HistoricalComparisonView } from "@/components/files/historical-comparison-view";
import { FileActivityHeatmap } from "@/components/files/file-activity-heatmap";
import { MostChangedFiles } from "@/components/files/most-changed-files";
import { CodeInsights } from "@/components/files/code-insights";
import { FileReport } from "@/components/files/file-report";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FilesPage() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [selectedDirectory, setSelectedDirectory] = useState<string>("/src");
  const [activeTab, setActiveTab] = useState("explorer");

  // Handle file selection from explorer or data table
  const handleFileSelect = (filePath: string) => {
    setSelectedFile(filePath);
    setActiveTab("code");
  };

  // Handle directory selection from explorer
  const handleDirectorySelect = (dirPath: string) => {
    setSelectedDirectory(dirPath);
  };

  return (
    <AppShell>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">File Explorer & History</h1>
          <p className="text-muted-foreground">
            Browse project files, view code, and analyze historical changes
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Project Files</CardTitle>
                <CardDescription>
                  Browse directories and files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileExplorer 
                  onFileSelect={handleFileSelect} 
                  onDirectorySelect={handleDirectorySelect}
                  selectedFile={selectedFile}
                  selectedDirectory={selectedDirectory}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {selectedFile ? (
              <Tabs defaultValue="explorer" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-6">
                  <TabsTrigger value="explorer">Files</TabsTrigger>
                  <TabsTrigger value="code">Code Viewer</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                  <TabsTrigger value="xray">X-Ray</TabsTrigger>
                  <TabsTrigger value="history">Commit History</TabsTrigger>
                  <TabsTrigger value="comparison">Comparison</TabsTrigger>
                </TabsList>
                
                <TabsContent value="explorer" className="space-y-6">
                  <FileDataTable 
                    directoryPath={selectedDirectory} 
                    onFileSelect={handleFileSelect}
                  />
                  <MostChangedFiles 
                    directoryPath={selectedDirectory}
                    onFileSelect={handleFileSelect}
                  />
                  <FileActivityHeatmap directoryPath={selectedDirectory} />
                </TabsContent>
                
                <TabsContent value="code" className="space-y-6">
                  <>
                    <FileMetricCards filePath={selectedFile} />
                    <CodeViewer filePath={selectedFile} />
                  </>
                </TabsContent>
                
                <TabsContent value="insights" className="space-y-6">
                  <CodeInsights filePath={selectedFile} />
                </TabsContent>

                <TabsContent value="xray" className="space-y-6">
                  <FileReport filePath={selectedFile} />
                </TabsContent>
                
                <TabsContent value="history" className="space-y-6">
                  <CommitHistoryTimeline 
                    filePath={selectedFile} 
                    directoryPath={selectedFile ? null : selectedDirectory} 
                  />
                </TabsContent>
                
                <TabsContent value="comparison" className="space-y-6">
                  <HistoricalComparisonView filePath={selectedFile} />
                </TabsContent>
              </Tabs>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-[400px]">
                  <p className="text-muted-foreground">Select a file to view its details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
