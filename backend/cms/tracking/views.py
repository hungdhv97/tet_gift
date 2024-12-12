from rest_framework import viewsets

from .models import PositionHistory
from .serializers import PositionHistorySerializer


class PositionHistoryViewSet(viewsets.ModelViewSet):
    queryset = PositionHistory.objects.all()
    serializer_class = PositionHistorySerializer
