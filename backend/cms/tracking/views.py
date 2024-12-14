from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from cms.vessels.models import Vessel
from .models import PositionHistory


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
