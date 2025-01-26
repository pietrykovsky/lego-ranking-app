# Generated by Django 5.1.5 on 2025-01-26 12:29

import api.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="legoset",
            name="img_src",
        ),
        migrations.AddField(
            model_name="legoset",
            name="img",
            field=models.ImageField(blank=True, null=True, upload_to=api.models.get_image_filename),
        ),
    ]
