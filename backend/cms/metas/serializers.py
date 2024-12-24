from rest_framework import serializers

from .models import (
    Banner,
    WebsiteMeta,
)


class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = "__all__"


class WebsiteMetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = WebsiteMeta
        fields = "__all__"
