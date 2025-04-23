'use client';

import React, { useEffect } from 'react';
import { Node, Edge } from 'reactflow';
import { Play, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { NodeData } from './custom-node';
import { EdgeData } from './custom-edge';
import { useFlowExecutionStore, NodeStatus } from './flow-execution-store';

interface FlowExecutionProps {
  flowId: string;
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
}

const statusColors: Record<NodeStatus, { bg: string; text: string }> = {
  idle: { bg: 'bg-gray-100', text: 'text-gray-600' },
  running: { bg: 'bg-blue-100', text: 'text-blue-600' },
  completed: { bg: 'bg-green-100', text: 'text-green-600' },
  error: { bg: 'bg-red-100', text: 'text-red-600' },
};

export function FlowExecution({ flowId, nodes, edges }: FlowExecutionProps) {
  const { execution, startExecution, stopExecution, updateNodeExecution } = useFlowExecutionStore();

  // Simulate node execution (replace with actual API calls)
  useEffect(() => {
    if (!execution || execution.status !== 'running') return;

    const runningNodes = execution.nodes.filter((n) => n.status === 'running');
    if (runningNodes.length === 0) return;

    runningNodes.forEach((nodeExec) => {
      const node = nodes.find((n) => n.id === nodeExec.nodeId);
      if (!node) return;

      // Simulate processing time
      const timer = setTimeout(() => {
        // Generate mock output based on node type
        const output: Record<string, any> = {};
        node.data.outputs.forEach((out) => {
          switch (out.type) {
            case 'string':
              output[out.name] = 'Sample output';
              break;
            case 'number':
              output[out.name] = Math.random() * 100;
              break;
            case 'array':
              output[out.name] = ['item1', 'item2'];
              break;
            default:
              output[out.name] = null;
          }
        });

        // Update node execution
        updateNodeExecution({
          ...nodeExec,
          status: 'completed',
          output,
          endTime: new Date(),
        });

        // Find and start next nodes
        const outgoingEdges = edges.filter((edge) => edge.source === nodeExec.nodeId);
        outgoingEdges.forEach((edge) => {
          const targetExec = execution.nodes.find((n) => n.nodeId === edge.target);
          if (targetExec?.status === 'idle') {
            // Apply transformations from edge mappings
            const input: Record<string, any> = {};
            edge.data?.mappings.forEach((mapping) => {
              let value = output[mapping.source];
              if (mapping.transform) {
                // Apply transformation
                switch (mapping.transform.type) {
                  case 'cast':
                    if (mapping.transform.config.to === 'string') {
                      value = String(value);
                    } else if (mapping.transform.config.to === 'number') {
                      value = Number(value);
                    }
                    break;
                  // Add more transformation types as needed
                }
              }
              input[mapping.target] = value;
            });

            updateNodeExecution({
              nodeId: edge.target,
              status: 'running',
              input,
              startTime: new Date(),
            });
          }
        });
      }, 2000); // Simulate 2 second processing time

      return () => clearTimeout(timer);
    });
  }, [execution, nodes, edges, updateNodeExecution]);

  if (!execution) {
    return (
      <div className="space-y-4">
        <Button onClick={() => startExecution(flowId, nodes, edges)}>
          <Play className="h-4 w-4 mr-2" />
          Start Execution
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`${
              statusColors[execution.status as NodeStatus]?.bg
            } ${
              statusColors[execution.status as NodeStatus]?.text
            }`}
          >
            {execution.status === 'running' && (
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            )}
            {execution.status.charAt(0).toUpperCase() + execution.status.slice(1)}
          </Badge>
          {execution.startTime && (
            <span className="text-sm text-gray-500">
              Started at {execution.startTime.toLocaleTimeString()}
            </span>
          )}
          {execution.endTime && (
            <span className="text-sm text-gray-500">
              Ended at {execution.endTime.toLocaleTimeString()}
            </span>
          )}
        </div>

        {execution.status === 'running' && (
          <Button variant="destructive" onClick={stopExecution}>
            <Square className="h-4 w-4 mr-2" />
            Stop Execution
          </Button>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Node</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Input</TableHead>
            <TableHead>Output</TableHead>
            <TableHead>Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {execution.nodes.map((nodeExec) => {
            const node = nodes.find((n) => n.id === nodeExec.nodeId);
            if (!node) return null;

            return (
              <TableRow key={nodeExec.nodeId}>
                <TableCell>{node.data.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${statusColors[nodeExec.status]?.bg} ${
                      statusColors[nodeExec.status]?.text
                    }`}
                  >
                    {nodeExec.status === 'running' && (
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    )}
                    {nodeExec.status.charAt(0).toUpperCase() + nodeExec.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  {nodeExec.input && (
                    <pre className="text-xs">
                      {JSON.stringify(nodeExec.input, null, 2)}
                    </pre>
                  )}
                </TableCell>
                <TableCell>
                  {nodeExec.output && (
                    <pre className="text-xs">
                      {JSON.stringify(nodeExec.output, null, 2)}
                    </pre>
                  )}
                </TableCell>
                <TableCell>
                  {nodeExec.startTime &&
                    (nodeExec.endTime
                      ? `${
                          (nodeExec.endTime.getTime() - nodeExec.startTime.getTime()) /
                          1000
                        }s`
                      : 'Running...')}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
