"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  RefreshCw,
  Download,
  ChevronDown,
  ChevronUp,
  Lock,
  Key,
  FileWarning,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from "lucide-react";

interface SecurityFinding {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  category: "vulnerability" | "misconfiguration" | "secret" | "compliance" | "iam";
  status: "open" | "in_progress" | "resolved" | "accepted_risk";
  resource: string;
  remediation: string;
}

interface SecurityCategory {
  name: string;
  findings: SecurityFinding[];
}

interface SecurityReportProps {
  className?: string;
  isFullPage?: boolean;
}

export function SecurityReport({ className, isFullPage = false }: SecurityReportProps) {
  // Sample data for security report
  const [categories, setCategories] = useState<SecurityCategory[]>([
    {
      name: "vulnerabilities",
      findings: [
        {
          id: "v1",
          title: "Outdated Node.js dependencies with known vulnerabilities",
          description: "Several Node.js dependencies have known security vulnerabilities that could be exploited.",
          severity: "high",
          category: "vulnerability",
          status: "open",
          resource: "package.json",
          remediation: "Update affected dependencies to their latest secure versions."
        },
        {
          id: "v2",
          title: "Vulnerable Docker base image",
          description: "The Docker base image contains known vulnerabilities that could be exploited.",
          severity: "medium",
          category: "vulnerability",
          status: "in_progress",
          resource: "Dockerfile",
          remediation: "Update the base image to a more recent, secure version."
        }
      ]
    },
    {
      name: "misconfigurations",
      findings: [
        {
          id: "m1",
          title: "Kubernetes pods running as root",
          description: "Containers are running as root, which increases the potential impact of a container escape.",
          severity: "high",
          category: "misconfiguration",
          status: "open",
          resource: "k8s/deployment.yaml",
          remediation: "Configure containers to run as non-root users with appropriate permissions."
        },
        {
          id: "m2",
          title: "Insecure S3 bucket configuration",
          description: "S3 bucket has public read access enabled, which could expose sensitive data.",
          severity: "critical",
          category: "misconfiguration",
          status: "open",
          resource: "terraform/storage.tf",
          remediation: "Disable public access and implement proper access controls."
        },
        {
          id: "m3",
          title: "Missing resource limits in Kubernetes",
          description: "Kubernetes deployments are missing resource limits, which could lead to resource exhaustion.",
          severity: "medium",
          category: "misconfiguration",
          status: "in_progress",
          resource: "k8s/deployment.yaml",
          remediation: "Define appropriate CPU and memory limits for all containers."
        }
      ]
    },
    {
      name: "secrets",
      findings: [
        {
          id: "s1",
          title: "Hardcoded API key in configuration file",
          description: "An API key is hardcoded in a configuration file, which is a security risk.",
          severity: "critical",
          category: "secret",
          status: "open",
          resource: "config/production.js",
          remediation: "Move the API key to a secure secret management solution."
        }
      ]
    },
    {
      name: "compliance",
      findings: [
        {
          id: "c1",
          title: "Missing HTTPS configuration",
          description: "Application is configured to use HTTP instead of HTTPS for communication.",
          severity: "high",
          category: "compliance",
          status: "resolved",
          resource: "k8s/ingress.yaml",
          remediation: "Configure HTTPS with valid certificates for all external endpoints."
        },
        {
          id: "c2",
          title: "Insufficient logging configuration",
          description: "Logging configuration does not capture security-relevant events as required by compliance standards.",
          severity: "medium",
          category: "compliance",
          status: "open",
          resource: "config/logging.js",
          remediation: "Enhance logging to capture authentication, authorization, and data access events."
        }
      ]
    },
    {
      name: "iam",
      findings: [
        {
          id: "i1",
          title: "Overly permissive IAM roles",
          description: "IAM roles have excessive permissions that violate the principle of least privilege.",
          severity: "high",
          category: "iam",
          status: "in_progress",
          resource: "terraform/iam.tf",
          remediation: "Review and restrict IAM policies to only the necessary permissions."
        },
        {
          id: "i2",
          title: "Missing MFA for privileged accounts",
          description: "Multi-factor authentication is not enforced for accounts with elevated privileges.",
          severity: "high",
          category: "iam",
          status: "accepted_risk",
          resource: "AWS IAM",
          remediation: "Enable and enforce MFA for all accounts with administrative or elevated privileges."
        }
      ]
    }
  ]);

  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    vulnerabilities: true,
    misconfigurations: true,
    secrets: true,
    compliance: true,
    iam: true
  });

  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryName]: !expandedCategories[categoryName]
    });
  };

  // Refresh security report data
  const refreshData = () => {
    console.log("Refreshing security report data...");
    // In a real application, this would fetch updated data from an API
  };

  // Export security report as PDF
  const exportReport = () => {
    console.log("Exporting security report as PDF...");
    // In a real application, this would generate and download a PDF report
  };

  // Get severity icon
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "high":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "low":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "in_progress":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
      case "accepted_risk":
        return <AlertTriangle className="h-5 w-5 text-purple-500" />;
      case "open":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  // Get severity badge
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
      case "high":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Open</Badge>;
      case "in_progress":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case "resolved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>;
      case "accepted_risk":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Accepted Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "vulnerability":
        return <ShieldAlert className="h-4 w-4" />;
      case "misconfiguration":
        return <FileWarning className="h-4 w-4" />;
      case "secret":
        return <Key className="h-4 w-4" />;
      case "compliance":
        return <CheckCircle2 className="h-4 w-4" />;
      case "iam":
        return <Lock className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  // Calculate security metrics
  const allFindings = categories.flatMap(category => category.findings);
  const criticalFindings = allFindings.filter(finding => finding.severity === "critical" && finding.status !== "resolved").length;
  const highFindings = allFindings.filter(finding => finding.severity === "high" && finding.status !== "resolved").length;
  const mediumFindings = allFindings.filter(finding => finding.severity === "medium" && finding.status !== "resolved").length;
  const lowFindings = allFindings.filter(finding => finding.severity === "low" && finding.status !== "resolved").length;
  const totalFindings = allFindings.length;
  const resolvedFindings = allFindings.filter(finding => finding.status === "resolved").length;
  
  // Calculate security score (simple algorithm for demonstration)
  const securityScore = Math.max(0, 100 - (criticalFindings * 15 + highFindings * 10 + mediumFindings * 5 + lowFindings * 2));

  return (
    <Card className={`w-full ${className || ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Assessment Report
            </div>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={exportReport}>
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={refreshData}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col items-center justify-center p-4 rounded-lg border bg-muted/20">
            <div className="text-center mb-2">
              <h3 className="text-lg font-semibold">Security Score</h3>
              <div className="text-3xl font-bold mt-1">{securityScore}/100</div>
            </div>
            
            <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  securityScore >= 90 ? "bg-green-500" : 
                  securityScore >= 70 ? "bg-amber-500" : 
                  "bg-red-500"
                }`} 
                style={{ width: `${securityScore}%` }}
              ></div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">{criticalFindings} Critical</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm">{highFindings} High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm">{mediumFindings} Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-sm">{lowFindings} Low</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">{resolvedFindings} Resolved</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name} className="rounded-lg border overflow-hidden">
                <div 
                  className="flex items-center justify-between p-3 bg-muted/40 cursor-pointer"
                  onClick={() => toggleCategory(category.name)}
                >
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category.findings[0]?.category || "")}
                    <h3 className="font-medium capitalize">{category.name}</h3>
                    <div className="text-xs text-muted-foreground">
                      {category.findings.filter(finding => finding.status === "resolved").length} / {category.findings.length} resolved
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {expandedCategories[category.name] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </div>
                
                {expandedCategories[category.name] && (
                  <div className="p-3 space-y-3">
                    {category.findings.map((finding) => (
                      <div 
                        key={finding.id} 
                        className={`rounded-lg border p-3 ${
                          finding.status === "resolved" ? "border-green-200 bg-green-50 dark:bg-green-900/10" : 
                          finding.severity === "critical" ? "border-red-200 bg-red-50 dark:bg-red-900/10" : 
                          finding.severity === "high" ? "border-amber-200 bg-amber-50 dark:bg-amber-900/10" : 
                          finding.severity === "medium" ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/10" : 
                          "border-blue-200 bg-blue-50 dark:bg-blue-900/10"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            {finding.status === "resolved" ? 
                              getStatusIcon(finding.status) : 
                              getSeverityIcon(finding.severity)}
                            <div>
                              <h4 className="font-medium">{finding.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{finding.description}</p>
                              
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                {getSeverityBadge(finding.severity)}
                                {getStatusBadge(finding.status)}
                                <span className="text-xs text-muted-foreground">{finding.resource}</span>
                              </div>
                              
                              <div className="mt-2 text-sm">
                                <span className="font-medium">Remediation: </span>
                                {finding.remediation}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {!isFullPage && (
            <Button variant="outline" size="sm" className="w-full">
              <Shield className="h-4 w-4 mr-2" />
              View Full Security Report
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
