import { create } from 'zustand';
import { Edge, Node } from 'reactflow';
import { NodeData } from './custom-node';
import { EdgeData } from './custom-edge';

export interface FlowState {
  nodes: Node<NodeData>[];
  edges: Edge<EdgeData>[];
  setNodes: (nodes: Node<NodeData>[] | ((prev: Node<NodeData>[]) => Node<NodeData>[])) => void;
  setEdges: (edges: Edge<EdgeData>[] | ((prev: Edge<EdgeData>[]) => Edge<EdgeData>[])) => void;
  addNode: (node: Node<NodeData>) => void;
  addEdge: (edge: Edge<EdgeData>) => void;
  updateNode: (nodeId: string, data: NodeData) => void;
  updateEdge: (edgeId: string, data: EdgeData) => void;
  removeNode: (nodeId: string) => void;
  removeEdge: (edgeId: string) => void;
}

export const useFlowStore = create<FlowState>((set) => ({
  nodes: [],
  edges: [],
  setNodes: (nodes) => set((state) => ({ 
    nodes: typeof nodes === 'function' ? nodes(state.nodes) : nodes 
  })),
  setEdges: (edges) => set((state) => ({ 
    edges: typeof edges === 'function' ? edges(state.edges) : edges 
  })),
  addNode: (node) =>
    set((state) => ({
      nodes: [...state.nodes, node],
    })),
  addEdge: (edge) =>
    set((state) => ({
      edges: [...state.edges, edge],
    })),
  updateNode: (nodeId, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data } : node
      ),
    })),
  updateEdge: (edgeId, data) =>
    set((state) => ({
      edges: state.edges.map((edge) =>
        edge.id === edgeId ? { ...edge, data } : edge
      ),
    })),
  removeNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    })),
  removeEdge: (edgeId) =>
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== edgeId),
    })),
}));
