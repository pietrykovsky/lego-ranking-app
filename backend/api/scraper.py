from typing import Optional
from decimal import Decimal
import requests
from PIL import Image, ImageFile
from io import BytesIO
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from api.utils import process_image


class LegoScraper:
    BASE_URL = "https://www.lego.com"
    THEMES_URL = f"{BASE_URL}/pl-pl/themes"

    @classmethod
    def _get_html(cls, url: str) -> str:
        try:
            options = FirefoxOptions()
            options.add_argument("-headless")
            driver = webdriver.Firefox(options=options)
            driver.get(url)
            html = driver.page_source
        finally:
            driver.quit()

        return html

    @classmethod
    def get_image(cls, url: str) -> ImageFile:
        response = requests.get(url)
        response.raise_for_status()

        img = Image.open(BytesIO(response.content))
        return img

    @classmethod
    def scrape_themes_urls(cls) -> list[str]:
        html = cls._get_html(cls.THEMES_URL)
        soup = BeautifulSoup(html, "html.parser")
        theme_links = [
            f"{cls.BASE_URL}{link.get('href')}" for link in soup.find_all("a", attrs={"data-test": "themes-link"})
        ]
        return theme_links

    @classmethod
    def scrape_sets_urls_from_theme(cls, theme_url: str) -> list[str]:
        set_links = []
        page = 1
        while True:
            html = cls._get_html(f"{theme_url}?page={page}")
            soup = BeautifulSoup(html, "html.parser")

            elements = soup.find_all("a", attrs={"data-test": "product-leaf-image-link"})
            if not elements:
                break

            for link in elements:
                set_links.append(f"{cls.BASE_URL}{link.get('href')}")

            page += 1

        return set_links

    @classmethod
    def _extract_property(cls, soup, attrs, converters=None):
        if converters is None:
            converters = []

        try:
            content = soup.find(attrs=attrs)
            for converter in converters:
                content = converter(content)
            return content
        except Exception:
            return None

    @classmethod
    def scrape_set(cls, url: str) -> dict[str, Optional[str]]:
        html = cls._get_html(url)
        soup = BeautifulSoup(html, "html.parser")

        title = cls._extract_property(soup, {"property": "og:title"}, [lambda x: x["content"].split("|")[0].strip()])
        theme = cls._extract_property(soup, {"property": "og:title"}, [lambda x: x["content"].split("|")[1].strip()])
        product_id = cls._extract_property(soup, {"property": "product:retailer_item_id"}, [lambda x: x["content"]])
        price = Decimal(cls._extract_property(soup, {"property": "product:price:amount"}, [lambda x: x["content"]]))
        available = cls._extract_property(
            soup, {"data-test": "product-overview-availability"}, [lambda x: x.find("span").string]
        )
        age = cls._extract_property(soup, {"data-test": "ages-value"}, [lambda x: x.find("span").string])
        elements = cls._extract_property(soup, {"data-test": "pieces-value"}, [lambda x: int(x.find("span").string)])
        minifigures = cls._extract_property(
            soup, {"data-test": "minifigures-value"}, [lambda x: int(x.find("span").string)]
        )
        img_src = cls._extract_property(soup, {"property": "og:image"}, [lambda x: x["content"].split("?")[0]])
        img = None

        if img_src:
            img = cls.get_image(img_src)
            img = process_image(img)

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
            "img": img,
        }

        return lego_set
