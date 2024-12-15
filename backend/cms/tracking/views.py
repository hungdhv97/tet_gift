import random
from datetime import (
    timedelta,
)

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.utils.timezone import now
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from cms.vessels.models import Vessel
from .models import PositionHistory


def generate_random_coordinates():
    latitude = random.uniform(12.0, 20.0)
    longitude = random.uniform(110.0, 120.0)
    return latitude, longitude


class UpdateVesselPositionAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            vessel_id = request.data.get("vessel_id")
            latitude = request.data.get("latitude")
            longitude = request.data.get("longitude")

            vessel = Vessel.objects.get(id=vessel_id)
            PositionHistory.objects.create(
                vessel=vessel, latitude=latitude, longitude=longitude
            )

            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "vessel_tracking",
                {
                    "type": "send_update",
                    "message": {
                        "id": vessel.id,
                        "name": vessel.name,
                        "status": vessel.status,
                        "registration_number": vessel.registration_number,
                        "captain_name": vessel.captain_name,
                        "captain_phone": vessel.captain_phone,
                        "latitude": latitude,
                        "longitude": longitude,
                        "created_at": vessel.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                    },
                },
            )

            return Response({"success": "Position updated"}, status=status.HTTP_200_OK)
        except Vessel.DoesNotExist:
            return Response(
                {"error": "Vessel not found"}, status=status.HTTP_404_NOT_FOUND
            )


class GetVesselPositionsAPIView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            end_of_day = now()
            start_of_day = end_of_day - timedelta(days=1)

            positions = PositionHistory.objects.filter(
                created_at__range=(start_of_day, end_of_day)
            )

            data = [
                {
                    "id": position.vessel.id,
                    "name": position.vessel.name,
                    "status": position.vessel.status,
                    "registration_number": position.vessel.registration_number,
                    "captain_name": position.vessel.captain_name,
                    "captain_phone": position.vessel.captain_phone,
                    "latitude": position.latitude,
                    "longitude": position.longitude,
                    "created_at": position.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                }
                for position in positions
            ]

            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": "An error occurred", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class RandomVesselPositionAPIView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            vessel = Vessel.objects.order_by("?").first()
            last_position = (
                PositionHistory.objects.filter(vessel=vessel)
                .order_by("-created_at")
                .first()
            )
            if last_position:
                latitude = last_position.latitude + random.uniform(-0.2, 0.2)
                longitude = last_position.longitude + random.uniform(-0.2, 0.2)
            else:
                latitude, longitude = generate_random_coordinates()

            PositionHistory.objects.create(
                vessel=vessel, latitude=latitude, longitude=longitude
            )

            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "vessel_tracking",
                {
                    "type": "send_update",
                    "message": {
                        "id": vessel.id,
                        "name": vessel.name,
                        "status": vessel.status,
                        "registration_number": vessel.registration_number,
                        "captain_name": vessel.captain_name,
                        "captain_phone": vessel.captain_phone,
                        "latitude": latitude,
                        "longitude": longitude,
                        "created_at": vessel.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                    },
                },
            )

            return Response({"success": "Position updated"}, status=status.HTTP_200_OK)
        except Vessel.DoesNotExist:
            return Response(
                {"error": "Vessel not found"}, status=status.HTTP_404_NOT_FOUND
            )
