from typing import Optional, Any, Union
from pydantic import BaseModel


class Body(BaseModel):
    message: str
    data: Optional[Any] = None
