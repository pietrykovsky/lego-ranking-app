from django.test import TestCase

from ..tasks import refresh_database

from ..models import LegoSet, Theme, AgeCategory
from ..scraper import LegoScraper

def availability_string_to_bool(available):
    """Convert availability to boolean value."""
    if available == 'Dostępne teraz':
        return True

    return False

class TasksTests(TestCase):
    """Test celery tasks."""

    def test_refresh_database_success(self):
        """Test refresh_database fills the database with legosets."""
        url = 'https://www.lego.com/pl-pl/themes'
        scraper = LegoScraper(url)
        scraped_sets = scraper.scrape()

        refresh_database()

        themes = Theme.objects.all()
        age_categories = AgeCategory.objects.all()
        legosets = LegoSet.objects.all()
        
        self.assertIsNotNone(themes)
        self.assertIsNotNone(age_categories)
        self.assertIsNotNone(legosets)

        for set in scraped_sets:
            legoset = legosets.get(product_id=set['product_id'])

            if legoset != None:
                set['available'] = availability_string_to_bool(set['available'])
                for k, v in set.items():
                    if k == 'theme' or k == 'age':
                        self.assertEqual(getattr(legoset, k).name, v)
                    else:
                        self.assertEqual(getattr(legoset, k), v)