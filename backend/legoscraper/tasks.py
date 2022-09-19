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

def add_legoset_to_db(lego_set):
    """Save legoset object in the database."""
    if lego_set['minifigures'] is None:
        del lego_set['minifigures']
    if lego_set['elements'] is not None:
        theme, theme_created = Theme.objects.get_or_create(name=lego_set['theme'])
        if theme_created:
            logger.info(f'{theme} has been added to database.')
        lego_set['theme'] = theme

        age, age_created = AgeCategory.objects.get_or_create(name=lego_set['age'])
        if age_created:
            logger.info(f'{age} has been added to database.')
        lego_set['age'] = age

        lego_set['available'] = availability_string_to_bool(lego_set['available'])

        lego_set_object, created = LegoSet.objects.update_or_create(product_id=lego_set['product_id'], defaults=lego_set)
        if created:
            logger.info(f'{lego_set_object} has been added to database.')
        else:
            logger.info(f'{lego_set_object} has been updated.')

@shared_task
def refresh_database():
    """Scrape data from lego store and add it to the database."""
    logger.info('Refreshing database...')
    
    themes_url = 'https://www.lego.com/pl-pl/themes'
    scraper = LegoScraper(themes_url)

    logger.info('Scraping data...')
    themes_urls = scraper.scrape_themes_urls()
    logger.info(f'Scraped themes urls: {themes_urls}')
    for theme_url in themes_urls:
        sets_urls = scraper.scrape_sets_urls_from_theme(theme_url)
        logger.info(f'Scraped sets urls in {theme_url}:  {sets_urls}')

        for set_url in sets_urls:
            try:
                lego_set = scraper.scrape_set(set_url)
                logger.info(f'Scraped lego_set in {set_url}:  {lego_set}')
                add_legoset_to_db(lego_set)
            except Exception as ex:
                logger.warning(f"Exception {ex} has occured.")
                logger.warning(f"Failed to add {lego_set} to the database.")
                
    logger.info('Scraping data complete.')
    logger.info('Refreshing database complete.')