from typing import Dict, Any

from langchain_core.runnables import RunnableLambda
from langgraph.graph import END, StateGraph

from pipeline import Pipeline, PipelineStatus
from pipeline.models import Flow
from pipeline.models import Edge


def build_langgraph_from_flow(
    flow: Flow, pipeline: Pipeline
) -> StateGraph:
    builder = StateGraph()

    def get_input_for_node(
        node_id: str, param_name: str, state: Dict[str, Any], edges: list[Edge]
    ):
        for edge in edges:
            if edge.to_node == node_id and edge.to_input == param_name:
                source_key = f"{edge.from_node}.{edge.from_output}"
                raw_value = state.get(source_key)
                return edge.apply(raw_value)

        return pipeline.user_inputs.get(f"{node_id}.{param_name}")

    for node in flow.nodes:
        def make_step(n):
            def step_fn(state: Dict[str, Any]) -> Dict[str, Any]:
                pipeline.update_node_status(n.id, PipelineStatus.RUNNING)
                try:
                    if not n.inputs and not n.outputs:
                        n.function.implementation(pipeline)
                        pipeline.update_node_status(n.id, PipelineStatus.SUCCESS)
                        return state

                    inputs = {
                        param.name: get_input_for_node(
                            n.id, param.name, state, flow.edges
                        )
                        for param in n.inputs
                    }
                    result = n.function.implementation(**inputs)
                    outputs = {}
                    if isinstance(result, dict):
                        for k, v in result.items():
                            outputs[f"{n.id}.{k}"] = v

                    pipeline.update_node_status(
                        n.id, PipelineStatus.SUCCESS, inputs, outputs
                    )
                    return {**state, **outputs}
                except Exception as e:
                    pipeline.update_node_status(
                        n.id, PipelineStatus.FAILED, error=str(e)
                    )
                    raise

            return step_fn

        builder.add_node(node.id, RunnableLambda(make_step(node)))

    for edge in flow.edges:
        builder.add_edge(edge.from_node, edge.to_node)

    terminal_nodes = set(n.id for n in flow.nodes) - set(
        e.from_node for e in flow.edges
    )
    for tid in terminal_nodes:
        builder.add_edge(tid, END)

    return builder
