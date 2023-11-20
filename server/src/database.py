import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


def getenv_or_raise(name: str):
    value = os.getenv(name)
    if not value:
        raise Exception(f'Please define a {name} env var')
    return value


NAME = getenv_or_raise('DATABASE_NAME')
USER = getenv_or_raise('DATABASE_USER')
PASSWORD = getenv_or_raise('DATABASE_PASSWORD')
SERVER = getenv_or_raise('DATABASE_SERVER')

SQLALCHEMY_DATABASE_URL = f'postgresql://{USER}:{PASSWORD}@{SERVER}/{NAME}'

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
