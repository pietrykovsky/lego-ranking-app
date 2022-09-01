from drf_spectacular.utils import extend_schema_view

from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ReadOnlyModelViewSet

from django.shortcuts import get_object_or_404
from django.db.models.functions import Round
from django.db.models import ExpressionWrapper, F, DecimalField

from .serializers import LegoSetSerializer, ThemeSerializer, AgeCategorySerializer

from .models import LegoSet, Theme, AgeCategory

from .filters import LegoSetFilter

@extend_schema_view()
class LegoSetViewSet(ReadOnlyModelViewSet):
    """View set for lego set api."""
    serializer_class = LegoSetSerializer
    queryset = LegoSet.objects.all()
    lookup_field = 'product_id'
    filterset_class = LegoSetFilter
    search_fields = ['title', 'theme__name']

    def get_queryset(self):
        """Return the lego set queryset ordered by price per element ratio ascending."""
        queryset = LegoSet.objects.annotate(price_per_element=ExpressionWrapper(Round(F('price')/F('elements'), 2), output_field=DecimalField())).order_by('price_per_element')

        return queryset

    def get_object(self):
        """Return the lego set object by product id."""
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, product_id=self.kwargs['product_id'])

        return obj

@extend_schema_view()
class ThemeListView(ListAPIView):
    """List view for theme categories."""
    serializer_class = ThemeSerializer
    queryset = Theme.objects.all()
    search_fields = ['name']

@extend_schema_view()
class AgeCategoryListView(ListAPIView):
    """List view for age categories."""
    serializer_class = AgeCategorySerializer
    queryset = AgeCategory.objects.all()
    search_fields = ['name']