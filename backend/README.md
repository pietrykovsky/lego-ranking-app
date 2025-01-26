# Lego Ranking Backend

Backend service for the Lego Ranking application built with Django REST framework. This service scrapes Lego sets data from the official Lego store, processes it, and serves it through a RESTful API.

## Tech Stack

- Python 3.13
- Django 5.1
- Django REST Framework
- Celery
- Redis
- PostgreSQL
- Docker
- Selenium (for web scraping)
- Poetry (dependency management)

## Features

- RESTful API for Lego sets data
- Automated data scraping from the official Lego store
- Image processing and optimization
- Filtering and search capabilities
- Price per element ratio calculations
- Periodic database updates using Celery
- Swagger API documentation
- Health check endpoint
- Docker containerization

## Prerequisites

- Docker and Docker Compose
- Python 3.13 (for local development)
- Poetry (for local development)

## Installation

1. Clone the repository and navigate to the backend directory

2. Create a `.env` file in the project root based on the provided example:

```env
DEBUG=false
DJANGO_SECRET_KEY='your-secret-key'
DJANGO_ALLOWED_HOSTS='127.0.0.1,0.0.0.0'
CORS='http://127.0.0.1,http://0.0.0.0'
DJANGO_SETTINGS_MODULE=core.settings

REDIS_CLOUD_URL=redis://redis:6379

POSTGRES_DB=your_db_name
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
```

3. Build and run the containers:

```bash
docker-compose up backend --build
```

The service will be available at `http://localhost:8000`.

## Local Development

1. Install dependencies:

```bash
poetry install
```

2. Run migrations:

```bash
poetry run python manage.py migrate
```

4. Start the development server:

```bash
poetry run python manage.py runserver
```

## Scheduled Tasks

The application uses Celery for scheduled tasks:

- Daily database refresh (scraping new data) at midnight
- Configurable through Django admin panel at `/admin/`

## Database modification

To modify the database schema, make changes to the models in `core/models.py` and run the following commands:

```bash
poetry run python manage.py makemigrations
```

Then you can apply the changes:

```bash
poetry run python manage.py migrate
```

**Warning:** In order to apply the changes to the database you need to have database service running. If you are using Docker, you can run the following command to start the database service:

```bash
docker-compose up db
```

## Testing

Run the test suite:

```bash
poetry run python manage.py test
```
