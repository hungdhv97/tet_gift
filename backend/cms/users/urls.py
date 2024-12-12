from django.urls import (
    include,
    path,
)
from rest_framework.routers import DefaultRouter

from .views import (
    GetCurrentUserAPIView,
    LoginAPIView,
    UserViewSet,
)

router = DefaultRouter()
router.register(r"users", UserViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path(
        "login/",
        LoginAPIView.as_view(),
        name="login",
    ),
    path("me/", GetCurrentUserAPIView.as_view(), name="get-current-user"),
]
