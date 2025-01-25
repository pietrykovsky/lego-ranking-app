#!/bin/sh

# Run database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --no-input

# Start the Gunicorn server
gunicorn core.wsgi --bind 0.0.0.0:8000