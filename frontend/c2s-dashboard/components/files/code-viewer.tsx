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
  Copy, 
  Check, 
  Download, 
  Clock, 
  GitBranch,
  FileCode
} from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeViewerProps {
  filePath: string;
}

export function CodeViewer({ filePath }: CodeViewerProps) {
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<string>("current");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [metadata, setMetadata] = useState<any | null>(null);

  // Sample code data - in a real app, this would come from an API
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call to get file content
    setTimeout(() => {
      let sampleCode = "";
      
      if (filePath.endsWith(".tsx") || filePath.endsWith(".jsx")) {
        sampleCode = `import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';

interface FormProps {
  onSubmit: (data: FormData) => void;
  initialValues?: FormData;
  isLoading?: boolean;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm({ onSubmit, initialValues, isLoading = false }: FormProps) {
  const [formData, setFormData] = useState<FormData>(initialValues || {
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Partial<FormData>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
        
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'border-red-500' : ''}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={\`w-full rounded-md border p-2 \${errors.message ? 'border-red-500' : 'border-gray-300'}\`}
            disabled={isLoading}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>
        
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Card>
  );
}`;
      } else if (filePath.endsWith(".ts")) {
        sampleCode = `/**
 * Utility functions for data formatting and validation
 */

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
}

/**
 * Format a date to a human-readable string
 * @param date - The date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

/**
 * Validate an email address
 * @param email - The email to validate
 * @returns Whether the email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

/**
 * Format a file size in bytes to a human-readable string
 * @param bytes - The file size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Truncate a string to a specified length and add ellipsis
 * @param str - The string to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated string
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
}

/**
 * Get user display name based on user object
 * @param user - User object
 * @returns Formatted user display name
 */
export function getUserDisplayName(user: User): string {
  return user.name || user.email.split('@')[0];
}

/**
 * Check if a user has admin permissions
 * @param user - User to check
 * @returns Whether the user is an admin
 */
export function isAdmin(user: User): boolean {
  return user.role === 'admin';
}`;
      } else if (filePath.endsWith(".css")) {
        sampleCode = `/* Global styles */
:root {
  --primary: #3b82f6;
  --primary-hover: #2563eb;
  --secondary: #10b981;
  --secondary-hover: #059669;
  --background: #ffffff;
  --foreground: #0f172a;
  --muted: #f1f5f9;
  --muted-foreground: #64748b;
  --border: #e2e8f0;
  --input: #e2e8f0;
  --ring: #3b82f6;
  --radius: 0.5rem;
}

.dark {
  --background: #0f172a;
  --foreground: #f8fafc;
  --muted: #1e293b;
  --muted-foreground: #94a3b8;
  --border: #1e293b;
  --input: #1e293b;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--background);
  color: var(--foreground);
  line-height: 1.5;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.25;
}

h1 {
  font-size: 2.25rem;
}

h2 {
  font-size: 1.875rem;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  font-size: 1.25rem;
}

a {
  color: var(--primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius);
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
}

.btn-secondary {
  background-color: var(--secondary);
  color: white;
  border: none;
}

.btn-secondary:hover {
  background-color: var(--secondary-hover);
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--border);
  color: var(--foreground);
}

.btn-outline:hover {
  background-color: var(--muted);
}

/* Form styles */
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--input);
  border-radius: var(--radius);
  background-color: var(--background);
  color: var(--foreground);
}

.form-input:focus {
  outline: none;
  border-color: var(--ring);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
}`;
      } else if (filePath.endsWith(".json")) {
        sampleCode = `{
  "name": "my-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.4",
    "@radix-ui/react-dropdown-menu": "^2.0.5",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^1.2.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.4",
    "@tanstack/react-table": "^8.9.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "date-fns": "^2.30.0",
    "lucide-react": "^0.263.1",
    "next": "13.4.12",
    "next-themes": "^0.2.1",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-syntax-highlighter": "^15.5.0",
    "tailwind-merge": "^1.14.0",
    "tailwindcss-animate": "^1.0.6",
    "zod": "^3.21.4"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^14.0.0",
    "@types/node": "20.4.5",
    "@types/react": "18.2.17",
    "@types/react-dom": "18.2.7",
    "@types/react-syntax-highlighter": "^15.5.7",
    "autoprefixer": "10.4.14",
    "eslint": "8.46.0",
    "eslint-config-next": "13.4.12",
    "jest": "^29.6.2",
    "jest-environment-jsdom": "^29.6.2",
    "postcss": "8.4.27",
    "tailwindcss": "3.3.3",
    "typescript": "5.1.6"
  }
}`;
      } else if (filePath.endsWith(".md")) {
        sampleCode = `# Project Documentation

## Overview

This project is a modern web application built with React, Next.js, and TypeScript. It provides a comprehensive dashboard for monitoring and analyzing software quality metrics across different perspectives: Engineering, Architecture, Infrastructure, and Business.

## Features

- **File Explorer & History**: Browse project files, view code, and analyze historical changes
- **Commit History Timeline**: Track changes over time with detailed commit information
- **Code Quality Metrics**: Analyze complexity, test coverage, and other quality indicators
- **Historical Comparison**: Compare different versions of files to track changes
- **Activity Heatmap**: Visualize file activity patterns over time

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- pnpm 7.x or higher

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/your-username/your-project.git
   cd your-project
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   pnpm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   pnpm dev
   \`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/                # Next.js app directory
│   ├── dashboard/      # Dashboard page
│   ├── files/          # File explorer page
│   ├── settings/       # Settings page
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── files/          # File explorer components
│   ├── layout/         # Layout components
│   └── ui/             # UI components
├── lib/                # Utility functions and hooks
├── public/             # Static assets
└── styles/             # Global styles
\`\`\`

## Technologies

- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **State Management**: React Context API
- **Data Fetching**: React Query
- **Code Highlighting**: React Syntax Highlighter

## Contributing

1. Fork the repository
2. Create your feature branch: \`git checkout -b feature/my-feature\`
3. Commit your changes: \`git commit -m 'Add some feature'\`
4. Push to the branch: \`git push origin feature/my-feature\`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.`;
      } else {
        sampleCode = `// Sample code for ${filePath}
// This is a placeholder for demonstration purposes`;
      }
      
      setCode(sampleCode);
      setIsLoading(false);
    }, 500);
  }, [filePath, selectedVersion]);

  useEffect(() => {
    if (filePath) {
      // Mock metadata - replace with actual data fetching logic
      const mockMetadata = {
        fileSize: "123 KB",
        lastModified: "2024-04-07",
        characterCount: 12345,
        lineCount: 500,
      };
      setMetadata(mockMetadata);
    } else {
      setMetadata(null);
    }
  }, [filePath]);

  // Get file extension
  const getFileExtension = (path: string) => {
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

  // Copy code to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download file
  const downloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filePath.split('/').pop() || 'file';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <FileCode className="h-5 w-5 text-blue-500" />
              {filePath.split('/').pop()}
            </CardTitle>
            <CardDescription>
              {filePath}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-muted-foreground" />
              <Select
                value={selectedVersion}
                onValueChange={setSelectedVersion}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="previous">Previous (1 day ago)</SelectItem>
                  <SelectItem value="week">Last Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Tabs value={theme} onValueChange={(value) => setTheme(value as "light" | "dark")} className="w-[120px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="light">Light</TabsTrigger>
                <TabsTrigger value="dark">Dark</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Last modified: April 7, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={downloadFile}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
          
          <div className="border rounded-md overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center h-[400px]">
                <RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ScrollArea className="h-[400px]">
                <SyntaxHighlighter
                  language={getLanguage(getFileExtension(filePath))}
                  style={theme === 'dark' ? vscDarkPlus : vs}
                  showLineNumbers
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    background: theme === 'dark' ? '#1e1e1e' : '#ffffff',
                  }}
                >
                  {code}
                </SyntaxHighlighter>
              </ScrollArea>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium">Metadata</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <strong>File Size:</strong> {metadata?.fileSize}
              </div>
              <div>
                <strong>Last Modified:</strong> {metadata?.lastModified}
              </div>
              <div>
                <strong>Character Count:</strong> {metadata?.characterCount}
              </div>
              <div>
                <strong>Line Count:</strong> {metadata?.lineCount}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
