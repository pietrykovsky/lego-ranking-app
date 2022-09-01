from celery import shared_task
from celery.utils.log import get_task_logger

from .scraper import LegoScraper

from .models import LegoSet, Theme, AgeCategory

logger = get_task_logger(__name__)

def availability_string_to_bool(available):
    """Convert availability to boolean value."""
    if available == 'Dostępne teraz':
        return True

    return False

@shared_task
def refresh_database():
    """Scrape data from lego store and add it to the database."""
    logger.info('Refreshing database...')
    
    themes_url = 'https://www.lego.com/pl-pl/themes'
    scraper = LegoScraper(themes_url)

    logger.info('Scraping data...')
    scraped_sets = scraper.scrape()
    logger.info('Scraping data complete.')
    for scraped_data in scraped_sets:
        theme, theme_created = Theme.objects.get_or_create(name=scraped_data['theme'])
        if theme_created:
            logger.info(f'{theme} has been added to database.')
        scraped_data['theme'] = theme

        age, age_created = AgeCategory.objects.get_or_create(name=scraped_data['age'])
        if age_created:
            logger.info(f'{age} has been added to database.')
        scraped_data['age'] = age

        scraped_data['available'] = availability_string_to_bool(scraped_data['available'])

        lego_set, created = LegoSet.objects.update_or_create(product_id=scraped_data['product_id'], defaults=scraped_data)
        if created:
            logger.info(f'{lego_set} has been added to database.')
        else:
            logger.info(f'{lego_set} has been updated.')

    logger.info('Refreshing database complete.')