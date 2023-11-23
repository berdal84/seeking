import datetime
from typing import Type, Optional

from sqlalchemy import DateTime, Date, select
from sqlalchemy.orm import Session
from src import models, schemas


# ======================================================================================================================

def get_job(session: Session, job_id: int) -> models.Job | None:
    return session.query(models.Job).get(job_id)


def create_job(session: Session, item: schemas.JobCreate) -> models.Job:
    db_job = models.Job(**item.model_dump())
    session.add(db_job)
    session.commit()
    session.refresh(db_job)
    return db_job


def get_job_page(session: Session,
                 skip: int = 0,
                 limit: int = 100,
                 company_id: Optional[str] = None
                 ) -> list[Type[models.Job]]:
    query = session.query(models.Job).offset(skip).limit(limit)
    if company_id is not None:
        query.filter_by(company_id=company_id).all()
    return query.all()


def get_job_count(session: Session) -> int:
    # No need for optimization right now
    return session.query(models.Job).count()


# ======================================================================================================================

def get_event(session: Session, event_id: int) -> models.Event | None:
    return session.query(models.Event).get(event_id)


def create_event(session: Session,
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


def update_event(session: Session, event_id: int, event: schemas.EventUpdate) -> models.Event | None:
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


def delete_event(session: Session, event_id: int) -> bool:
    db_event = session.query(models.Event).get(event_id)
    if db_event is None:
        return False
    session.delete(db_event)
    session.commit()
    return True


# ======================================================================================================================
