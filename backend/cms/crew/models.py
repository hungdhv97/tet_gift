from django.db import models

from cms.vessels.models import Vessel


class CrewMember(models.Model):
    class Role(models.TextChoices):
        CAPTAIN = "Captain", "Captain"
        ENGINEER = "Engineer", "Engineer"
        DECKHAND = "Deckhand", "Deckhand"
        COOK = "Cook", "Cook"

    name = models.CharField(max_length=100)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.DECKHAND)
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    unit = models.CharField(max_length=100, null=True, blank=True)
    vessel = models.ForeignKey(Vessel, on_delete=models.CASCADE, related_name="crew")

    def __str__(self):
        return f"{self.name} ({self.role})"
