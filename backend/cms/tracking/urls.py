from django.urls import path

from .views import (
    GetVesselPositionsAPIView,
    RandomVesselPositionAPIView,
    UpdateVesselPositionAPIView,
)

urlpatterns = [
    path(
        "update-position/",
        UpdateVesselPositionAPIView.as_view(),
        name="update-vessel-position",
    ),
    path(
        "random-position/",
        RandomVesselPositionAPIView.as_view(),
        name="random-vessel-position",
    ),
    path(
        "position-history/",
        GetVesselPositionsAPIView.as_view(),
        name="position-history",
    ),
]
