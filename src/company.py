from typing import Optional
from pydantic import BaseModel
from src.event import Event


class Company(BaseModel):
    id: int
    name: str = ''
    contact: str = ''
    notes: Optional[str] = None
    event: list[Event] = []

