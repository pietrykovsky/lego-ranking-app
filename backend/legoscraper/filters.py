from django_filters import rest_framework as filters

from .models import LegoSet

class LegoSetFilter(filters.FilterSet):
    """Basic filter set for lego set api."""
    price = filters.RangeFilter(field_name='price')
    elements = filters.RangeFilter(field_name='elements')
    theme_name = filters.CharFilter(field_name='theme__name', lookup_expr='icontains')
    age_name = filters.CharFilter(field_name='age__name')
    minifigures = filters.RangeFilter(field_name='minifigures')

    class Meta:
        model = LegoSet
        fields = ['available', 'theme', 'age']