import { create } from 'zustand';
import { Node, Edge } from 'reactflow';
import { NodeData } from './custom-node';
import { EdgeData } from './custom-edge';

export type NodeStatus = 'idle' | 'running' | 'completed' | 'error';

export interface NodeExecution {
  nodeId: string;
  status: NodeStatus;
  input?: Record<string, any>;
  output?: Record<string, any>;
  error?: string;
  startTime?: Date;
  endTime?: Date;
}

export interface FlowExecution {
  flowId: string;
  status: 'idle' | 'running' | 'completed' | 'error' | 'stopped';
  nodes: NodeExecution[];
  currentNodeId?: string;
  error?: string;
  startTime?: Date;
  endTime?: Date;
}

interface FlowExecutionState {
  execution: FlowExecution | null;
  setExecution: (execution: FlowExecution | null) => void;
  updateNodeExecution: (nodeExecution: NodeExecution) => void;
  stopExecution: () => void;
  startExecution: (flowId: string, nodes: Node<NodeData>[], edges: Edge<EdgeData>[]) => void;
}

export const useFlowExecutionStore = create<FlowExecutionState>((set, get) => ({
  execution: null,

  setExecution: (execution) => set({ execution }),

  updateNodeExecution: (nodeExecution) =>
    set((state) => {
      if (!state.execution) return state;

      return {
        execution: {
          ...state.execution,
          nodes: state.execution.nodes.map((n) =>
            n.nodeId === nodeExecution.nodeId ? { ...n, ...nodeExecution } : n
          ),
          currentNodeId: nodeExecution.status === 'completed' ? undefined : nodeExecution.nodeId,
          status:
            nodeExecution.status === 'error'
              ? 'error'
              : nodeExecution.status === 'completed' &&
                state.execution.nodes.every(
                  (n) => n.nodeId === nodeExecution.nodeId || n.status === 'completed'
                )
              ? 'completed'
              : 'running',
          endTime:
            nodeExecution.status === 'completed' &&
            state.execution.nodes.every(
              (n) => n.nodeId === nodeExecution.nodeId || n.status === 'completed'
            )
              ? new Date()
              : state.execution.endTime,
        },
      };
    }),

  stopExecution: () =>
    set((state) => {
      if (!state.execution) return state;

      return {
        execution: {
          ...state.execution,
          status: 'stopped',
          endTime: new Date(),
        },
      };
    }),

  startExecution: (flowId, nodes, edges) => {
    // Initialize node executions
    const nodeExecutions: NodeExecution[] = nodes.map((node) => ({
      nodeId: node.id,
      status: 'idle',
    }));

    // Find root nodes (nodes with no incoming edges)
    const rootNodes = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );

    // Create initial execution state
    const execution: FlowExecution = {
      flowId,
      status: 'running',
      nodes: nodeExecutions,
      startTime: new Date(),
    };

    set({ execution });

    // Start execution from root nodes
    rootNodes.forEach((node) => {
      get().updateNodeExecution({
        nodeId: node.id,
        status: 'running',
        startTime: new Date(),
      });
    });
  },
}));
