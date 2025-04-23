from collections import defaultdict, deque

from pydantic import BaseModel

from .nodes import Node, Edge


class Flow(BaseModel):
    nodes: list[Node]
    edges: list[Edge] = []

    def validate_connections(self) -> bool:
        node_map = {node.id: node for node in self.nodes}
        for edge in self.edges:
            if edge.from_node not in node_map:
                raise ValueError(f"Nó de origem '{edge.from_node}' não encontrado")
            if edge.to_node not in node_map:
                raise ValueError(f"Nó de destino '{edge.to_node}' não encontrado")
            output_names = [o.name for o in node_map[edge.from_node].outputs]
            input_names = [i.name for i in node_map[edge.to_node].inputs]
            if edge.from_output not in output_names:
                raise ValueError(
                    f"Saída '{edge.from_output}' não encontrada no nó '{edge.from_node}'")
            if edge.to_input not in input_names:
                raise ValueError(
                    f"Entrada '{edge.to_input}' não encontrada no nó '{edge.to_node}'")
        return True

    def get_execution_order(self) -> list[str]:
        adjacency = defaultdict(list)
        indegree = defaultdict(int)
        for edge in self.edges:
            adjacency[edge.from_node].append(edge.to_node)
            indegree[edge.to_node] += 1
            if edge.from_node not in indegree:
                indegree[edge.from_node] = 0
        queue = deque([nid for nid, deg in indegree.items() if deg == 0])
        order = []
        while queue:
            node = queue.popleft()
            order.append(node)
            for neighbor in adjacency[node]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    queue.append(neighbor)
        if len(order) != len(self.nodes):
            raise ValueError("Ciclo detectado no fluxo")
        return order
