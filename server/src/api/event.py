from fastapi import Depends
from sqlalchemy.orm import Session
from src import schemas, crud, convert
from src.database_utils import get_db
from src.exceptions import EventNotFoundException
from fastapi import APIRouter

router = APIRouter()


@router.get("/event/{event_id}/")
async def get_event(event_id: int, session: Session = Depends(get_db)) -> schemas.Event:
    db_event = crud.event.get(session, event_id)

    if db_event is None:
        raise EventNotFoundException()

    return convert.event_model_to_schema(db_event)


@router.patch("/event/{event_id}/")
async def update_event(event: schemas.EventUpdate, event_id: int, session: Session = Depends(get_db)) -> schemas.Event:
    db_event = crud.event.update(session, event_id, event)

    if db_event is None:
        raise EventNotFoundException()

    return convert.event_model_to_schema(db_event)


@router.delete("/event/{event_id}/")
async def delete_event(event_id: int, session: Session = Depends(get_db)) -> str:
    success = crud.event.delete(session, event_id)

    if not success:
        raise EventNotFoundException()

    return "Event deleted"
