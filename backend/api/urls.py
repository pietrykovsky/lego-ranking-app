from rest_framework import routers

from django.urls import path, include

from api.views import LegoSetViewSet, ThemeListView, AgeCategoryListView, health_check

router = routers.DefaultRouter()
router.register("legosets", LegoSetViewSet)

urlpatterns = [
    path("health/", health_check, name="health-check"),
    path("legosets/themes/", ThemeListView.as_view(), name="legosets-theme-list"),
    path("legosets/age-categories/", AgeCategoryListView.as_view(), name="legosets-age-category-list"),
    path("", include(router.urls)),
]
