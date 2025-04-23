'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface NodeListProps {
  nodes: Node[];
  onEdit: (node: Node) => void;
  onDelete: (id: string) => void;
}

export function NodeList({ nodes, onEdit, onDelete }: NodeListProps) {
  return (
    <div className="grid gap-6">
      {nodes.map((node) => (
        <Card key={node.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle>{node.name}</CardTitle>
                <CardDescription>
                  {node.function.description || node.function.name}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(node)}
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive"
                  onClick={() => onDelete(node.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-2">Inputs</h4>
                <div className="flex flex-wrap gap-2">
                  {node.function.inputs.map((input) => (
                    <Badge key={input.name} variant="outline">
                      {input.name}: {input.type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Outputs</h4>
                <div className="flex flex-wrap gap-2">
                  {node.function.outputs.map((output) => (
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
  );
}
