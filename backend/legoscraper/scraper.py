from decimal import Decimal
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from typing import List, Dict, Optional

class LegoScraper:
    BASE_URL = "https://www.lego.com"
    
    def __init__(self, themes_url: str):
        self.themes_url = themes_url

    def _get_html(self, url: str) -> str:
        # response = requests.get(url)
        options = FirefoxOptions()
        options.add_argument("-headless")
        driver = webdriver.Firefox(options=options)
        driver.get(url)
        html = driver.page_source
        driver.quit()

        return html
    
    def scrape_themes_urls(self) -> List[str]:
        html = self._get_html(self.themes_url)
        soup = BeautifulSoup(html, "html.parser")
        theme_links = [
            f"{self.BASE_URL}{link.get('href')}" 
            for link in soup.find_all("a", attrs={"data-test": "themes-link"})
        ]
        return theme_links

    def scrape_sets_urls_from_theme(self, theme_url: str) -> List[str]:
        set_links = []
        page = 1
        while True:
            html = self._get_html(f"{theme_url}?page={page}")
            soup = BeautifulSoup(html, "html.parser")

            elements = soup.find_all("a", attrs={"data-test": "product-image-link"})
            if not elements:
                break

            for link in elements:
                set_links.append(f"{self.BASE_URL}{link.get('href')}")

            page += 1

        return set_links

    def _extract_property(self, soup, attrs, converters=None):
        if converters is None:
            converters = []

        try:
            content = soup.find(attrs=attrs)
            for converter in converters:
                content = converter(content)
            return content
        except Exception as e:
            return None

    def scrape_set(self, url: str) -> Dict[str, Optional[str]]:
        html = self._get_html(url)
        soup = BeautifulSoup(html, "html.parser")

        title = self._extract_property(
            soup, {"property": "og:title"},
            [lambda x: x["content"].split("|")[0].strip()]
        )
        theme = self._extract_property(
            soup, {"property": "og:title"},
            [lambda x: x["content"].split("|")[1].strip()]
        )
        product_id = self._extract_property(soup, {"property": "product:retailer_item_id"}, [lambda x: x["content"]])
        price = Decimal(self._extract_property(soup, {"property": "product:price:amount"}, [lambda x: x["content"]]))
        available = self._extract_property(soup, {"data-test": "product-overview-availability"}, [lambda x: x.find("span").string])
        age = self._extract_property(soup, {"data-test": "ages-value"}, [lambda x: x.find("span").find("span").string])
        elements = self._extract_property(soup, {"data-test": "pieces-value"}, [lambda x: int(x.find("span").find("span").string)])
        minifigures = self._extract_property(soup, {"data-test": "minifigures-value"}, [lambda x: int(x.find("span").find("span").string)])
        img_src = self._extract_property(soup, {"property": "og:image"}, [lambda x: x["content"].split("?")[0]])

        lego_set = {
            "title": title,
            "product_id": product_id,
            "theme": theme,
            "price": price,
            "available": available,
            "age": age,
            "elements": elements,
            "link": url,
            "minifigures": minifigures,
            "img_src": img_src,
        }

        return lego_set
    