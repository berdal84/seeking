from pydantic import BaseModel


class Page[TItem](BaseModel):
    item: list[TItem]
    item_total_count: int
