from fastapi import FastAPI
from fastapi.openapi.models import Response
from starlette import status
from src.company import Company
from src.body import Body, SuccessBody, ErrorBody

app = FastAPI()


@app.get("/")
async def root() -> Body:

    """ Hello Word end point"""

    return SuccessBody(message="Hello World")


@app.get("/company/")
async def read_company_all() -> Body:

    """ Get a company from a given id """

    page = []
    for i in range(0, 10):
        page.append(Company(id=i))

    return SuccessBody(
        message="read_company_all is not implemented yet",
        data=page
    )


@app.get("/company/{company_id}/")
async def read_company(company_id: int, response: Response) -> Body:

    """ Get a company from a given id """

    company = Company(id=company_id)

    if company_id < 0:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return ErrorBody(
            error="company_id should be positive",
            data=company
        )

    return SuccessBody(
        message="read_company is not implemented yet",
        data=company
    )


@app.post("/company/{company_id}/event/")
async def create_event(company_id: int) -> Body:

    """ Get an event from a given id """

    company = Company(id=company_id)

    return SuccessBody(
        message="create_event is not implemented yet",
        data=company
    )
