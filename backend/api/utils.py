from io import BytesIO
from PIL import ImageFile, Image
from django.core.files.base import ContentFile


def process_image(image: ImageFile) -> ContentFile:
    # Convert to RGB mode (strips alpha channel if present)
    img = image.convert("RGB")

    target_width = 600
    aspect_ratio = image.width / image.height
    target_height = int(target_width / aspect_ratio)

    img = img.resize((target_width, target_height), Image.Resampling.LANCZOS)

    raw_image = BytesIO()
    img.save(raw_image, format="JPEG", quality=75, optimize=True)
    raw_image.seek(0)

    return ContentFile(raw_image.read())
