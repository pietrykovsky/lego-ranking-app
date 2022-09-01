from selenium import webdriver

from decimal import Decimal

from bs4 import BeautifulSoup

class LegoScraper():
    """Lego webstore scrapper"""

    def __init__(self, themes_url):
        self.options = webdriver.ChromeOptions()
        self.options.add_argument(" - incognito")
        self.options.add_argument("--headless")
        self.options.add_argument("--disable-dev-shm-usage")
        self.options.add_argument("--no-sandbox")

        self.path = "/usr/local/bin/chromedriver"
        self.themes_url = themes_url

    def get_html(self, url):
        """Retreive and return html from url."""
        with webdriver.Chrome(self.path, chrome_options=self.options) as driver:
            driver.get(url)
            html = driver.page_source

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
            available = soup.find(attrs={'data-test': 'product-overview-availability'}).find(class_='Markup__StyledMarkup-ar1l9g-0 gkoBeO').string
        except:
            available = None

        try:
            age = soup.find(attrs={'data-test': 'ages-value'}).find(class_='Markup__StyledMarkup-ar1l9g-0 gkoBeO').string
        except:
            age = None

        try:
            elements = soup.find(attrs={'data-test': 'pieces-value'}).find(class_='Markup__StyledMarkup-ar1l9g-0 gkoBeO').string
            elements = int(elements)
        except:
            elements = None
        
        try:
            minifigures = soup.find(attrs={'data-test': 'minifigures-value'}).find(class_='Markup__StyledMarkup-ar1l9g-0 gkoBeO').string
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
        
    def scrape(self):
        """Scrape all sets from lego web store and return list of dictionaries with set data."""
        list = []

        themes_urls = self.scrape_themes_urls()

        for theme_url in themes_urls:
            sets_urls = self.scrape_sets_urls_from_theme(theme_url)

            for set_url in sets_urls:
                lego_set = self.scrape_set(set_url)

                if lego_set['elements'] != None:
                    list.append(lego_set)
    
        return list