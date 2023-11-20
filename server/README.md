# Seeking (backend)

## Install

### Prerequisites (do once):

This project is developed using a GNU/Linux distribution.
Make sure [python 3.12](https://www.makeuseof.com/install-python-ubuntu/) is installed

Install postgres ([documentation](https://www.postgresql.org/docs/current/tutorial-install.html))

```
sudo apt-get -y install postgresql
``` 

Set up the database with `psql`

```
sudo -u postgres psql
postgres=# create database seeking;
```
A message `CREATE DATABASE` should confirm the creation of the db.

### Install the requirements

Run the script below

```shell
pip install -r requirements.txt
```

### Environment

Set up the following environment variables

```
DATABASE_NAME=seeking
DATABASE_SERVER=127.0.0.1
DATABASE_USER=postgress
DATABASE_PASSWORD=<your-postgres-password>
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
