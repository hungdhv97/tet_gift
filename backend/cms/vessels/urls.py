from django.urls import (
    include,
    path,
)
from rest_framework.routers import DefaultRouter

from .views import VesselViewSet

router = DefaultRouter()
router.register(r"vessels", VesselViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
