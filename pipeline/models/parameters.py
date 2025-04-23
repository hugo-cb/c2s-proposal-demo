from typing import Optional

from pydantic import BaseModel


class Parameter(BaseModel):
    name: str
    type: str
    description: Optional[str] = None
