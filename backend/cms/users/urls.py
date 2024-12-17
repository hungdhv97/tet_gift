from django.urls import (
    path,
)
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    LoginView,
    MeView,
    RegisterView,
    VerifyTokenView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("me/", MeView.as_view(), name="me"),
    path("refresh-token/", TokenRefreshView.as_view(), name="token-refresh"),
    path("verify-token/", VerifyTokenView.as_view(), name="verify-token"),
]
