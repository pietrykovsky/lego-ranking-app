from django.test import TestCase

from ..tasks import refresh_database

from ..models import LegoSet, Theme, AgeCategory

class TasksTests(TestCase):
    """Test celery tasks."""

    def test_refresh_database_success(self):
        """Test refresh_database fills the database with legosets."""
        refresh_database()

        themes = Theme.objects.all()
        age_categories = AgeCategory.objects.all()
        legosets = LegoSet.objects.all()
        
        self.assertIsNotNone(themes)
        self.assertIsNotNone(age_categories)
        self.assertIsNotNone(legosets)