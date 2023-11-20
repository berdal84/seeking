from fastapi import FastAPI, HTTPException
from fastapi.openapi.models import Response
from starlette import status
from src.company import Company
from src.body import Body

app = FastAPI()


@app.get("/")
async def root() -> Body:

    """ Hello Word end point"""

    return Body(message="Hello World")


@app.get("/company/")
async def read_company_all(page: int = 0, limit: int = 10) -> Body:

    """ Get all companies by page """

    if page < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'page number must be between 0 and infinity (actual: {page}) ',
        )

    if limit < 1 or limit > 100:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'limit number must be between 1 and 100 (actual: {page}) ',
        )

    results = []
    range_start = page * limit
    for item_id in range(range_start, range_start + limit):
        results.append(Company(id=item_id))

    return Body(
        message="read_company_all is not implemented yet",
        data=results
    )


@app.get("/company/{company_id}/")
async def read_company(company_id: int) -> Body:

    """ Get a company from a given id """

    company = Company(id=company_id)

    if company_id < 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'company_id {company_id} should be a positive integer',
        )

    return Body(
        message="read_company is not implemented yet",
        data=company
    )


@app.post("/company/{company_id}/event/")
async def create_event(company_id: int) -> Body:

    """ Get an event from a given id """

    company = Company(id=company_id)

    return Body(
        message="create_event is not implemented yet",
        data=company
    )
