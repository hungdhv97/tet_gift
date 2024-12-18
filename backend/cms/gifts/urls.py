from django.urls import (
    include,
    path,
)
from rest_framework.routers import DefaultRouter

from .views import (
    GiftImageViewSet,
    GiftViewSet,
)

router = DefaultRouter()
router.register('gifts', GiftViewSet)
router.register('gift-images', GiftImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
