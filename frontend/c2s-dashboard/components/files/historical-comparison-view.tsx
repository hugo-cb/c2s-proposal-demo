"use client";

import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  RefreshCw, 
  GitBranch, 
  GitCommit,
  ArrowLeftRight,
  FileCode,
  AlertCircle,
  Plus,
  Minus,
  Clock,
  CheckCircle
} from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface HistoricalComparisonViewProps {
  filePath: string | null;
}

interface CommitVersion {
  id: string;
  hash: string;
  shortHash: string;
  message: string;
  author: string;
  date: string;
}

interface DiffBlock {
  type: 'added' | 'removed' | 'unchanged';
  content: string[];
  lineNumbers: {
    old: number | null;
    new: number | null;
  }[];
}

export function HistoricalComparisonView({ filePath }: HistoricalComparisonViewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [versions, setVersions] = useState<CommitVersion[]>([]);
  const [selectedVersionA, setSelectedVersionA] = useState<string>("");
  const [selectedVersionB, setSelectedVersionB] = useState<string>("");
  const [diffBlocks, setDiffBlocks] = useState<DiffBlock[]>([]);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [viewMode, setViewMode] = useState<"split" | "unified">("split");

  // Sample versions data - in a real app, this would come from an API
  useEffect(() => {
    if (!filePath) return;
    
    setIsLoading(true);
    // Simulate API call to get file versions
    setTimeout(() => {
      const sampleVersions: CommitVersion[] = [
        {
          id: "1",
          hash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
          shortHash: "a1b2c3d",
          message: "Fix button styling issues",
          author: "John Doe",
          date: "2025-04-07T10:15:00Z"
        },
        {
          id: "2",
          hash: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1",
          shortHash: "b2c3d4e",
          message: "Update component props",
          author: "Jane Smith",
          date: "2025-04-05T14:30:00Z"
        },
        {
          id: "3",
          hash: "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2",
          shortHash: "c3d4e5f",
          message: "Initial implementation",
          author: "Mike Johnson",
          date: "2025-04-03T09:20:00Z"
        }
      ];
      
      setVersions(sampleVersions);
      if (sampleVersions.length >= 2) {
        setSelectedVersionA(sampleVersions[0].id);
        setSelectedVersionB(sampleVersions[1].id);
      }
      setIsLoading(false);
    }, 500);
  }, [filePath]);

  // Sample diff data - in a real app, this would come from an API
  useEffect(() => {
    if (!selectedVersionA || !selectedVersionB) return;
    
    setIsLoading(true);
    // Simulate API call to get diff between versions
    setTimeout(() => {
      const sampleDiffBlocks: DiffBlock[] = [
        {
          type: 'unchanged',
          content: [
            'import React, { useState } from "react";',
            'import { Button } from "./Button";',
            'import { Input } from "./Input";',
            '',
            'interface FormProps {',
            '  onSubmit: (data: FormData) => void;',
            '  initialValues?: FormData;',
            '  isLoading?: boolean;',
            '}',
            ''
          ],
          lineNumbers: Array.from({ length: 10 }, (_, i) => ({ old: i + 1, new: i + 1 }))
        },
        {
          type: 'removed',
          content: [
            'interface FormData {',
            '  name: string;',
            '  email: string;',
            '}'
          ],
          lineNumbers: Array.from({ length: 4 }, (_, i) => ({ old: i + 11, new: null }))
        },
        {
          type: 'added',
          content: [
            'interface FormData {',
            '  name: string;',
            '  email: string;',
            '  message: string;',
            '}'
          ],
          lineNumbers: Array.from({ length: 5 }, (_, i) => ({ old: null, new: i + 11 }))
        },
        {
          type: 'unchanged',
          content: [
            '',
            'export function ContactForm({ onSubmit, initialValues, isLoading = false }: FormProps) {',
            '  const [formData, setFormData] = useState<FormData>(initialValues || {',
            '    name: "",',
            '    email: "",',
          ],
          lineNumbers: Array.from({ length: 5 }, (_, i) => ({ old: i + 15, new: i + 16 }))
        },
        {
          type: 'removed',
          content: [
            '  });',
            ''
          ],
          lineNumbers: Array.from({ length: 2 }, (_, i) => ({ old: i + 20, new: null }))
        },
        {
          type: 'added',
          content: [
            '    message: ""',
            '  });',
            '',
            '  const [errors, setErrors] = useState<Partial<FormData>>({});',
            ''
          ],
          lineNumbers: Array.from({ length: 5 }, (_, i) => ({ old: null, new: i + 21 }))
        },
        {
          type: 'unchanged',
          content: [
            '  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {',
            '    const { name, value } = e.target;',
            '    setFormData(prev => ({',
            '      ...prev,',
            '      [name]: value',
            '    }));',
            ''
          ],
          lineNumbers: Array.from({ length: 7 }, (_, i) => ({ old: i + 22, new: i + 26 }))
        },
        {
          type: 'added',
          content: [
            '    // Clear error when field is edited',
            '    if (errors[name as keyof FormData]) {',
            '      setErrors(prev => ({',
            '        ...prev,',
            '        [name]: undefined',
            '      }));',
            '    }',
            ''
          ],
          lineNumbers: Array.from({ length: 8 }, (_, i) => ({ old: null, new: i + 33 }))
        },
        {
          type: 'unchanged',
          content: [
            '  };',
            ''
          ],
          lineNumbers: Array.from({ length: 2 }, (_, i) => ({ old: i + 29, new: i + 41 }))
        },
        {
          type: 'removed',
          content: [
            '  const handleSubmit = (e: React.FormEvent) => {',
            '    e.preventDefault();',
            '    onSubmit(formData);',
            '  };',
            ''
          ],
          lineNumbers: Array.from({ length: 5 }, (_, i) => ({ old: i + 31, new: null }))
        },
        {
          type: 'added',
          content: [
            '  const validate = (): boolean => {',
            '    const newErrors: Partial<FormData> = {};',
            '    ',
            '    if (!formData.name.trim()) {',
            '      newErrors.name = "Name is required";',
            '    }',
            '    ',
            '    if (!formData.email.trim()) {',
            '      newErrors.email = "Email is required";',
            '    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i.test(formData.email)) {',
            '      newErrors.email = "Invalid email address";',
            '    }',
            '    ',
            '    if (!formData.message.trim()) {',
            '      newErrors.message = "Message is required";',
            '    }',
            '    ',
            '    setErrors(newErrors);',
            '    return Object.keys(newErrors).length === 0;',
            '  };',
            '  ',
            '  const handleSubmit = (e: React.FormEvent) => {',
            '    e.preventDefault();',
            '    ',
            '    if (validate()) {',
            '      onSubmit(formData);',
            '    }',
            '  };',
            ''
          ],
          lineNumbers: Array.from({ length: 26 }, (_, i) => ({ old: null, new: i + 43 }))
        }
      ];
      
      setDiffBlocks(sampleDiffBlocks);
      setIsLoading(false);
    }, 500);
  }, [selectedVersionA, selectedVersionB]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Get relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffDay > 30) {
      return formatDate(dateString);
    }
    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    }
    if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    }
    if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    }
    return 'Just now';
  };

  // Get file extension
  const getFileExtension = (path: string | null) => {
    if (!path) return 'txt';
    const parts = path.split('.');
    return parts[parts.length - 1];
  };

  // Get language for syntax highlighting
  const getLanguage = (extension: string) => {
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'jsx':
        return 'jsx';
      case 'ts':
        return 'typescript';
      case 'tsx':
        return 'tsx';
      case 'css':
        return 'css';
      case 'html':
        return 'html';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      default:
        return 'text';
    }
  };

  // Swap versions
  const swapVersions = () => {
    setSelectedVersionA(selectedVersionB);
    setSelectedVersionB(selectedVersionA);
  };

  // Get version details by ID
  const getVersionById = (id: string) => {
    return versions.find(version => version.id === id);
  };

  // Render diff blocks for unified view
  const renderUnifiedDiff = () => {
    return (
      <div className="w-full">
        <SyntaxHighlighter
          language={getLanguage(getFileExtension(filePath))}
          style={theme === 'dark' ? vscDarkPlus : vs}
          showLineNumbers
          wrapLines
          lineProps={(lineNumber) => {
            // Find the block that contains this line
            let currentLine = 0;
            for (const block of diffBlocks) {
              if (lineNumber >= currentLine && lineNumber < currentLine + block.content.length) {
                const blockType = block.type;
                if (blockType === 'added') {
                  return { style: { backgroundColor: theme === 'dark' ? 'rgba(0, 100, 0, 0.2)' : 'rgba(200, 255, 200, 0.5)' } };
                } else if (blockType === 'removed') {
                  return { style: { backgroundColor: theme === 'dark' ? 'rgba(100, 0, 0, 0.2)' : 'rgba(255, 200, 200, 0.5)' } };
                }
                return {};
              }
              currentLine += block.content.length;
            }
            return {};
          }}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
          }}
        >
          {diffBlocks.map(block => block.content.join('\n')).join('\n')}
        </SyntaxHighlighter>
      </div>
    );
  };

  // Render diff blocks for split view
  const renderSplitDiff = () => {
    // Prepare left and right content
    const leftContent: string[] = [];
    const rightContent: string[] = [];
    
    diffBlocks.forEach(block => {
      if (block.type === 'unchanged') {
        block.content.forEach(() => {
          leftContent.push(block.content.join('\n'));
          rightContent.push(block.content.join('\n'));
        });
      } else if (block.type === 'removed') {
        block.content.forEach(() => {
          leftContent.push(block.content.join('\n'));
          rightContent.push('');
        });
      } else if (block.type === 'added') {
        block.content.forEach(() => {
          leftContent.push('');
          rightContent.push(block.content.join('\n'));
        });
      }
    });

    return (
      <div className="grid grid-cols-2 gap-2 w-full">
        <div>
          <div className="text-sm font-medium mb-2 text-muted-foreground">
            {getVersionById(selectedVersionA)?.shortHash} ({getVersionById(selectedVersionA)?.message})
          </div>
          <SyntaxHighlighter
            language={getLanguage(getFileExtension(filePath))}
            style={theme === 'dark' ? vscDarkPlus : vs}
            showLineNumbers
            wrapLines
            lineProps={(lineNumber) => {
              // Find the block that contains this line
              let currentLine = 0;
              for (const block of diffBlocks) {
                if (lineNumber >= currentLine && lineNumber < currentLine + block.content.length) {
                  if (block.type === 'removed') {
                    return { style: { backgroundColor: theme === 'dark' ? 'rgba(100, 0, 0, 0.2)' : 'rgba(255, 200, 200, 0.5)' } };
                  }
                  return {};
                }
                currentLine += block.content.length;
              }
              return {};
            }}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
            }}
          >
            {diffBlocks.map(block => {
              if (block.type === 'added') {
                return Array(block.content.length).fill('').join('\n');
              }
              return block.content.join('\n');
            }).join('\n')}
          </SyntaxHighlighter>
        </div>
        <div>
          <div className="text-sm font-medium mb-2 text-muted-foreground">
            {getVersionById(selectedVersionB)?.shortHash} ({getVersionById(selectedVersionB)?.message})
          </div>
          <SyntaxHighlighter
            language={getLanguage(getFileExtension(filePath))}
            style={theme === 'dark' ? vscDarkPlus : vs}
            showLineNumbers
            wrapLines
            lineProps={(lineNumber) => {
              // Find the block that contains this line
              let currentLine = 0;
              for (const block of diffBlocks) {
                if (lineNumber >= currentLine && lineNumber < currentLine + block.content.length) {
                  if (block.type === 'added') {
                    return { style: { backgroundColor: theme === 'dark' ? 'rgba(0, 100, 0, 0.2)' : 'rgba(200, 255, 200, 0.5)' } };
                  }
                  return {};
                }
                currentLine += block.content.length;
              }
              return {};
            }}
            customStyle={{
              margin: 0,
              padding: '1rem',
              background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
            }}
          >
            {diffBlocks.map(block => {
              if (block.type === 'removed') {
                return Array(block.content.length).fill('').join('\n');
              }
              return block.content.join('\n');
            }).join('\n')}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  };

  // Refresh data
  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  if (!filePath) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center h-[400px] gap-2 text-muted-foreground">
          <FileCode className="h-8 w-8" />
          <p>Select a file to compare versions</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <FileCode className="h-5 w-5 text-blue-500" />
              Historical Comparison: {filePath.split('/').pop()}
            </CardTitle>
            <CardDescription>
              Compare different versions of the file
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "split" | "unified")} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="split">Split</TabsTrigger>
                <TabsTrigger value="unified">Unified</TabsTrigger>
              </TabsList>
            </Tabs>
            <Tabs value={theme} onValueChange={(value) => setTheme(value as "light" | "dark")} className="w-[120px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="light">Light</TabsTrigger>
                <TabsTrigger value="dark">Dark</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="ghost" size="icon" onClick={refreshData} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <GitCommit className="h-4 w-4 text-muted-foreground" />
              <Select
                value={selectedVersionA}
                onValueChange={setSelectedVersionA}
                disabled={isLoading || versions.length === 0}
              >
                <SelectTrigger className="w-full md:w-[250px]">
                  <SelectValue placeholder="Select version A" />
                </SelectTrigger>
                <SelectContent>
                  {versions.map(version => (
                    <SelectItem key={version.id} value={version.id}>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{version.shortHash}</span>
                        <span className="truncate">{version.message}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {getRelativeTime(version.date)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={swapVersions}
              disabled={isLoading || !selectedVersionA || !selectedVersionB}
              className="flex-shrink-0"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <GitCommit className="h-4 w-4 text-muted-foreground" />
              <Select
                value={selectedVersionB}
                onValueChange={setSelectedVersionB}
                disabled={isLoading || versions.length === 0}
              >
                <SelectTrigger className="w-full md:w-[250px]">
                  <SelectValue placeholder="Select version B" />
                </SelectTrigger>
                <SelectContent>
                  {versions.map(version => (
                    <SelectItem key={version.id} value={version.id}>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{version.shortHash}</span>
                        <span className="truncate">{version.message}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {getRelativeTime(version.date)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {selectedVersionA && selectedVersionB && (
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Plus className="h-3 w-3 text-green-500" />
                <span>Added</span>
              </div>
              <div className="flex items-center gap-1">
                <Minus className="h-3 w-3 text-red-500" />
                <span>Removed</span>
              </div>
              <div className="flex items-center gap-1 ml-auto">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {getVersionById(selectedVersionA)?.author} → {getVersionById(selectedVersionB)?.author}
                </span>
              </div>
            </div>
          )}
          
          <div className="border rounded-md overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center h-[400px]">
                <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : versions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] gap-2 text-muted-foreground">
                <AlertCircle className="h-8 w-8" />
                <p>No version history available for this file</p>
              </div>
            ) : !selectedVersionA || !selectedVersionB ? (
              <div className="flex flex-col items-center justify-center h-[400px] gap-2 text-muted-foreground">
                <GitBranch className="h-8 w-8" />
                <p>Select two versions to compare</p>
              </div>
            ) : diffBlocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[400px] gap-2 text-muted-foreground">
                <CheckCircle className="h-8 w-8" />
                <p>No differences found between these versions</p>
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                {viewMode === 'unified' ? renderUnifiedDiff() : renderSplitDiff()}
              </ScrollArea>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
