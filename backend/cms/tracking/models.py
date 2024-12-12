from django.db import models

from cms.vessels.models import Vessel


class PositionHistory(models.Model):
    vessel = models.ForeignKey(
        Vessel, on_delete=models.CASCADE, related_name="positions"
    )
    latitude = models.FloatField()
    longitude = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.vessel.name} at {self.latitude}, {self.longitude}"
