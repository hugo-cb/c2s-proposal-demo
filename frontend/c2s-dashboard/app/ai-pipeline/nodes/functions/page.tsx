'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { AIPipelineNavigation } from "@/components/ai-pipeline/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const mockFunctions = [
  {
    id: 'func_1',
    name: 'CustomCodeAnalyzer',
    description: 'Analyzes code quality and patterns',
    signature: '(code: str, language: str) -> dict',
    language: 'python',
    created_at: '2025-04-01T10:00:00Z',
    updated_at: '2025-04-10T15:30:00Z'
  },
  {
    id: 'func_2',
    name: 'DataTransformer',
    description: 'Transforms data between different formats',
    signature: '(data: any, input_format: str, output_format: str) -> any',
    language: 'python',
    created_at: '2025-04-05T09:00:00Z',
    updated_at: '2025-04-05T09:00:00Z'
  }
];

export default function FunctionsPage() {
  const handleCreateFunction = () => {
    // TODO: Implement function creation
    console.log('Create function');
  };

  const handleEditFunction = (func: any) => {
    // TODO: Implement function editing
    console.log('Edit function:', func);
  };

  const handleDeleteFunction = (funcId: string) => {
    // TODO: Implement function deletion
    console.log('Delete function:', funcId);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">AI Pipeline</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={handleCreateFunction}>Create Function</Button>
        </div>
      </div>

      <div className="space-y-4">
        <AIPipelineNavigation />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockFunctions.map((func) => (
            <Card key={func.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{func.name}</CardTitle>
                    <CardDescription>{func.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditFunction(func)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleDeleteFunction(func.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Signature</h4>
                    <code className="text-sm bg-muted p-2 rounded-md block">
                      {func.signature}
                    </code>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">{func.language}</Badge>
                    <span className="text-xs text-muted-foreground">
                      Updated {new Date(func.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
