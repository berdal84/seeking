from typing import Type
from src import models, schemas


def job_model_to_schema(job: models.Job | Type[models.Job]) -> schemas.Job:
    result = schemas.Job(
        id=job.id,
        role=job.role,
        company=job.company,
        url=job.url,
        notes=job.notes,
        events=list(
            map(event_model_to_schema, job.events)
        )
    )
    return result


def job_schema_to_model(job: schemas.Job) -> models.Job:
    result = models.Job(
        id=job.id,
        role=job.role,
        company=job.company,
        url=job.url,
        notes=job.notes,
        events=list(
            map(event_schema_to_model, job.events)
        )
    )
    return result


def event_model_to_schema(event: models.Event | Type[models.Event]) -> schemas.Event:
    result = schemas.Event(
        id=event.id,
        date=event.date,
        type=schemas.EventType(event.type),
        notes=event.notes,
    )
    return result


def event_schema_to_model(event: schemas.Event) -> models.Event:
    result = models.Event(
        id=event.id,
        date=event.date,
        type=schemas.EventType(event.type),
        notes=event.notes,
    )
    return result
