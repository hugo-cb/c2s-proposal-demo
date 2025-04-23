'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppShell } from "@/components/layout/app-shell";
import { AIPipelineNavigation } from "@/components/ai-pipeline/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FunctionFormDialog } from '@/components/ai-pipeline/functions/function-form-dialog';
import { Badge } from '@/components/ui/badge';
import { MonacoEditor } from '@/components/ui/monaco-editor';

const parameterTypes = [
  'string',
  'number',
  'boolean',
  'array',
  'object',
  'any'
] as const;

type ParameterType = typeof parameterTypes[number];

interface Parameter {
  name: string;
  type: ParameterType;
}

interface Function {
  id: string;
  name: string;
  description?: string;
  inputs: Parameter[];
  outputs: Parameter[];
  code_language: 'python' | 'javascript';
  implementation: string;
}

type FunctionFormValues = Omit<Function, 'id'>;

// Mock data - replace with API call
const mockFunctions: Function[] = [
  {
    id: 'func_1',
    name: 'TextAnalyzer',
    description: 'Analyzes text content using LLM',
    code_language: 'python',
    implementation: `def analyze_text(text: str, analysis_type: str) -> dict:
    # Implementation here
    return {
        "sentiment": 0.8,
        "entities": ["example"]
    }`,
    inputs: [
      { name: 'text', type: 'string' },
      { name: 'analysis_type', type: 'string' }
    ],
    outputs: [
      { name: 'sentiment', type: 'number' },
      { name: 'entities', type: 'array' }
    ]
  },
  {
    id: 'func_2',
    name: 'CodeQualityAnalyzer',
    description: 'Evaluates code quality and suggests improvements',
    code_language: 'python',
    implementation: `def analyze_code(code: str, language: str) -> dict:
    # Implementation here
    return {
        "quality_score": 0.9,
        "suggestions": ["Use more descriptive names"]
    }`,
    inputs: [
      { name: 'code', type: 'string' },
      { name: 'language', type: 'string' }
    ],
    outputs: [
      { name: 'quality_score', type: 'number' },
      { name: 'suggestions', type: 'array' }
    ]
  }
];

export default function FunctionsPage() {
  const router = useRouter();
  const [functions, setFunctions] = React.useState<Function[]>(mockFunctions);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingFunction, setEditingFunction] = React.useState<Function | null>(null);

  const handleCreateFunction = (values: FunctionFormValues) => {
    const newFunction: Function = {
      id: `func_${Date.now()}`,
      ...values
    };
    setFunctions([...functions, newFunction]);
    setIsDialogOpen(false);
  };

  const handleEditFunction = (func: Function) => {
    setEditingFunction(func);
    setIsDialogOpen(true);
  };

  const handleUpdateFunction = (values: FunctionFormValues) => {
    if (!editingFunction) return;
    
    const updatedFunction: Function = {
      ...values,
      id: editingFunction.id
    };
    
    setFunctions(functions.map(f => f.id === editingFunction.id ? updatedFunction : f));
    setIsDialogOpen(false);
    setEditingFunction(null);
  };

  const handleDeleteFunction = (id: string) => {
    setFunctions(functions.filter(f => f.id !== id));
  };

  return (
    <AppShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">AI Pipeline</h2>
        </div>

        <div className="space-y-4">
          <AIPipelineNavigation />

          <Tabs defaultValue="functions" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="nodes" onClick={() => router.push('/ai-pipeline/nodes')}>
                  All Nodes
                </TabsTrigger>
                <TabsTrigger value="templates" onClick={() => router.push('/ai-pipeline/nodes/templates')}>
                  Templates
                </TabsTrigger>
                <TabsTrigger value="functions">Custom Functions</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="functions" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">Custom Functions</h1>
                  <p className="text-muted-foreground mt-2">
                    Create and manage custom functions for your AI pipeline nodes
                  </p>
                </div>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Function
                </Button>
              </div>

              <div className="grid gap-6">
                {functions.map((func) => (
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
                          <h4 className="text-sm font-semibold mb-2">Language</h4>
                          <Badge variant="secondary">
                            {func.code_language.charAt(0).toUpperCase() + func.code_language.slice(1)}
                          </Badge>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2">Inputs</h4>
                          <div className="flex flex-wrap gap-2">
                            {func.inputs.map((input) => (
                              <Badge key={input.name} variant="outline">
                                {input.name}: {input.type}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2">Outputs</h4>
                          <div className="flex flex-wrap gap-2">
                            {func.outputs.map((output) => (
                              <Badge key={output.name} variant="outline">
                                {output.name}: {output.type}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2">Implementation</h4>
                          <div className="h-[200px] rounded-md border">
                            <MonacoEditor
                              value={func.implementation}
                              onChange={() => {}}
                              language={func.code_language}
                              options={{ readOnly: true }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <FunctionFormDialog
          open={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingFunction(null);
          }}
          onSubmit={editingFunction ? handleUpdateFunction : handleCreateFunction}
          initialValues={editingFunction || undefined}
        />
      </div>
    </AppShell>
  );
}
