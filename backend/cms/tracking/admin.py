from django.contrib import admin

from .models import PositionHistory


@admin.register(PositionHistory)
class PositionHistoryAdmin(admin.ModelAdmin):
    list_display = ("vessel", "latitude", "longitude", "created_at")
    list_filter = ("vessel", "created_at")
