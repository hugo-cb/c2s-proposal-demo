from datetime import datetime
from enum import StrEnum
from typing import Dict, Any, Optional, Callable, List, Self

from pydantic import BaseModel, Field

from poc import Parameter
from pipeline.models.flow import Flow
from pipeline.models.nodes import Edge


class PipelineState(BaseModel):
    data: Dict[str, Any] = {}


class PipelineStatus(StrEnum):
    INITIALIZED = "initialized"
    RUNNING = "running"
    PAUSED = "paused"
    SUCCESS = "success"
    FAILED = "failed"

    def has_terminated(self) -> bool:
        return self in (PipelineStatus.SUCCESS, PipelineStatus.FAILED,)

    def is_running(self) -> bool:
        return self in (PipelineStatus.RUNNING,)

    def is_paused(self) -> bool:
        return self in (PipelineStatus.PAUSED,)

    def has_failed(self) -> bool:
        return self == PipelineStatus.FAILED

    def has_succeeded(self) -> bool:
        return self == PipelineStatus.SUCCESS


class Pipeline(BaseModel):
    id: str
    flow: Flow
    started_at: datetime
    executed_nodes: Dict[str, Any] = {}
    user_inputs: Dict[str, Any] = {}
    state: PipelineState = Field(default_factory=PipelineState)
    status: PipelineStatus = PipelineStatus.INITIALIZED
    persist_callback: Optional[Callable[[Self], None]] = None

    def get_required_inputs(self) -> List[str]:
        provided_inputs = {
            (e.to_node, e.to_input) for e in self.flow.edges
        }
        required_inputs = []
        for node in self.flow.nodes:
            for param in node.inputs:
                if (node.id, param.name) not in provided_inputs:
                    required_inputs.append(f"{node.id}.{param.name}")
        return required_inputs

    def update_node_status(
        self,
        node_id: str,
        status: PipelineStatus,
        inputs: Optional[dict] = None,
        outputs: Optional[dict] = None,
        error: Optional[str] = None,
    ):
        now = datetime.utcnow()
        self.executed_nodes[node_id] = {
            "status": status,
            "input_values": inputs or {},
            "output_values": outputs or {},
            "error_message": error,
            "started_at": (
                now
                if status.is_running()
                else self.executed_nodes.get(node_id, {}).get("started_at")
            ),
            "finished_at": now if status.has_terminated() else None,
        }
        if self.persist_callback:
            self.persist_callback(self)

    def pause(self):
        self.status = PipelineStatus.PAUSED
        if self.persist_callback:
            self.persist_callback(self)

    def resume(self):
        self.status = PipelineStatus.RUNNING
        if self.persist_callback:
            self.persist_callback(self)

    def export_status(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "status": self.status,
            "started_at": self.started_at.isoformat(),
            "executed_nodes": self.executed_nodes,
            "required_user_inputs": self.identify_required_inputs(),
            "state": self.state.dict(),
        }

    def inject_user_input(self, key: str, value: Any):
        self.user_inputs[key] = value
        if self.persist_callback:
            self.persist_callback(self)
