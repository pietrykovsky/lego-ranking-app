from rest_framework import routers

from django.urls import path, include

from .views import LegoSetViewSet, ThemeListView, AgeCategoryListView

router = routers.DefaultRouter()
router.register('legosets', LegoSetViewSet)

urlpatterns = [
    path('legosets/themes/', ThemeListView.as_view(), name='legosets-theme-list'),
    path('legosets/age-categories/', AgeCategoryListView.as_view(), name='legosets-age-category-list'),
    path('', include(router.urls)),
]