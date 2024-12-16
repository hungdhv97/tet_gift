from rest_framework import viewsets

from .models import (
    NewsContent,
    NewsPost,
)
from .serializers import (
    NewsContentSerializer,
    NewsPostSerializer,
)


class NewsPostViewSet(viewsets.ModelViewSet):
    queryset = NewsPost.objects.all()
    serializer_class = NewsPostSerializer


class NewsContentViewSet(viewsets.ModelViewSet):
    queryset = NewsContent.objects.all()
    serializer_class = NewsContentSerializer
