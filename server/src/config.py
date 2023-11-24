import os


def getenv_or_raise(name: str):
    value = os.getenv(name)
    if not value:
        raise Exception(f'Please define a {name} env var')
    return value


DATABASE_NAME = getenv_or_raise('DATABASE_NAME')
DATABASE_USER = getenv_or_raise('DATABASE_USER')
DATABASE_PASSWORD = getenv_or_raise('DATABASE_PASSWORD')
DATABASE_SERVER = getenv_or_raise('DATABASE_SERVER')

SQLALCHEMY_DATABASE_URL = f'postgresql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_SERVER}/{DATABASE_NAME}'

ALLOW_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1",
    "http://localhost",
]
