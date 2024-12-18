import os
import random

from django.core.files import File

from cms.gifts.models import (
    Gift,
    GiftImage,
)
from create_samples.create_scripts.consts import GIFTS_SAMPLE_DATA


def create_gifts():
    Gift.objects.all().delete()
    GiftImage.objects.all().delete()

    for gift_data in GIFTS_SAMPLE_DATA:
        try:
            Gift.objects.create(
                name=gift_data["name"],
                description=gift_data["description"],
                price=gift_data["price"],
                created_at=gift_data["created_at"],
                updated_at=gift_data["updated_at"],
            )
        except Exception as e:
            print(f"Error creating Gift {gift_data['name']}: {e}")

    image_folder = "create_samples/unsamples"
    image_files = [
        os.path.join(image_folder, f)
        for f in os.listdir(image_folder)
        if os.path.isfile(os.path.join(image_folder, f))
    ]

    for gift_data in GIFTS_SAMPLE_DATA:
        if not image_files:
            print("No images found in the folder.")
            break
        try:
            gift = Gift.objects.get(name=gift_data["name"])
            random_image = random.choice(image_files)
            with open(random_image, "rb") as image_file:
                GiftImage.objects.create(
                    gift=gift,
                    image=File(image_file),
                    created_at=gift_data["created_at"],
                )
        except Gift.DoesNotExist:
            print(
                f"Gift with name {gift_data['name']} does not exist. Cannot create GiftImage."
            )
        except Exception as e:
            print(f"Error creating GiftImage for gift {gift_data['name']}: {e}")

    print("Gifts and GiftImages created successfully.")
