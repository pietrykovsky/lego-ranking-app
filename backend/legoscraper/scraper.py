from selenium import webdriver
from selenium.common.exceptions import TimeoutException

from decimal import Decimal

from bs4 import BeautifulSoup

class LegoScraper():
    """Lego webstore scrapper"""

    def __init__(self, themes_url):
        self.options = webdriver.ChromeOptions()
        self.options.headless = True
        self.options.add_argument("--disable-dev-shm-usage")
        self.options.add_argument("--no-sandbox")
        self.options.add_argument("--incognito")

        self.path = "/usr/local/bin/chromedriver"
        self.themes_url = themes_url

    def get_html(self, url):
        """Retreive and return html from url."""
        with webdriver.Chrome(self.path, chrome_options=self.options) as driver:
            while True:
                try:
                    driver.set_page_load_timeout(30)
                    driver.get(url)
                    html = driver.page_source
                    break
                except TimeoutException:
                    pass

        return html

    def get_pages_count(self, url):
        """Retrieve pages count from url."""
        html = self.get_html(url)
        soup = BeautifulSoup(html, 'html.parser')

        pages = soup.find_all('a', class_='Paginationstyles__PageLink-npbsev-7')
        
        if len(pages) == 0:
            pages_count = 1
        else:
            pages_count = len(pages)

        return pages_count

    def scrape_themes_urls(self):
        """Return list of lego themes urls."""
        html = self.get_html(self.themes_url)
        soup = BeautifulSoup(html, 'html.parser')
        list = ['https://www.lego.com' + link.get('href') for link in soup.find_all('a', class_="CategoryLeafstyles__ImagesLink-is33yg-4")]

        return list

    def scrape_sets_urls_from_theme(self, theme_url):
        """Return list of lego sets urls from theme url."""
        list = []
        pages_count = self.get_pages_count(theme_url)

        for page in range(1, pages_count+1):
            html = self.get_html(theme_url + f'?page={page}')
            soup = BeautifulSoup(html, 'html.parser')

            for link in soup.find_all('a', attrs={'data-test': "product-leaf-title-link"}):
                list.append('https://www.lego.com' + link.get('href'))

        return list

    def scrape_set(self, url):
        """Retrieve lego set fields from url and return dictionary of fields."""
        html = self.get_html(url)
        soup = BeautifulSoup(html, 'html.parser')
        
        try:
            title = soup.find(attrs={'property': 'og:title'})['content']
            str_list = title.split('|')
            title = str_list[0][:len(str_list[0])-1]
            theme = str_list[1]
            theme = theme[1:len(theme)-1]
        except:
            title = None
            theme = None

        try:
            product_id = soup.find(attrs={'property': 'product:retailer_item_id'})['content']
        except:
            product_id = None

        try:
            price = soup.find(attrs={'property': 'product:price:amount'})['content']
            price = Decimal(price)
        except:
            price = None

        try:
            available = soup.find(attrs={'data-test': 'product-overview-availability'}).find('span').string
        except:
            available = None

        try:
            age = soup.find(attrs={'data-test': 'ages-value'}).find('span').find('span').string
        except:
            age = None

        try:
            elements = soup.find(attrs={'data-test': 'pieces-value'}).find('span').find('span').string
            elements = int(elements)
        except:
            elements = None
        
        try:
            minifigures = soup.find(attrs={'data-test': 'minifigures-value'}).find('span').find('span').string
            minifigures = int(minifigures)
        except:
            minifigures = None
            
        try:
            img_src = soup.find(attrs={'property': 'og:image'})['content']
            tmp = img_src.split('?')
            img_src = tmp[0]
        except:
            img_src = None

        lego_set = {
            'title': title,
            'product_id': product_id,
            'theme': theme,
            'price': price,
            'available': available,
            'age': age,
            'elements': elements,
            'link': url,
            'minifigures': minifigures,
            'img_src': img_src,
        }

        return lego_set