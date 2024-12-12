from rest_framework import serializers

from .models import Vessel


class VesselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vessel
        fields = [
            "id",
            "name",
            "imo_number",
            "latitude",
            "longitude",
            "address",
            "status",
            "description",
            "speed",
            "created_at",
            "updated_at",
        ]
