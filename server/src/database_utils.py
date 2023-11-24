from sqlalchemy.orm import Session
from src import schemas, models, convert
from src.database import Base, engine, SessionLocal


def init():
    Base.metadata.create_all(bind=engine)


def reset():
    Base.metadata.drop_all(bind=engine)


def restore(jobs: list[schemas.Job], session: Session) -> bool:

    # Drop all tables and initialize
    reset()
    init()

    # Insert back
    db_jobs: list[models.Job] = list(map(convert.job_schema_to_model, jobs))
    session.add_all(db_jobs)
    session.commit()

    return True


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
