'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { NodeList } from '@/components/ai-pipeline/nodes/node-list';
import { NodeFormDialog } from '@/components/ai-pipeline/nodes/node-form-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppShell } from "@/components/layout/app-shell";
import { AIPipelineNavigation } from "@/components/ai-pipeline/navigation";

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

interface Node {
  id: string;
  name: string;
  function: Function;
}

// Mock data - replace with API call
const mockNodes: Node[] = [
  {
    id: 'node_1',
    name: 'Text Analysis Node',
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
    id: 'node_2',
    name: 'Code Quality Check',
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

export default function NodesPage() {
  const router = useRouter();
  const [nodes, setNodes] = React.useState<Node[]>(mockNodes);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingNode, setEditingNode] = React.useState<Node | null>(null);

  const handleCreateNode = (values: { name: string; function: Function }) => {
    const newNode: Node = {
      id: `node_${Date.now()}`,
      ...values
    };
    setNodes([...nodes, newNode]);
    setIsDialogOpen(false);
  };

  const handleEditNode = (node: Node) => {
    setEditingNode(node);
    setIsDialogOpen(true);
  };

  const handleUpdateNode = (values: { name: string; function: Function }) => {
    if (!editingNode) return;
    
    const updatedNode: Node = {
      ...values,
      id: editingNode.id
    };
    
    setNodes(nodes.map(n => n.id === editingNode.id ? updatedNode : n));
    setIsDialogOpen(false);
    setEditingNode(null);
  };

  const handleDeleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  return (
    <AppShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">AI Pipeline</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Node
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <AIPipelineNavigation />

          <Tabs defaultValue="nodes" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="nodes">All Nodes</TabsTrigger>
                <TabsTrigger value="templates" onClick={() => router.push('/ai-pipeline/nodes/templates')}>
                  Templates
                </TabsTrigger>
                <TabsTrigger value="functions" onClick={() => router.push('/ai-pipeline/functions')}>
                  Custom Functions
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="nodes" className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold">Nodes</h1>
                  <p className="text-muted-foreground mt-2">
                    Manage your AI pipeline nodes
                  </p>
                </div>
              </div>

              <NodeList
                nodes={nodes}
                onEdit={handleEditNode}
                onDelete={handleDeleteNode}
              />
            </TabsContent>
          </Tabs>
        </div>

        <NodeFormDialog
          open={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingNode(null);
          }}
          onSubmit={editingNode ? handleUpdateNode : handleCreateNode}
          onCreateFunction={() => router.push('/ai-pipeline/functions')}
          initialValues={
            editingNode
              ? {
                  id: editingNode.id,
                  name: editingNode.name,
                  functionId: editingNode.function.id,
                }
              : undefined
          }
        />
      </div>
    </AppShell>
  );
}
