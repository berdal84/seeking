from enum import Enum
from typing import Literal, Optional
from pydantic import BaseModel


class Event(BaseModel):
    id: str
    date: str
    status: Literal[
        "APPLICATION",
        "RECEIVE_MESSAGE",
        "SEND_MESSAGE"
    ]
    notes: Optional[str]
