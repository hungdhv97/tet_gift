from rest_framework import serializers

from .models import PositionHistory


class PositionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PositionHistory
        fields = ["id", "vessel", "latitude", "longitude", "timestamp"]
