#!bin/bash
python manage.py wait_for_db
python manage.py makemigrations
python manage.py migrate
gunicorn api.wsgi --bind 0.0.0.0:8000