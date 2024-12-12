from rest_framework import viewsets

from .models import Vessel
from .serializers import VesselSerializer


class VesselViewSet(viewsets.ModelViewSet):
    queryset = Vessel.objects.all().order_by("-updated_at")
    serializer_class = VesselSerializer
