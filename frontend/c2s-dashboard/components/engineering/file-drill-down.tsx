"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  FileCode, 
  AlertTriangle, 
  ChevronRight, 
  ChevronDown,
  FolderTree,
  Search,
  ArrowLeft,
  Download,
  Code
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

// Example data for problematic files
const fileData = {
  directories: [
    {
      id: "d1",
      name: "src/controllers",
      issues: 42,
      complexity: 24.5,
      coverage: 68.2,
      files: [
        {
          id: "f1",
          name: "PaymentController.java",
          path: "src/controllers/PaymentController.java",
          issues: 18,
          complexity: 32.7,
          coverage: 62.5,
          lines: 250,
          details: {
            codeSmells: [
              {
                id: "cs1",
                line: 45,
                message: "Method 'processPayment' has 15 parameters, which is greater than the 7 authorized.",
                severity: "critical",
                type: "code-smell"
              },
              {
                id: "cs2",
                line: 72,
                message: "Reduce the number of conditional operators (4) used in the expression",
                severity: "high",
                type: "code-smell"
              }
            ],
            bugs: [
              {
                id: "bug1",
                line: 124,
                message: "Fix or remove this statement; it will lead to a NullPointerException when 'user' is null.",
                severity: "critical",
                type: "bug"
              }
            ],
            vulnerabilities: [
              {
                id: "vuln1",
                line: 156,
                message: "Make sure using this hardcoded IP address is safe here.",
                severity: "high",
                type: "vulnerability"
              }
            ],
            codeSnippets: {
              45: `public boolean processPayment(String userId, String orderId, String paymentMethod, 
  String cardNumber, String expiryDate, String cvv, String billingAddress, 
  String billingCity, String billingState, String billingZip, String billingCountry,
  Double amount, String currency, Boolean saveCard, String promoCode) {
  // Complex payment processing logic
}`,
              72: `if (payment != null && payment.getStatus() != null && 
  payment.getStatus().equals("PENDING") && 
  System.currentTimeMillis() - payment.getCreatedAt() > 3600000) {
  // Handle expired pending payment
}`,
              124: `User user = userRepository.findById(userId);
return user.getPaymentMethods();`,
              156: `String serverAddress = "192.168.1.100";
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("http://" + serverAddress + "/api/payments"))
    .build();`
            }
          }
        },
        {
          id: "f2",
          name: "UserController.java",
          path: "src/controllers/UserController.java",
          issues: 12,
          complexity: 18.3,
          coverage: 72.1,
          lines: 180,
          details: {
            codeSmells: [
              {
                id: "cs3",
                line: 38,
                message: "This method has 35 lines, which is greater than the 25 lines authorized.",
                severity: "medium",
                type: "code-smell"
              }
            ],
            bugs: [],
            vulnerabilities: [
              {
                id: "vuln2",
                line: 92,
                message: "Make sure that using this hardcoded password is safe here.",
                severity: "critical",
                type: "vulnerability"
              }
            ],
            codeSnippets: {
              38: `public ResponseEntity<UserDTO> createUser(UserDTO userDTO) {
  // Method with 35 lines of code
  // ...
}`,
              92: `// Hardcoded credentials for testing
String password = "admin123";
if (user.getRole().equals("ADMIN")) {
  user.setPassword(password);
}`
            }
          }
        }
      ]
    },
    {
      id: "d2",
      name: "src/services",
      issues: 28,
      complexity: 18.7,
      coverage: 75.4,
      files: [
        {
          id: "f3",
          name: "PaymentService.java",
          path: "src/services/PaymentService.java",
          issues: 15,
          complexity: 22.5,
          coverage: 68.9,
          lines: 210,
          details: {
            codeSmells: [
              {
                id: "cs4",
                line: 56,
                message: "Refactor this method to reduce its Cognitive Complexity from 24 to the 15 allowed.",
                severity: "high",
                type: "code-smell"
              }
            ],
            bugs: [
              {
                id: "bug2",
                line: 112,
                message: "Either log or rethrow this exception.",
                severity: "medium",
                type: "bug"
              }
            ],
            vulnerabilities: [],
            codeSnippets: {
              56: `public PaymentResult processPayment(Payment payment) {
  // Complex method with many nested conditions
  if (payment.getType() == PaymentType.CREDIT_CARD) {
    if (payment.getAmount() > 1000) {
      if (!payment.isVerified()) {
        // More nested conditions...
      } else {
        // More nested conditions...
      }
    } else {
      // More nested conditions...
    }
  } else if (payment.getType() == PaymentType.BANK_TRANSFER) {
    // More nested conditions...
  }
  // More code...
}`,
              112: `try {
  // Some code that might throw an exception
} catch (Exception e) {
  // Exception is caught but neither logged nor rethrown
}`
            }
          }
        }
      ]
    }
  ]
};

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'bg-red-500/10 text-red-500 border-red-500/20';
    case 'high':
      return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    case 'medium':
      return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'low':
      return 'bg-green-500/10 text-green-500 border-green-500/20';
    default:
      return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
  }
};

const getIssueTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case 'bug':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    case 'vulnerability':
      return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    case 'code-smell':
      return <Code className="h-4 w-4 text-yellow-500" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
};

export function FileDrillDown() {
  const [expandedDirectories, setExpandedDirectories] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string; name: string; type: string }[]>([]);
  
  const toggleDirectory = (directoryId: string) => {
    if (expandedDirectories.includes(directoryId)) {
      setExpandedDirectories(expandedDirectories.filter(id => id !== directoryId));
    } else {
      setExpandedDirectories([...expandedDirectories, directoryId]);
    }
  };
  
  const selectFile = (file: any, directory: any) => {
    setSelectedFile(file);
    setBreadcrumbs([
      { id: "root", name: "All Directories", type: "root" },
      { id: directory.id, name: directory.name, type: "directory" },
      { id: file.id, name: file.name, type: "file" }
    ]);
  };
  
  const navigateToBreadcrumb = (breadcrumb: { id: string; name: string; type: string }) => {
    if (breadcrumb.type === "root") {
      setSelectedFile(null);
      setBreadcrumbs([]);
    } else if (breadcrumb.type === "directory") {
      setSelectedFile(null);
      setBreadcrumbs([
        { id: "root", name: "All Directories", type: "root" },
        breadcrumb
      ]);
    }
  };
  
  const goBack = () => {
    if (breadcrumbs.length > 1) {
      navigateToBreadcrumb(breadcrumbs[breadcrumbs.length - 2]);
    } else {
      setSelectedFile(null);
      setBreadcrumbs([]);
    }
  };
  
  // Filter directories and files based on search query
  const filteredDirectories = fileData.directories.filter(directory => {
    if (!searchQuery) return true;
    
    const directoryMatches = directory.name.toLowerCase().includes(searchQuery.toLowerCase());
    const filesMatch = directory.files.some(file => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.details.codeSmells.some(smell => 
        smell.message.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      file.details.bugs.some(bug => 
        bug.message.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      file.details.vulnerabilities.some(vuln => 
        vuln.message.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    
    return directoryMatches || filesMatch;
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">
          <div className="flex items-center gap-2">
            <FolderTree className="h-5 w-5" />
            File Explorer
          </div>
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="relative w-[200px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {breadcrumbs.length > 0 && (
          <div className="mb-4 flex items-center gap-1 text-sm">
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={breadcrumb.id} className="flex items-center">
                {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                <Button
                  variant="link"
                  size="sm"
                  className="h-auto p-0"
                  onClick={() => navigateToBreadcrumb(breadcrumb)}
                >
                  {breadcrumb.name}
                </Button>
              </div>
            ))}
          </div>
        )}
        
        {selectedFile ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goBack}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h2 className="text-lg font-medium">{selectedFile.name}</h2>
            </div>
            
            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium mb-1">Issues</h3>
                <p className="text-2xl font-bold">{selectedFile.issues}</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium mb-1">Complexity</h3>
                <p className="text-2xl font-bold">{selectedFile.complexity.toFixed(1)}</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium mb-1">Coverage</h3>
                <p className="text-2xl font-bold">{selectedFile.coverage.toFixed(1)}%</p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium mb-1">Lines</h3>
                <p className="text-2xl font-bold">{selectedFile.lines}</p>
              </div>
            </div>
            
            <Tabs defaultValue="issues">
              <TabsList>
                <TabsTrigger value="issues">Issues</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
              
              <TabsContent value="issues">
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Line</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Severity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        ...selectedFile.details.codeSmells,
                        ...selectedFile.details.bugs,
                        ...selectedFile.details.vulnerabilities
                      ].sort((a, b) => {
                        const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
                        return (
                          severityOrder[a.severity as keyof typeof severityOrder] - 
                          severityOrder[b.severity as keyof typeof severityOrder]
                        );
                      }).map((issue) => (
                        <TableRow key={issue.id}>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getIssueTypeIcon(issue.type)}
                              <span className="capitalize">{issue.type.replace('-', ' ')}</span>
                            </div>
                          </TableCell>
                          <TableCell>{issue.line}</TableCell>
                          <TableCell>{issue.message}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              className={getSeverityColor(issue.severity)}
                            >
                              {issue.severity}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="code">
                <div className="space-y-4">
                  {Object.entries(selectedFile.details.codeSnippets).map(([line, snippet]) => (
                    <div key={line} className="rounded-lg border overflow-hidden">
                      <div className="bg-muted p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileCode className="h-4 w-4" />
                          <span className="text-sm font-medium">Line {line}</span>
                        </div>
                        {selectedFile.details.codeSmells.some((smell: any) => smell.line.toString() === line) && (
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                            Code Smell
                          </Badge>
                        )}
                        {selectedFile.details.bugs.some((bug: any) => bug.line.toString() === line) && (
                          <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                            Bug
                          </Badge>
                        )}
                        {selectedFile.details.vulnerabilities.some((vuln: any) => vuln.line.toString() === line) && (
                          <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                            Vulnerability
                          </Badge>
                        )}
                      </div>
                      <div className="p-4 bg-muted/30">
                        <pre className="text-xs overflow-x-auto">
                          <code>{snippet as string}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Issues</TableHead>
                  <TableHead className="text-right">Complexity</TableHead>
                  <TableHead className="text-right">Coverage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDirectories.map((directory) => (
                  <React.Fragment key={directory.id}>
                    <TableRow 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => toggleDirectory(directory.id)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {expandedDirectories.includes(directory.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <FolderTree className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{directory.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                          {directory.issues}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{directory.complexity.toFixed(1)}</TableCell>
                      <TableCell className="text-right">{directory.coverage.toFixed(1)}%</TableCell>
                    </TableRow>
                    
                    {expandedDirectories.includes(directory.id) && (
                      <>
                        {directory.files
                          .filter(file => !searchQuery || file.name.toLowerCase().includes(searchQuery.toLowerCase()))
                          .map((file) => (
                            <TableRow 
                              key={file.id}
                              className="cursor-pointer hover:bg-muted/50"
                              onClick={() => selectFile(file, directory)}
                            >
                              <TableCell>
                                <div className="flex items-center gap-2 pl-6">
                                  <FileCode className="h-4 w-4 text-muted-foreground" />
                                  <span>{file.name}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                                  {file.issues}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">{file.complexity.toFixed(1)}</TableCell>
                              <TableCell className="text-right">{file.coverage.toFixed(1)}%</TableCell>
                            </TableRow>
                          ))}
                      </>
                    )}
                  </React.Fragment>
                ))}
                
                {filteredDirectories.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      No files or directories match your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
