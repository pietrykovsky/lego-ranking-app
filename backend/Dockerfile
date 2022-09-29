FROM python:3.10-slim-buster

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend
COPY requirements.txt /app/backend

RUN pip install --upgrade pip && \
    pip install -r requirements.txt