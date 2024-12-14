from rest_framework import serializers

from .models import Vessel


class VesselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vessel
        fields = [
            "id",
            "name",
            "registration_number",
            "captain_name",
            "captain_phone",
            "address",
            "status",
            "description",
            "speed",
            "created_at",
            "updated_at",
        ]
