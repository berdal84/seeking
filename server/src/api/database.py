from fastapi import HTTPException, Depends
from sqlalchemy.orm import Session
from starlette import status
from src import schemas, crud, convert, database_utils
from src.database_utils import get_db
from fastapi import APIRouter

router = APIRouter()


@router.get("/database/backup/")
async def backup_database(session: Session = Depends(get_db)) -> list[schemas.Job]:

    """ Return the whole Job table, can be restored using /database/restore/ endpoint"""

    db_jobs = crud.job.get_all(session)
    return list(map(convert.job_model_to_schema, db_jobs))


@router.post("/database/restore/")
async def restore_database(jobs: list[schemas.Job], session: Session = Depends(get_db)) -> str:

    """ Restore the entire database from a large Job list. Existing data will be erased. """

    if database_utils.restore(jobs, session) is False:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Unable to restore the database')
    return "Database restored"
