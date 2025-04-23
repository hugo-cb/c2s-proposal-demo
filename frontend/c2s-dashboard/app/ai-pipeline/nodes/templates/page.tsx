'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { AIPipelineNavigation } from "@/components/ai-pipeline/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppShell } from "@/components/layout/app-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Parameter {
  name: string;
  type: string;
}

interface Function {
  id: string;
  name: string;
  description?: string;
  inputs: Parameter[];
  outputs: Parameter[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  function: Function;
}

// Mock data - replace with API call
const mockTemplates: Template[] = [
  {
    id: 'template_1',
    name: 'Text Analysis',
    description: 'A template for analyzing text content using LLM',
    function: {
      id: 'func_1',
      name: 'TextAnalyzer',
      description: 'Analyzes text content using LLM',
      inputs: [
        { name: 'text', type: 'string' },
        { name: 'analysis_type', type: 'string' }
      ],
      outputs: [
        { name: 'sentiment', type: 'float' },
        { name: 'entities', type: 'array' }
      ]
    }
  },
  {
    id: 'template_2',
    name: 'Code Quality Analysis',
    description: 'A template for evaluating code quality',
    function: {
      id: 'func_2',
      name: 'CodeQualityAnalyzer',
      description: 'Evaluates code quality and suggests improvements',
      inputs: [
        { name: 'code', type: 'string' },
        { name: 'language', type: 'string' }
      ],
      outputs: [
        { name: 'quality_score', type: 'float' },
        { name: 'suggestions', type: 'array' }
      ]
    }
  }
];

export default function TemplatesPage() {
  const router = useRouter();

  return (
    <AppShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">AI Pipeline</h2>
        </div>

        <div className="space-y-4">
          <AIPipelineNavigation />

          <Tabs defaultValue="templates" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="nodes" onClick={() => router.push('/ai-pipeline/nodes')}>
                  All Nodes
                </TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="functions" onClick={() => router.push('/ai-pipeline/functions')}>
                  Custom Functions
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="templates" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">Node Templates</h1>
                  <p className="text-muted-foreground mt-2">
                    Pre-configured node templates to help you get started
                  </p>
                </div>
              </div>

              <div className="grid gap-6">
                {mockTemplates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle>{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </div>
                        <Button
                          variant="secondary"
                          onClick={() => router.push(`/ai-pipeline/nodes?template=${template.id}`)}
                        >
                          Use Template
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-2">Inputs</h4>
                          <div className="flex flex-wrap gap-2">
                            {template.function.inputs.map((input) => (
                              <Badge key={input.name} variant="outline">
                                {input.name}: {input.type}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2">Outputs</h4>
                          <div className="flex flex-wrap gap-2">
                            {template.function.outputs.map((output) => (
                              <Badge key={output.name} variant="outline">
                                {output.name}: {output.type}
                              </Badge>
                            ))}
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
      </div>
    </AppShell>
  );
}
