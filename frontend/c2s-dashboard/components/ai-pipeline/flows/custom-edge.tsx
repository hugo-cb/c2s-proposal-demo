'use client';

import React, { memo } from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

export interface FieldMapping {
  source: string;
  target: string;
  transform?: {
    type: 'cast' | 'extract' | 'format';
    config: Record<string, any>;
  };
}

export interface EdgeData {
  mappings: FieldMapping[];
}

export const CustomEdge = memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
  markerEnd,
}: EdgeProps<EdgeData>) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path stroke-2 stroke-gray-300"
        d={edgePath}
        markerEnd={markerEnd}
      />
      
      {data?.mappings && data.mappings.length > 0 && (
        <foreignObject
          width={200}
          height={40}
          x={(sourceX + targetX) / 2 - 100}
          y={(sourceY + targetY) / 2 - 20}
          className="overflow-visible"
        >
          <div className="flex items-center justify-center">
            <div className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
              {data.mappings.length} field mappings
            </div>
          </div>
        </foreignObject>
      )}
    </>
  );
});
