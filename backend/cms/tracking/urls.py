from django.urls import (
    include,
    path,
)
from rest_framework.routers import DefaultRouter

from .views import PositionHistoryViewSet

router = DefaultRouter()
router.register(r"positions", PositionHistoryViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
