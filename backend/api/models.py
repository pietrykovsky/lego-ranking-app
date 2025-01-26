from django.db import models


def get_image_filename(instance, filename: str) -> str:
    """Generate image filename based on whether it's a new instance or existing one."""
    if instance.img:
        return instance.img.name
    return f"{instance.product_id}.jpg"


class LegoSet(models.Model):
    """Model for lego set objects."""

    title = models.CharField(max_length=255)
    product_id = models.CharField(max_length=50, unique=True, primary_key=True)
    theme = models.ForeignKey("Theme", on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    available = models.BooleanField(default=False)
    age = models.ForeignKey("AgeCategory", on_delete=models.CASCADE)
    elements = models.IntegerField()
    link = models.TextField()
    minifigures = models.IntegerField(blank=True, null=True)
    img = models.ImageField(upload_to=get_image_filename, blank=True, null=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["title"]
        verbose_name = "Lego set"

    def __str__(self):
        return self.title


class Theme(models.Model):
    """Theme for filtering legosets."""

    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Theme category"
        verbose_name_plural = "Theme categories"

    def __str__(self):
        return self.name


class AgeCategory(models.Model):
    """Age category for filtering legosets."""

    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Age category"
        verbose_name_plural = "Age categories"

    def __str__(self):
        return self.name
