'use client';

import React, { useState } from 'react';
import { Node, Edge } from 'reactflow';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { NodeData } from './custom-node';
import { EdgeData, FieldMapping } from './custom-edge';

interface FlowFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: { name: string; nodes: Node<NodeData>[]; edges: Edge<EdgeData>[] }) => void;
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
}

interface Step {
  id: string;
  nodeId: string;
  inputs: { [key: string]: string };
}

export function FlowFormDialog({ open, onClose, onSubmit, nodes: availableNodes }: FlowFormDialogProps) {
  const [name, setName] = useState('');
  const [steps, setSteps] = useState<Step[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState('');

  const handleAddStep = () => {
    if (!selectedNodeId) return;

    const node = availableNodes.find((n) => n.id === selectedNodeId);
    if (!node) return;

    const step: Step = {
      id: `step-${Date.now()}`,
      nodeId: selectedNodeId,
      inputs: {},
    };

    setSteps([...steps, step]);
    setSelectedNodeId('');
  };

  const handleStepInputChange = (stepId: string, inputName: string, value: string) => {
    setSteps(
      steps.map((step) =>
        step.id === stepId
          ? {
              ...step,
              inputs: {
                ...step.inputs,
                [inputName]: value,
              },
            }
          : step
      )
    );
  };

  const handleSubmit = () => {
    const flowNodes: Node<NodeData>[] = steps.map((step, index) => {
      const node = availableNodes.find((n) => n.id === step.nodeId);
      if (!node) throw new Error(`Node ${step.nodeId} not found`);

      return {
        ...node,
        id: step.id,
        position: { x: 100 + index * 200, y: 100 },
      };
    });

    const flowEdges: Edge<EdgeData>[] = [];
    for (let i = 0; i < steps.length - 1; i++) {
      const sourceNode = flowNodes[i];
      const targetNode = flowNodes[i + 1];
      const sourceNodeData = availableNodes.find((n) => n.id === steps[i].nodeId)?.data;
      const targetNodeData = availableNodes.find((n) => n.id === steps[i + 1].nodeId)?.data;

      if (!sourceNodeData || !targetNodeData) continue;

      const mappings: FieldMapping[] = [];
      sourceNodeData.outputs.forEach((output) => {
        const targetInput = targetNodeData.inputs.find((input) => input.type === output.type);
        if (targetInput) {
          mappings.push({
            source: output.name,
            target: targetInput.name,
          });
        } else {
          // Add transformation if types don't match
          const firstInput = targetNodeData.inputs[0];
          if (firstInput) {
            mappings.push({
              source: output.name,
              target: firstInput.name,
              transform: {
                type: 'cast',
                config: {
                  from: output.type,
                  to: firstInput.type,
                },
              },
            });
          }
        }
      });

      if (mappings.length > 0) {
        flowEdges.push({
          id: `edge-${i}`,
          source: sourceNode.id,
          target: targetNode.id,
          type: 'customEdge',
          data: {
            mappings,
          },
        });
      }
    }

    onSubmit({ name, nodes: flowNodes, edges: flowEdges });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Flow</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Flow Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter flow name"
            />
          </div>

          <div className="grid gap-2">
            <Label>Steps</Label>
            {steps.map((step, index) => {
              const node = availableNodes.find((n) => n.id === step.nodeId);
              if (!node) return null;

              return (
                <div key={step.id} className="p-4 border rounded-lg">
                  <div className="font-semibold mb-2">
                    Step {index + 1}: {node.data.name}
                  </div>
                  <div className="space-y-2">
                    {node.data.inputs.map((input) => (
                      <div key={input.name} className="grid gap-1">
                        <Label htmlFor={`${step.id}-${input.name}`}>{input.name}</Label>
                        <Input
                          id={`${step.id}-${input.name}`}
                          value={step.inputs[input.name] || ''}
                          onChange={(e) =>
                            handleStepInputChange(step.id, input.name, e.target.value)
                          }
                          placeholder={`Enter ${input.name} (${input.type})`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid gap-2">
            <Label>Add Step</Label>
            <div className="flex gap-2">
              <Select value={selectedNodeId} onValueChange={setSelectedNodeId}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a node" />
                </SelectTrigger>
                <SelectContent>
                  {availableNodes.map((node) => (
                    <SelectItem key={node.id} value={node.id}>
                      {node.data.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddStep}>Add</Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name || steps.length < 2}>
            Create Flow
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
