from django.contrib import admin

from .models import Vessel


@admin.register(Vessel)
class VesselAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "imo_number",
        "latitude",
        "longitude",
        "address",
        "status",
        "created_at",
        "updated_at",
    )
    list_filter = ("status",)
    search_fields = ("name", "imo_number")
