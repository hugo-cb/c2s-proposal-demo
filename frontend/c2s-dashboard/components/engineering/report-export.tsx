"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Download,
  FileText,
  Table as TableIcon,
  BarChart,
  FileCode,
  Calendar,
  Mail
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const reportTypes = [
  { value: "summary", label: "Summary Report" },
  { value: "detailed", label: "Detailed Report" },
  { value: "executive", label: "Executive Report" },
  { value: "custom", label: "Custom Report" }
];

const fileFormats = [
  { value: "pdf", label: "PDF" },
  { value: "excel", label: "Excel" },
  { value: "csv", label: "CSV" },
  { value: "json", label: "JSON" },
  { value: "html", label: "HTML" }
];

const reportSections = [
  { id: "overview", label: "Overview", default: true },
  { id: "codeQuality", label: "Code Quality", default: true },
  { id: "complexity", label: "Complexity", default: true },
  { id: "coverage", label: "Test Coverage", default: true },
  { id: "issues", label: "Issues", default: true },
  { id: "trends", label: "Trends", default: false },
  { id: "recommendations", label: "Recommendations", default: true }
];

const scheduleFrequencies = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Bi-weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" }
];

export function ReportExport() {
  const [reportType, setReportType] = useState("summary");
  const [fileFormat, setFileFormat] = useState("pdf");
  const [selectedSections, setSelectedSections] = useState<string[]>(
    reportSections.filter(section => section.default).map(section => section.id)
  );
  const [scheduleFrequency, setScheduleFrequency] = useState("");
  const [emailRecipients, setEmailRecipients] = useState("");
  const [reportName, setReportName] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  
  const toggleSection = (sectionId: string) => {
    if (selectedSections.includes(sectionId)) {
      setSelectedSections(selectedSections.filter(id => id !== sectionId));
    } else {
      setSelectedSections([...selectedSections, sectionId]);
    }
  };
  
  const generateReport = () => {
    setIsGenerating(true);
    
    // In a real application, this would call an API to generate the report
    console.log("Generating report:", {
      type: reportType,
      format: fileFormat,
      sections: selectedSections,
      name: reportName || "Engineering Report",
      description: reportDescription
    });
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // In a real application, this would trigger a download or show a success message
      console.log("Report generated successfully");
    }, 2000);
  };
  
  const scheduleReport = () => {
    setIsScheduling(true);
    
    // In a real application, this would call an API to schedule the report
    console.log("Scheduling report:", {
      type: reportType,
      format: fileFormat,
      sections: selectedSections,
      frequency: scheduleFrequency,
      recipients: emailRecipients.split(",").map(email => email.trim()),
      name: reportName || "Engineering Report",
      description: reportDescription
    });
    
    // Simulate scheduling
    setTimeout(() => {
      setIsScheduling(false);
      setScheduleFrequency("");
      setEmailRecipients("");
      // In a real application, this would show a success message
      console.log("Report scheduled successfully");
    }, 2000);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report Export
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="generate">
          <TabsList className="mb-4">
            <TabsTrigger value="generate" className="gap-1">
              <Download className="h-4 w-4" />
              Generate Report
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-1">
              <Calendar className="h-4 w-4" />
              Schedule Reports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="generate">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-1 block">Report Type</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">File Format</label>
                  <Select value={fileFormat} onValueChange={setFileFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select file format" />
                    </SelectTrigger>
                    <SelectContent>
                      {fileFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {reportType === "custom" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Report Name</label>
                    <Input
                      placeholder="Enter report name"
                      value={reportName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReportName(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Description (Optional)</label>
                    <Textarea
                      placeholder="Enter report description"
                      value={reportDescription}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReportDescription(e.target.value)}
                      rows={1}
                    />
                  </div>
                </div>
              )}
              
              {(reportType === "custom" || reportType === "detailed") && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Include Sections</label>
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {reportSections.map((section) => (
                      <div key={section.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`section-${section.id}`} 
                          checked={selectedSections.includes(section.id)}
                          onCheckedChange={() => toggleSection(section.id)}
                        />
                        <Label htmlFor={`section-${section.id}`}>{section.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="pt-4">
                <div className="flex flex-col gap-4 rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">Report Preview</h3>
                  </div>
                  
                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
                    {selectedSections.includes("overview") && (
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Overview</span>
                      </div>
                    )}
                    
                    {selectedSections.includes("codeQuality") && (
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <TableIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Code Quality</span>
                      </div>
                    )}
                    
                    {selectedSections.includes("complexity") && (
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Complexity</span>
                      </div>
                    )}
                    
                    {selectedSections.includes("coverage") && (
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Test Coverage</span>
                      </div>
                    )}
                    
                    {selectedSections.includes("issues") && (
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <FileCode className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Issues</span>
                      </div>
                    )}
                    
                    {selectedSections.includes("trends") && (
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Trends</span>
                      </div>
                    )}
                    
                    {selectedSections.includes("recommendations") && (
                      <div className="flex items-center gap-2 rounded-md border p-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Recommendations</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={generateReport}
                  disabled={isGenerating || selectedSections.length === 0}
                >
                  {isGenerating ? (
                    <>Generating...</>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-1 block">Report Type</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">File Format</label>
                  <Select value={fileFormat} onValueChange={setFileFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select file format" />
                    </SelectTrigger>
                    <SelectContent>
                      {fileFormats.map((format) => (
                        <SelectItem key={format.value} value={format.value}>
                          {format.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-1 block">Frequency</label>
                  <Select value={scheduleFrequency} onValueChange={setScheduleFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      {scheduleFrequencies.map((frequency) => (
                        <SelectItem key={frequency.value} value={frequency.value}>
                          {frequency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Email Recipients</label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="email1@example.com, email2@example.com"
                      value={emailRecipients}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailRecipients(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium mb-1 block">Report Name</label>
                  <Input
                    placeholder="Enter report name"
                    value={reportName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReportName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Description (Optional)</label>
                  <Textarea
                    placeholder="Enter report description"
                    value={reportDescription}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReportDescription(e.target.value)}
                    rows={1}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Include Sections</label>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {reportSections.map((section) => (
                    <div key={section.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`schedule-section-${section.id}`} 
                        checked={selectedSections.includes(section.id)}
                        onCheckedChange={() => toggleSection(section.id)}
                      />
                      <Label htmlFor={`schedule-section-${section.id}`}>{section.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button 
                  onClick={scheduleReport}
                  disabled={
                    isScheduling || 
                    !scheduleFrequency || 
                    !emailRecipients || 
                    selectedSections.length === 0
                  }
                >
                  {isScheduling ? (
                    <>Scheduling...</>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Report
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
