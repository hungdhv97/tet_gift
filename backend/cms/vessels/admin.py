from django.contrib import admin

from .models import Vessel


@admin.register(Vessel)
class VesselAdmin(admin.ModelAdmin):
    list_display = ("name", "type", "capacity", "created_at", "updated_at")
    search_fields = ("name", "type")
    list_filter = ("type",)
