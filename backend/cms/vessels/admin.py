from django.contrib import admin

from .models import Vessel


@admin.register(Vessel)
class VesselAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "registration_number",
        "address",
        "captain_name",
        "captain_phone",
        "status",
        "created_at",
        "updated_at",
    )
    list_filter = ("status",)
    search_fields = ("name", "registration_number", "captain_name", "captain_phone")
