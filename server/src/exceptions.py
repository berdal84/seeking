from fastapi import HTTPException
from starlette import status


class EventNotFoundException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,  # We could return 410 in case item was already deleted
            detail="Event not found (or already deleted)"
        )


class JobNotFoundException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,  # We could return 410 in case item was already deleted
            detail="Job not found (or already deleted)"
        )
