from rest_framework import serializers

from .models import CrewMember


class CrewMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = CrewMember
        fields = [
            "id",
            "name",
            "role",
            "phone",
            "address",
            "unit",
            "vessel",
        ]
