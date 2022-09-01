from rest_framework.test import APITestCase
from rest_framework import status

from django.urls import reverse
from django.db.models.functions import Round
from django.db.models import ExpressionWrapper, F, DecimalField

from decimal import Decimal

from legoscraper import models, serializers

LEGOSETS_URL = reverse('legoset-list')
THEMES_URL = reverse('legosets-theme-list')
AGE_CATEGORIES_URL = reverse('legosets-age-category-list')

def detail_url(product_id):
    """Return legosets detail url."""
    return reverse('legoset-detail', kwargs={'product_id': product_id})

def create_theme(name='test theme'):
    """Create and return a theme instance."""
    return models.Theme.objects.create(name=name)

def create_age_category(name='18+'):
    """Create and return an age category instance."""
    return models.AgeCategory.objects.create(name=name)

def create_legoset(title='test title', product_id='10567', price=Decimal('9.99'), available=True, elements=1000, link='link', minifigures=10, **kwargs):
    """Create and return a legoet instance."""
    if not 'theme' in kwargs:
        kwargs['theme'] = create_theme('test theme')
    if not 'age' in kwargs:
        kwargs['age'] = create_age_category('18+')
    legoset = models.LegoSet.objects.create(title=title, product_id=product_id, theme=kwargs['theme'], price=price, available=available, age=kwargs['age'], elements=elements, link=link, minifigures=minifigures)

    return legoset

class LegoSetAPITests(APITestCase):
    """Basic test suite for lego sets api."""

    def test_retrieve_legosets(self):
        """Test retrieve a list of lego sets success."""
        create_legoset()

        response = self.client.get(LEGOSETS_URL)
        legoset = models.LegoSet.objects.all().annotate(price_per_element=ExpressionWrapper(Round(F('price')/F('elements'), 2), output_field=DecimalField()))
        serializer = serializers.LegoSetSerializer(legoset, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], serializer.data)

    def test_retrieve_legoset_detail(self):
        """Test retrieve single lego set success."""
        legoset = create_legoset()

        response = self.client.get(detail_url(legoset.product_id))
        obj = models.LegoSet.objects.annotate(price_per_element=ExpressionWrapper(Round(F('price')/F('elements'), 2), output_field=DecimalField())).get(product_id = legoset.product_id)
        serializer = serializers.LegoSetSerializer(obj)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_retrieve_legoset_themes(self):
        """Test retrieve legoset theme list success."""
        themes = []
        for i in range(5):
            themes.append(create_theme(f'test{i}'))
        
        response = self.client.get(THEMES_URL)
        serializer = serializers.ThemeSerializer(themes, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], serializer.data)

    def test_retrieve_legoset_age_categories(self):
        """Test retrieve legoset age category list success."""
        age_categories = []
        for i in range(5):
            age_categories.append(create_age_category(f'test{i}'))
        
        response = self.client.get(AGE_CATEGORIES_URL)
        serializer = serializers.AgeCategorySerializer(age_categories, many=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['results'], serializer.data)