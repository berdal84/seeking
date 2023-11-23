from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from starlette import status
from starlette.middleware.cors import CORSMiddleware

from src.database import SessionLocal, engine
from src import models, schemas, crud, guards, convert
from src.exceptions import EventNotFoundException, JobNotFoundException
from src.schemas import Page

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Seeking")

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/job/")
async def create_job(job: schemas.JobCreate, session: Session = Depends(get_db)) -> schemas.Job:
    db_job = crud.create_job(session, job)
    return convert.job_model_to_schema(db_job)


@app.get("/job/")
async def get_job_page(page: int = 0, limit: int = 10, session: Session = Depends(get_db)) -> Page[schemas.Job]:
    # Checks
    guards.is_in_range_int(limit, 1, 100, "limit")

    # Query DB
    db_jobs = crud.get_job_page(session, skip=page * limit, limit=limit)
    item_total_count = crud.get_job_count(session)  # TODO: get this in single request?

    # Prepare response
    response = Page[schemas.Job](page_index=page,
                                 item=[],
                                 item_total_count=item_total_count
                                 )
    for each_db_job in db_jobs:
        response.item.append(convert.job_model_to_schema(each_db_job))

    return response


@app.get("/job/{job_id}/")
async def get_job(job_id: int, session: Session = Depends(get_db)) -> schemas.Job:
    db_job = crud.get_job(session, job_id)

    if db_job is None:
        raise JobNotFoundException()

    return convert.job_model_to_schema(db_job)


@app.post("/job/{job_id}/event/")
async def create_event(event: schemas.EventCreate, job_id: int, session: Session = Depends(get_db)) -> schemas.Event:
    db_event = crud.create_event(session, event, job_id)

    return convert.event_model_to_schema(db_event)



@app.get("/event/{event_id}/")
async def get_event(event_id: int, session: Session = Depends(get_db)) -> schemas.Event:
    db_event = crud.get_event(session, event_id)

    if db_event is None:
        raise EventNotFoundException()

    return convert.event_model_to_schema(db_event)


@app.patch("/event/{event_id}/")
async def update_event(event: schemas.EventUpdate, event_id: int, session: Session = Depends(get_db)) -> schemas.Event:
    db_event = crud.update_event(session, event_id, event)

    if db_event is None:
        raise EventNotFoundException()

    return convert.event_model_to_schema(db_event)


@app.delete("/event/{event_id}/")
async def delete_event(event_id: int, session: Session = Depends(get_db)) -> str:

    success = crud.delete_event(session, event_id)

    if not success:
        raise EventNotFoundException()

    return "Event deleted"
