from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from src import database_utils, config, api

database_utils.init()

app = FastAPI(title="Seeking")

app.include_router(api.job.router)
app.include_router(api.event.router)
app.include_router(api.database.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOW_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
