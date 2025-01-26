import uuid
from io import BytesIO
from PIL import ImageFile, Image
from django.core.files.base import ContentFile


def process_image(image: ImageFile) -> ContentFile:
    target_width = 600
    aspect_ratio = image.width / image.height
    target_height = int(target_width / aspect_ratio)

    img = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
    format = img.format or 'PNG'

    raw_image = BytesIO()
    img.save(raw_image, format=format, quality=75, optimize=True)
    raw_image.seek(0)

    return ContentFile(raw_image.read())

def get_image_filename(instance, filename: str) -> str:
    extension = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{extension}"
    return filename