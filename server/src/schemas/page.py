from pydantic import BaseModel


class Page[TItem](BaseModel):
    page_index: int
    item: list[TItem]
    item_total_count: int
