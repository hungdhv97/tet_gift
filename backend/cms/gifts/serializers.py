from rest_framework import serializers

from .models import (
    Gift,
    GiftImage,
)


class GiftImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GiftImage
        fields = ['id', 'image', 'created_at']


class GiftSerializer(serializers.ModelSerializer):
    images = GiftImageSerializer(many=True, read_only=True)

    class Meta:
        model = Gift
        fields = ['id', 'name', 'description', 'price', 'images', 'created_at', 'updated_at']
