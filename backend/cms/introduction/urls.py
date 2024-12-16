from django.urls import path

from .views import CombinedDataView

urlpatterns = [
    path("about-data/", CombinedDataView.as_view(), name="about-data"),
]
