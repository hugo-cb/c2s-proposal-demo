'use client';

import React, { useState } from 'react';
import { Node, Edge } from 'reactflow';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/layout/app-shell';
import { AIPipelineNavigation } from '@/components/ai-pipeline/navigation';
import { FlowEditor } from '@/components/ai-pipeline/flows/flow-editor';
import { useFlowStore } from '@/components/ai-pipeline/flows/flow-store';
import { NodeData } from '@/components/ai-pipeline/flows/custom-node';
import { EdgeData } from '@/components/ai-pipeline/flows/custom-edge';
import { FlowFormDialog } from '@/components/ai-pipeline/flows/flow-form-dialog';
import { FlowExecution } from '@/components/ai-pipeline/flows/flow-execution';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

// Sample data - replace with API call
const mockNodes: Node<NodeData>[] = [
  {
    id: 'node-1',
    type: 'customNode',
    position: { x: 100, y: 100 },
    data: {
      name: 'Text Analyzer',
      inputs: [
        { name: 'text', type: 'string' },
        { name: 'analysis_type', type: 'string' },
      ],
      outputs: [
        { name: 'sentiment', type: 'number' },
        { name: 'entities', type: 'array' },
      ],
    },
  },
  {
    id: 'node-2',
    type: 'customNode',
    position: { x: 500, y: 100 },
    data: {
      name: 'Code Quality Analyzer',
      inputs: [
        { name: 'code', type: 'string' },
        { name: 'language', type: 'string' },
      ],
      outputs: [
        { name: 'quality_score', type: 'number' },
        { name: 'suggestions', type: 'array' },
      ],
    },
  },
];

const mockEdges: Edge<EdgeData>[] = [
  {
    id: 'edge-1',
    source: 'node-1',
    target: 'node-2',
    sourceHandle: 'output-entities',
    targetHandle: 'input-code',
    type: 'customEdge',
    data: {
      mappings: [
        {
          source: 'entities',
          target: 'code',
          transform: {
            type: 'cast',
            config: {
              from: 'array',
              to: 'string',
            },
          },
        },
      ],
    },
  },
];

export default function FlowsPage() {
  const { nodes, edges, setNodes, setEdges } = useFlowStore();
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge<EdgeData> | null>(null);
  const [isFlowFormOpen, setIsFlowFormOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'execution'>('editor');

  // Initialize with mock data
  React.useEffect(() => {
    if (!nodes.length) {
      setNodes(mockNodes);
    }
    if (!edges.length) {
      setEdges(mockEdges);
    }
  }, [setNodes, setEdges, nodes.length, edges.length]);

  const handleNodeClick = (node: Node<NodeData>) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };

  const handleEdgeClick = (edge: Edge<EdgeData>) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  const handleCreateFlow = (values: { name: string; nodes: Node<NodeData>[]; edges: Edge<EdgeData>[] }) => {
    setNodes(values.nodes);
    setEdges(values.edges);
    setIsFlowFormOpen(false);
  };

  return (
    <AppShell>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">AI Pipeline</h2>
          <Button onClick={() => setIsFlowFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Flow
          </Button>
        </div>

        <div className="space-y-4">
          <AIPipelineNavigation />

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'editor' | 'execution')}>
            <TabsList>
              <TabsTrigger value="editor">Flow Editor</TabsTrigger>
              <TabsTrigger value="execution">Execution</TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="col-span-1">
                  <FlowEditor
                    onNodeClick={handleNodeClick}
                    onEdgeClick={handleEdgeClick}
                  />
                </div>

                <div className="col-span-1">
                  <h3 className="text-lg font-semibold mb-4">Node Connections</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>From Node</TableHead>
                        <TableHead>Output</TableHead>
                        <TableHead>To Node</TableHead>
                        <TableHead>Input</TableHead>
                        <TableHead>Mappings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {edges.map((edge) => {
                        const sourceNode = nodes.find((n) => n.id === edge.source);
                        const targetNode = nodes.find((n) => n.id === edge.target);
                        return (
                          <TableRow key={edge.id}>
                            <TableCell>{sourceNode?.data.name}</TableCell>
                            <TableCell>
                              {edge.sourceHandle?.replace('output-', '')}
                            </TableCell>
                            <TableCell>{targetNode?.data.name}</TableCell>
                            <TableCell>
                              {edge.targetHandle?.replace('input-', '')}
                            </TableCell>
                            <TableCell>
                              {edge.data?.mappings.map((mapping, index) => (
                                <Badge key={index} variant="outline" className="mr-1">
                                  {mapping.source} → {mapping.target}
                                  {mapping.transform && ` (${mapping.transform.type})`}
                                </Badge>
                              ))}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="execution" className="space-y-6">
              <FlowExecution
                flowId="flow-1"
                nodes={nodes}
                edges={edges}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <FlowFormDialog
        open={isFlowFormOpen}
        onClose={() => setIsFlowFormOpen(false)}
        onSubmit={handleCreateFlow}
        nodes={mockNodes}
        edges={mockEdges}
      />
    </AppShell>
  );
}
