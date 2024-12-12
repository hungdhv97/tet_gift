from django.db import models


class Vessel(models.Model):
    name = models.CharField(max_length=100)
    imo_number = models.CharField(max_length=20, unique=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=50, default="Active")
    description = models.TextField(null=True, blank=True)
    speed = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
