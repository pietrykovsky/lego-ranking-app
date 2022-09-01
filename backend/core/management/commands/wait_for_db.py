from django.core.management.base import BaseCommand
from django.db.utils import OperationalError

import time

from psycopg2 import OperationalError as psycopg2error

class Command(BaseCommand):
    """Django command to wait for database."""

    def handle(self, *args, **kwargs):
        """Entry point for command."""
        self.stdout.write('Waiting for database...')
        db_up = False
        while db_up is False:
            try:
                self.check(databases=['default'])
                db_up = True
            except (psycopg2error, OperationalError):
                self.stdout('Database is not available, waiting...')
                time.sleep(1)

        self.stdout.write(self.style.SUCCESS('Database available!'))