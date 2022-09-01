from rest_framework import serializers

from .models import LegoSet, AgeCategory, Theme

class ThemeSerializer(serializers.ModelSerializer):
    """Serializer for theme category."""

    class Meta:
        model = Theme
        fields = ['id', 'name']
        read_only_fields = fields

class AgeCategorySerializer(serializers.ModelSerializer):
    """Serializer for age category."""

    class Meta:
        model = AgeCategory
        fields = ['id', 'name']
        read_only_fields = fields

class LegoSetSerializer(serializers.ModelSerializer):
    """Serializer for lego set."""
    theme = ThemeSerializer()
    age = AgeCategorySerializer()
    price_per_element = serializers.SerializerMethodField()

    class Meta:
        model = LegoSet
        fields = ['title', 'product_id', 'price', 'elements', 'price_per_element','theme', 'age', 'available', 'minifigures', 'link', 'img_src']
        read_only_fields = fields

    def get_price_per_element(self, obj):
        """Get the price per element ratio from the object."""
        return str(obj.price_per_element)