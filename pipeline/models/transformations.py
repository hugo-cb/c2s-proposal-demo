from typing import Any, Literal, Union, Protocol

import requests
from pydantic import BaseModel


class TransformationProtocol(Protocol):
    def apply(self, value: Any) -> Any:
        ...


class DefaultTransformationDefinition(BaseModel, TransformationProtocol):
    type: Literal["default"] = "default"

    def apply(self, value: Any) -> Any:
        return value


class CustomTransformationDefinition(BaseModel, TransformationProtocol):
    type: Literal["custom"] = "custom"
    language: Literal["python", "javascript", "go"]
    code: str

    def apply(self, value: Any) -> Any:
        try:
            response = requests.post(
                url=f"http://executor-{self.language}:8000/transform",
                json={"code": self.code, "input": value},
                timeout=10
            )
            response.raise_for_status()
            return response.json().get("result")
        except Exception as e:
            raise RuntimeError(f"Erro ao aplicar transformação customizada: {str(e)}")
