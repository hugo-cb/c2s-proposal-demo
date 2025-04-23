from typing import Optional, Callable

from pydantic import BaseModel
from pydantic import Field

from .parameters import Parameter
from .transformations import TransformationProtocol, DefaultTransformationDefinition
from ..functions import default_node_ai_function

class SupportedLanguages(StrEnum):
    PYTHON = "python"
    JAVASCRIPT = "javascript"
    

class FunctionDefinition(BaseModel):
    name: str
    description: Optional[str] = None
    inputs: list[Parameter]
    outputs: list[Parameter]
    code_language: SupportedLanguages = SupportedLanguages.PYTHON
    implementation: Callable[..., any] = lambda **kwargs: default_node_ai_function(
        prompt_template=kwargs.get("prompt", ""), inputs=kwargs
    )


class Node(BaseModel):
    id: str
    name: str
    function: Optional[FunctionDefinition] = Field(
        default_factory=lambda: FunctionDefinition(
            name="DefaultLLMPromptExecutor",
            description="Execute a default prompt with LangChain"
        ))


class Edge(BaseModel, TransformationProtocol):
    from_node: str
    from_output: str
    to_node: str
    to_input: str
    transformation: TransformationProtocol = Field(
        default_factory=DefaultTransformationDefinition
    )

    def apply(self, value: any) -> any:
        return self.transformation.apply(value)
