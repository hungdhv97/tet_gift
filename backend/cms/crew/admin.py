from django.contrib import admin

from .models import CrewMember


@admin.register(CrewMember)
class CrewMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "phone", "unit", "vessel")
    list_filter = ("role", "vessel")
    search_fields = ("name", "role", "vessel__name")
