from rest_framework import viewsets

from .models import (
    Gift,
    GiftImage,
)
from .serializers import (
    GiftImageSerializer,
    GiftSerializer,
)


class GiftViewSet(viewsets.ModelViewSet):
    queryset = Gift.objects.all()
    serializer_class = GiftSerializer


class GiftImageViewSet(viewsets.ModelViewSet):
    queryset = GiftImage.objects.all()
    serializer_class = GiftImageSerializer
