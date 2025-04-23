"use client";

import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCode, RefreshCw, AlertCircle } from "lucide-react";
import { FileReportProps } from "./types";

export function FileReport({ filePath }: FileReportProps) {
  const [reportContent, setReportContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!filePath) {
      setReportContent(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    // Simulate API call to get file report
    setTimeout(() => {
      // Mock report content - replace with actual data from IA analysis
      const mockReportContent = `
        <div style=\"font-family: Arial, sans-serif;\">
          <h1 style=\"font-size: 24px; font-weight: bold; margin-bottom: 10px;\">File Report: ${filePath.split('/').pop()}</h1>
          <h2 style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">Structure</h2>
          <pre style=\"background-color: #f4f4f4; padding: 10px; border: 1px solid #ddd; overflow-x: auto;\">
            <code>
              // Sample code structure (replace with actual tree-sitter output)
              interface ButtonProps {
                label: string;
                onClick: () => void;
              }

              export function Button({ label, onClick }: ButtonProps) {
                return &lt;button onClick={onClick}>{label}&lt;/button>;
              }
            </code>
          </pre>
          <h2 style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">Title</h2>
          <p>Button Component</p>
          <h2 style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">Description</h2>
          <p>A reusable button component with customizable label and click handler.</p>
          <h2 style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">Key Features</h2>
          <ul>
            <li>Customizable label</li>
            <li>Click event handling</li>
            <li>Simple and reusable</li>
          </ul>
          <h2 style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">Tech Stacks</h2>
          <ul>
            <li>React</li>
            <li>TypeScript</li>
          </ul>
          <h2 style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">Dependencies</h2>
          <p>None</p>
          <h2 style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">IA Analysis Insights</h2>
          <ul>
            <li>Component has good test coverage</li>
            <li>Low complexity score</li>
          </ul>
        </div>
      `;

      setReportContent(mockReportContent);
      setIsLoading(false);
    }, 500);
  }, [filePath]);

  if (!filePath) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-[400px] gap-2 text-muted-foreground">
          <FileCode className="h-8 w-8" />
          <p>Select a file to view its report</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">File Report</CardTitle>
        <CardDescription>IA Analysis Report for {filePath.split('/').pop()}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : reportContent ? (
          <div dangerouslySetInnerHTML={{ __html: reportContent }} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] gap-2 text-muted-foreground">
            <AlertCircle className="h-8 w-8" />
            <p>No report found for this file</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
