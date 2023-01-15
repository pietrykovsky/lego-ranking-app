import requests

from decimal import Decimal

from bs4 import BeautifulSoup


class LegoScraper:
    """Lego webstore scrapper"""

    def __init__(self, themes_url):
        self.themes_url = themes_url

    def get_html(self, url):
        """Retreive and return html from url."""
        response = requests.get(url)
        html = response.text

        return html

    def has_next_page(self, html):
        """Return true if has next page and false otherwise."""
        soup = BeautifulSoup(html, "html.parser")
        if soup.find("a", attrs={"data-test": "pagination-next"}):
            return True
        return False

    def scrape_themes_urls(self):
        """Return list of lego themes urls."""
        html = self.get_html(self.themes_url)
        soup = BeautifulSoup(html, "html.parser")
        list = [
            "https://www.lego.com" + link.get("href")
            for link in soup.find_all("a", attrs={"data-test": "themes-link"})
        ]
        return list

    def scrape_sets_urls_from_theme(self, theme_url):
        """Return list of lego sets urls from theme url."""
        list = []
        page = 1
        while True:
            html = self.get_html(theme_url + f"?page={page}")
            soup = BeautifulSoup(html, "html.parser")

            for link in soup.find_all(
                "a", attrs={"data-test": "product-leaf-title-link"}
            ):
                list.append("https://www.lego.com" + link.get("href"))

            if not self.has_next_page(html):
                break

            page += 1

        return list

    def scrape_set(self, url):
        """Retrieve lego set fields from url and return dictionary of fields."""
        html = self.get_html(url)
        soup = BeautifulSoup(html, "html.parser")

        try:
            title = soup.find(attrs={"property": "og:title"})["content"]
            str_list = title.split("|")
            title = str_list[0][: len(str_list[0]) - 1]
            theme = str_list[1]
            theme = theme[1 : len(theme) - 1]
        except:
            title = None
            theme = None

        try:
            product_id = soup.find(attrs={"property": "product:retailer_item_id"})[
                "content"
            ]
        except:
            product_id = None

        try:
            price = soup.find(attrs={"property": "product:price:amount"})["content"]
            price = Decimal(price)
        except:
            price = None

        try:
            available = (
                soup.find(attrs={"data-test": "product-overview-availability"})
                .find("span")
                .string
            )
        except:
            available = None

        try:
            age = (
                soup.find(attrs={"data-test": "ages-value"})
                .find("span")
                .find("span")
                .string
            )
        except:
            age = None

        try:
            elements = (
                soup.find(attrs={"data-test": "pieces-value"})
                .find("span")
                .find("span")
                .string
            )
            elements = int(elements)
        except:
            elements = None

        try:
            minifigures = (
                soup.find(attrs={"data-test": "minifigures-value"})
                .find("span")
                .find("span")
                .string
            )
            minifigures = int(minifigures)
        except:
            minifigures = None

        try:
            img_src = soup.find(attrs={"property": "og:image"})["content"]
            tmp = img_src.split("?")
            img_src = tmp[0]
        except:
            img_src = None

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
