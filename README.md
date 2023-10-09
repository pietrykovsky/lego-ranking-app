# lego-ranking-app

Fullstack application for viewing and ranking LEGO sets developed in REST methodology.

## Preview
- [Website](http://lego-ranking.duckdns.org/)

## Features
* View LEGO sets with detailed information.
* Rank LEGO sets based on user preferences.
* Interactive frontend for filtering, searching, and displaying LEGO sets.
* Backend API endpoints to interact with LEGO data.
* LEGO scraper that fetches set details.
* Background tasks for periodic updates.
* Customized admin panel for managing LEGO set data.

## Requirements
* Docker and Docker Compose
* Python 3.10 (optional to run the start script)

## Installation
Firstly, clone the repository from GitHub to your local folder with the following command:
```
git clone https://github.com/pietrykovsky/lego-ranking-app.git
```

Next, create an `.env` file where the `docker-compose.yml` is and copy the content from the `.env.sample` file (if provided). Example:
```env
DEV=true

DJANGO_SECRET_KEY='hashed_secret_key'
DJANGO_ALLOWED_HOSTS='127.0.0.1,0.0.0.0'
CORS='http://127.0.0.1,http://0.0.0.0'
DJANGO_SETTINGS_MODULE=api.settings

REDIS_CLOUD_URL=redis://redis:6379

DB_NAME=database
DB_USER=admin
DB_PASSWORD=password
DB_HOST=db
```

In the same directory, where the `run.py` is, run the following commands:
```sh
python run.py
or
python3 run.py
or
py run.py
```

You can also build the project manually with the following commands:
```sh
# DEV
docker-compose -f docker-compose.yml -f docker-compose.override.yml build
# PROD
docker-compose -f docker-compose.yml build
```

## Usage

To start the container and test the app, run the following command:
```sh
# DEV
docker-compose -f docker-compose.yml -f docker-compose.override.yml up
# PROD
docker-compose -f docker-compose.yml up
```

Now you can head over to the frontend to interact with the LEGO sets or access the backend API for more functionalities.

To stop the container, run:
```sh
docker compose down
```

To create an admin account, run:
```sh
docker compose run --rm backend python manage.py createsuperuser
```
