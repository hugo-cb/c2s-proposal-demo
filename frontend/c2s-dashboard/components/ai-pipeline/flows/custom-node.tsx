'use client';

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

export interface Parameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'any';
}

export interface NodeData {
  name: string;
  description?: string;
  inputs: Parameter[];
  outputs: Parameter[];
}

export const CustomNode = memo(({ data }: NodeProps<NodeData>) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border border-gray-200">
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="ml-2">
            <div className="text-lg font-bold">{data.name}</div>
            {data.description && (
              <div className="text-gray-500 text-sm">{data.description}</div>
            )}
          </div>
        </div>

        {data.inputs.length > 0 && (
          <div className="mt-2">
            <div className="text-xs font-semibold text-gray-500 mb-1">Inputs</div>
            {data.inputs.map((input, index) => (
              <div key={index} className="text-xs mb-1 flex items-center">
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`input-${index}`}
                  className="w-2 h-2 !bg-teal-500"
                />
                <span className="ml-2">
                  {input.name}: <span className="text-gray-500">{input.type}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {data.outputs.length > 0 && (
          <div className="mt-2">
            <div className="text-xs font-semibold text-gray-500 mb-1">Outputs</div>
            {data.outputs.map((output, index) => (
              <div key={index} className="text-xs mb-1 flex items-center justify-end">
                <span className="mr-2">
                  {output.name}: <span className="text-gray-500">{output.type}</span>
                </span>
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`output-${index}`}
                  className="w-2 h-2 !bg-teal-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
