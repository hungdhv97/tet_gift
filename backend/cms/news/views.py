from rest_framework import viewsets

from .models import (
    NewsContent,
    NewsPost, Link,
)
from .serializers import (
    NewsContentSerializer,
    NewsPostSerializer, LinkSerializer,
)


class NewsPostViewSet(viewsets.ModelViewSet):
    queryset = NewsPost.objects.all()
    serializer_class = NewsPostSerializer


class NewsContentViewSet(viewsets.ModelViewSet):
    queryset = NewsContent.objects.all()
    serializer_class = NewsContentSerializer


class LinkViewSet(viewsets.ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
