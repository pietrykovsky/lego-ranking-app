# lego-ranking-app

Fullstack application for viewing and ranking LEGO sets developed in REST methodology.

## Preview

- [Website](https://lego-ranking.pietrykovsky.com/)

## Features

- View LEGO sets with detailed information.
- Rank LEGO sets based on user preferences.
- Interactive frontend for filtering, searching, and displaying LEGO sets.
- Backend API endpoints to interact with LEGO data.
- LEGO scraper that fetches set details.
- Background tasks for periodic updates.
- Customized admin panel for managing LEGO set data.

## Requirements

- Docker and Docker Compose
- Python 3.13
- Node.js 22.12

## Installation

Firstly, clone the repository from GitHub to your local folder with the following command:

```
git clone https://github.com/pietrykovsky/lego-ranking-app.git
```

Next, create an `.env` file where the `compose.yml` is and copy the content from the `.env.sample` file (if provided). Example:

```env
DEBUG=false

DJANGO_SECRET_KEY='django-insecure-6jnd59msozhis^2j2^3v4fdif&-m$_6tn#ls_1l-^m3%t6ve5q'
DJANGO_ALLOWED_HOSTS=127.0.0.1,0.0.0.0,localhost,lego-ranking-frontend,lego-ranking-backend,lego-ranking-frontend:3000
CORS=http://127.0.0.1:3000,http://0.0.0.0:3000,http://localhost:3000,http://lego-ranking-frontend:3000,http://lego-ranking-backend:8000
DJANGO_SETTINGS_MODULE=core.settings

REDIS_CLOUD_URL=redis://redis:6379

POSTGRES_DB=changeme
POSTGRES_USER=changeme
POSTGRES_PASSWORD=changeme

NODE_ENV=production
API_URL="http://lego-ranking-backend:8000/api"
```

You can also build the project manually with the following commands:

```sh
docker compose build
```

## Usage

To start the container and test the app, run the following command:

```sh
docker compose up
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
