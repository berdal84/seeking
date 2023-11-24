import datetime
from sqlalchemy import Date
from sqlalchemy.orm import Session
from src import models, schemas


def get(session: Session, event_id: int) -> models.Event | None:
    return session.query(models.Event).get(event_id)


def create(session: Session,
           item: schemas.EventCreate,
           job_id: int,
           date: Date = datetime.date.today()
           ) -> models.Event:
    db_event = models.Event(**item.model_dump(), job_id=job_id, date=date)
    session.add(db_event)
    session.commit()
    session.refresh(db_event)
    return db_event


def get_event_count(session: Session) -> int:
    # No need for optimization right now
    return session.query(models.Event).count()


def update(session: Session, event_id: int, event: schemas.EventUpdate) -> models.Event | None:
    db_event: models.Event | None = session.query(models.Event).get(event_id)

    if db_event is None:
        return None

    if event.type is not None:
        db_event.type = event.type

    if event.date is not None:
        db_event.date = event.date

    if event.notes is not None:
        db_event.notes = event.notes

    session.commit()
    session.refresh(db_event)
    return db_event


def delete(session: Session, event_id: int) -> bool:
    db_event = session.query(models.Event).get(event_id)
    if db_event is None:
        return False
    session.delete(db_event)
    session.commit()
    return True
