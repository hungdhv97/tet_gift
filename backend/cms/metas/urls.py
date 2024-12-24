from django.urls import (
    include,
    path,
)
from rest_framework.routers import DefaultRouter

from .views import (
    BannerViewSet,
    WebsiteMetaViewSet,
)

router = DefaultRouter()
router.register(r"banners", BannerViewSet, basename="banner")
router.register(r"website-meta", WebsiteMetaViewSet, basename="website-meta")

urlpatterns = [
    path("", include(router.urls)),
]
