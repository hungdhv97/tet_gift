from django.db import models


class Vessel(models.Model):
    STATUS_CHOICES = [
        ("active", "Hoạt động"),
        ("inactive", "Không hoạt động"),
        ("maintenance", "Bảo trì"),
        ("warning", "Cảnh báo"),
        ("sunk", "Chìm"),
    ]

    name = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=50, unique=True)
    address = models.TextField(null=True, blank=True)
    captain_name = models.CharField(max_length=100, null=True, blank=True)
    captain_phone = models.CharField(max_length=20, null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="active")
    description = models.TextField(null=True, blank=True)
    speed = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
