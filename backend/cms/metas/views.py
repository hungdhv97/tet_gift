from rest_framework import viewsets

from .models import (
    Banner,
    WebsiteMeta,
)
from .serializers import (
    BannerSerializer,
    WebsiteMetaSerializer,
)


class BannerViewSet(viewsets.ModelViewSet):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer


class WebsiteMetaViewSet(viewsets.ModelViewSet):
    queryset = WebsiteMeta.objects.all()
    serializer_class = WebsiteMetaSerializer
