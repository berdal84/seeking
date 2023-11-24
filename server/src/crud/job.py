from typing import Type, Optional
from sqlalchemy.orm import Session
from src import models, schemas


def get(session: Session, job_id: int) -> models.Job | None:
    return session.query(models.Job).get(job_id)


def create(session: Session, item: schemas.JobCreate) -> models.Job:
    db_job = models.Job(**item.model_dump())
    session.add(db_job)
    session.commit()
    session.refresh(db_job)
    return db_job


def get_page(session: Session,
             skip: int = 0,
             limit: int = 100,
             company_id: Optional[str] = None
             ) -> list[Type[models.Job]]:
    query = session.query(models.Job).offset(skip).limit(limit)
    if company_id is not None:
        query.filter_by(company_id=company_id).all()
    return query.all()


def count(session: Session) -> int:
    # No need for optimization right now
    return session.query(models.Job).count()


def get_all(session) -> list[models.Job]:
    return session.query(models.Job).all()
