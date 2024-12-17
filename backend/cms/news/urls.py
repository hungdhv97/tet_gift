from django.urls import (
    include,
    path,
)
from rest_framework.routers import DefaultRouter

from .views import (
    NewsContentViewSet,
    NewsPostViewSet, LinkViewSet,
)

router = DefaultRouter()
router.register(r"news-posts", NewsPostViewSet, basename="news-post")
router.register(r"news-contents", NewsContentViewSet, basename="news-content")
router.register(r"links", LinkViewSet, basename="links")

urlpatterns = [
    path("", include(router.urls)),
]
