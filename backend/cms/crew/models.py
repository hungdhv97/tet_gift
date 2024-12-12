from django.db import models

from backend.cms.vessels.models import Vessel


class CrewMember(models.Model):
    vessel = models.ForeignKey(
        Vessel, on_delete=models.CASCADE, related_name="crew_members"
    )
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    age = models.IntegerField()
    joined_on = models.DateField()
    email = models.EmailField(unique=True, null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.role})"
