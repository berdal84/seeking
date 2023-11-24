from fastapi import Depends
from sqlalchemy.orm import Session
from src import schemas, guards, crud, convert
from src.database_utils import get_db
from src.exceptions import JobNotFoundException
from src.schemas import Page

from fastapi import APIRouter
router = APIRouter()


@router.post("/job/")
async def create_job(job: schemas.JobCreate, session: Session = Depends(get_db)) -> schemas.Job:
    db_job = crud.job.create(session, job)
    return convert.job_model_to_schema(db_job)


@router.get("/job/")
async def get_job_page(page: int = 0, limit: int = 10, session: Session = Depends(get_db)) -> Page[schemas.Job]:

    # Checks
    guards.is_in_range_int(limit, 1, 100, "limit")

    # Query DB
    db_jobs = crud.job.get_page(session, skip=page * limit, limit=limit)
    item_total_count = crud.job.count(session)  # TODO: get this in single request?

    # Prepare response
    response = Page[schemas.Job](page_index=page,
                                 item=[],
                                 item_total_count=item_total_count
                                 )
    for each_db_job in db_jobs:
        response.item.append(convert.job_model_to_schema(each_db_job))

    return response


@router.get("/job/{job_id}/")
async def get_job(job_id: int, session: Session = Depends(get_db)) -> schemas.Job:
    db_job = crud.job.get(session, job_id)

    if db_job is None:
        raise JobNotFoundException()

    return convert.job_model_to_schema(db_job)


@router.post("/job/{job_id}/event/")
async def create_event(event: schemas.EventCreate, job_id: int, session: Session = Depends(get_db)) -> schemas.Event:
    db_event = crud.event.create(session, event, job_id)

    return convert.event_model_to_schema(db_event)
