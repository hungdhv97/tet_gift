from cms.gifts.models import (
    Gift,
    GiftImage,
)

from create_samples.create_scripts.consts import (
    GIFTS_SAMPLE_DATA,
    GIFT_IMAGES_SAMPLE_DATA,
)


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

    for gift_image_data in GIFT_IMAGES_SAMPLE_DATA:
        try:
            gift_name = gift_image_data["gift"]["name"]
            gift = Gift.objects.get(name=gift_name)
            GiftImage.objects.create(
                gift=gift,
                image=gift_image_data["image"],
                created_at=gift_image_data["created_at"],
            )
        except Gift.DoesNotExist:
            print(f"Gift with name {gift_name} does not exist. Cannot create GiftImage.")
        except Exception as e:
            print(f"Error creating GiftImage for gift {gift_name}: {e}")

    print("Gifts and GiftImages created successfully.")
