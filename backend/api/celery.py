from celery import Celery
from celery.schedules import crontab

app = Celery('api')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.beat_schedule = {
    'refresh_database': {
        'task': 'legoscraper.tasks.refresh_database',
        'schedule': crontab(minute=0, hour='*/3')
    }
}