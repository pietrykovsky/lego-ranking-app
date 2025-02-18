from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field
from django.conf import settings

from api.models import LegoSet, AgeCategory, Theme


class ThemeSerializer(serializers.ModelSerializer):
    """Serializer for theme category."""

    class Meta:
        model = Theme
        fields = ["id", "name"]
        read_only_fields = fields


class AgeCategorySerializer(serializers.ModelSerializer):
    """Serializer for age category."""

    class Meta:
        model = AgeCategory
        fields = ["id", "name"]
        read_only_fields = fields


class LegoSetSerializer(serializers.ModelSerializer):
    """Serializer for lego set."""

    theme = ThemeSerializer()
    age = AgeCategorySerializer()
    price_per_element = serializers.SerializerMethodField()
    img = serializers.SerializerMethodField()

    class Meta:
        model = LegoSet
        fields = [
            "title",
            "product_id",
            "price",
            "elements",
            "price_per_element",
            "theme",
            "age",
            "available",
            "minifigures",
            "link",
            "img",
        ]
        read_only_fields = fields

    @extend_schema_field(serializers.DecimalField(max_digits=10, decimal_places=2))
    def get_price_per_element(self, obj: LegoSet):
        """Get the price per element ratio from the object."""
        return str(obj.price_per_element)

    def get_img(self, obj):
        """Get the relative path for the image."""
        if obj.img:
            return settings.MEDIA_URL + obj.img.name
        return None


class HealthCheckSerializer(serializers.Serializer):
    status = serializers.CharField(read_only=True)
