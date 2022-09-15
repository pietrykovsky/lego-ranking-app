from django.test import TestCase

from ..scraper import LegoScraper

from decimal import Decimal

class ScraperTests(TestCase):
    """Tests for scraper module."""
    
    def setUp(self):
        themes_url = 'https://www.lego.com/pl-pl/themes/'
        self.scraper = LegoScraper(themes_url)

    def test_get_pages_count_correct(self):
        """Test get_pages_count returns correct number of pages."""
        url = 'https://www.lego.com/pl-pl/themes/classic'
        classic_pages_count = self.scraper.get_pages_count(url)
        url = 'https://www.lego.com/pl-pl/themes/speed-champions'
        speed_pages_count = self.scraper.get_pages_count(url)
        
        self.assertEqual(classic_pages_count, 2)
        self.assertEqual(speed_pages_count, 1)

    def test_scrape_themes_urls_success(self):
        """Test function returns list of themes urls correct."""
        urls = self.scraper.scrape_themes_urls()
        
        self.assertIn('https://www.lego.com/pl-pl/themes/architecture', urls)

    def test_scrape_sets_urls_from_theme_success(self):
        """Test function returns list of sets urls correct."""
        urls = self.scraper.scrape_sets_urls_from_theme('https://www.lego.com/pl-pl/themes/speed-champions')
        
        self.assertIn('https://www.lego.com/pl-pl/product/007-aston-martin-db5-76911', urls)

    def test_scrape_set_success(self):
        """Test scrape set function returns correct values."""
        url = 'https://www.lego.com/pl-pl/product/lego-creative-bricks-10692'
        fields = self.scraper.scrape_set(url)
        lego_set = {
            'title': 'Kreatywne klocki LEGO® 10692',
            'product_id': '10692',
            'theme': 'Classic',
            'price': Decimal("69.99"),
            'available': 'Dostępne teraz',
            'age': '4-99',
            'elements': 221,
            'link': url,
            'minifigures': None,
            'img_src': 'https://www.lego.com/cdn/cs/set/assets/bltdcfc11be71d04698/10692.jpg'
        }
        print(fields)
        for k, v in lego_set.items():
            self.assertEqual(fields[k], v)

    def test_scrape_sets_image_success(self):
        """Test scrape set with image source success."""
        url = 'https://www.lego.com/pl-pl/product/007-aston-martin-db5-76911'
        fields = self.scraper.scrape_set(url)
        print(fields)
        self.assertIsNotNone(fields['img_src'])