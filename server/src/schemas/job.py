from typing import Optional
from pydantic import BaseModel

from .event import Event


class JobCreate(BaseModel):
    role: str
    company: str
    url: str
    notes: str | None = ""


class Job(BaseModel):
    id: int
    role: str
    company: str
    url: str
    notes: str | None = ""
    events: list[Event]

