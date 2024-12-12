from rest_framework import viewsets

from .models import CrewMember
from .serializers import CrewMemberSerializer


class CrewMemberViewSet(viewsets.ModelViewSet):
    queryset = CrewMember.objects.all().order_by("name")
    serializer_class = CrewMemberSerializer
