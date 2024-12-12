from django.urls import path

from .consumers import VesselTrackingConsumer

websocket_urlpatterns = [
    path("ws/vessel-tracking/", VesselTrackingConsumer.as_asgi()),
]
