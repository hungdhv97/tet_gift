from django.urls import path

from .views import UpdateVesselPositionAPIView

urlpatterns = [
    path(
        "update-position/",
        UpdateVesselPositionAPIView.as_view(),
        name="update-vessel-position",
    ),
]
