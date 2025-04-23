'use client';

import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  NodeChange,
  EdgeChange,
  Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { CustomNode, NodeData } from './custom-node';
import { CustomEdge, EdgeData } from './custom-edge';
import { useFlowStore } from './flow-store';
import { NodeFormDialog } from './node-form-dialog';
import { EdgeFormDialog } from './edge-form-dialog';

const nodeTypes = {
  customNode: CustomNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

interface FlowEditorProps {
  onNodeClick?: (node: Node<NodeData>) => void;
  onEdgeClick?: (edge: Edge<EdgeData>) => void;
  onConnect?: (params: Connection) => void;
}

function Flow({ onNodeClick, onEdgeClick, onConnect }: FlowEditorProps) {
  const { nodes, edges, setNodes, setEdges, addNode, addEdge } = useFlowStore();
  const { project } = useReactFlow();
  const [isNodeDialogOpen, setIsNodeDialogOpen] = useState(false);
  const [isEdgeDialogOpen, setIsEdgeDialogOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node<NodeData> | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge<EdgeData> | null>(null);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nodes: Node<NodeData>[]) => applyNodeChanges(changes, nodes));
    },
    [setNodes]
  );

  const handleEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((edges: Edge<EdgeData>[]) => applyEdgeChanges(changes, edges));
    },
    [setEdges]
  );

  const handleConnect = useCallback(
    (params: Connection) => {
      onConnect?.(params);
      setIsEdgeDialogOpen(true);
      const tempEdge: Edge<EdgeData> = {
        id: `edge-${Date.now()}`,
        source: params.source!,
        target: params.target!,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        type: 'customEdge',
      };
      setSelectedEdge(tempEdge);
    },
    [onConnect]
  );

  const handlePaneClick = useCallback(() => {
    const position = project({ x: 0, y: 0 });
    setIsNodeDialogOpen(true);
    setSelectedNode({
      id: `node-${Date.now()}`,
      type: 'customNode',
      position,
      data: {
        name: '',
        inputs: [],
        outputs: [],
      },
    } as Node<NodeData>);
  }, [project]);

  const handleNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node<NodeData>) => {
    setIsNodeDialogOpen(true);
    setSelectedNode(node);
  }, []);

  const handleEdgeDoubleClick = useCallback((event: React.MouseEvent, edge: Edge<EdgeData>) => {
    setIsEdgeDialogOpen(true);
    setSelectedEdge(edge);
  }, []);

  const handleNodeFormSubmit = useCallback(
    (values: NodeData) => {
      if (selectedNode) {
        const newNode: Node<NodeData> = {
          ...selectedNode,
          data: values,
        };
        addNode(newNode);
      }
      setIsNodeDialogOpen(false);
      setSelectedNode(null);
    },
    [addNode, selectedNode]
  );

  const handleEdgeFormSubmit = useCallback(
    (values: EdgeData) => {
      if (selectedEdge) {
        const newEdge: Edge<EdgeData> = {
          ...selectedEdge,
          data: values,
        };
        addEdge(newEdge);
      }
      setIsEdgeDialogOpen(false);
      setSelectedEdge(null);
    },
    [addEdge, selectedEdge]
  );

  return (
    <>
      <div className="w-full h-[600px] border rounded-lg">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={handleConnect}
          onNodeClick={(_, node) => onNodeClick?.(node)}
          onEdgeClick={(_, edge) => onEdgeClick?.(edge)}
          onNodeDoubleClick={handleNodeDoubleClick}
          onEdgeDoubleClick={handleEdgeDoubleClick}
          onPaneClick={handlePaneClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <NodeFormDialog
        open={isNodeDialogOpen}
        onClose={() => {
          setIsNodeDialogOpen(false);
          setSelectedNode(null);
        }}
        onSubmit={handleNodeFormSubmit}
        initialValues={selectedNode?.data}
      />

      <EdgeFormDialog
        open={isEdgeDialogOpen}
        onClose={() => {
          setIsEdgeDialogOpen(false);
          setSelectedEdge(null);
        }}
        onSubmit={handleEdgeFormSubmit}
        initialValues={selectedEdge?.data}
      />
    </>
  );
}

export function FlowEditor(props: FlowEditorProps) {
  return (
    <ReactFlowProvider>
      <Flow {...props} />
    </ReactFlowProvider>
  );
}
