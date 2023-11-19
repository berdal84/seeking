from typing import Optional, Any, Union
from pydantic import BaseModel


class SuccessBody(BaseModel):
    message: str
    data: Optional[Any] = None


class ErrorBody(BaseModel):
    error: str
    data: Optional[Any] = None


Body = Union[ErrorBody, SuccessBody]
