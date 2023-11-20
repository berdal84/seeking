# seeking
Tiny app to practice Python and FastAPI.

## Install

Run the script below

```shell
pip install -r requirements.txt
```

## Run app

Prerequisites: see install section

```shell
uvicorn main:app --reload
```

Will start the application, served on `http://127.0.0.1:8000`

## Documentation

To get the API documentation, while the server is running, browse one of these url:
- `http://127.0.0.1:8000/redoc` (redoc)
- `http://127.0.0.1:8000/docs` (swagger)
