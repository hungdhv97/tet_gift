from rest_framework import serializers

from .models import (
    CarouselImage,
    Introduction,
    Video,
)


class CarouselImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = CarouselImage
        fields = ["id", "title", "image", "description", "order"]

    def get_image(self, obj):
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url


class VideoSerializer(serializers.ModelSerializer):
    video_file = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = ["id", "title", "video_url", "video_file", "description"]

    def get_video_file(self, obj):
        request = self.context.get("request")
        if request and obj.video_file:
            return request.build_absolute_uri(obj.video_file.url)
        return obj.video_file.url if obj.video_file else None


class IntroductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Introduction
        fields = ["id", "title", "content"]
