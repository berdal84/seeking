# seeking
Tiny app to practice Python and FastAPI.

## Install

Run the script below

```shell
pip install fastapi[standard] uvicorn[standard]
```

## Run app

Prerequisites: see install section

```shell
uvicorn main:app --reload
```

Will start the application, served on `http://127.0.0.1:8000`

## Open API

While the server is running, browse `http://127.0.0.1:8000/docs` to get the API documentation.
