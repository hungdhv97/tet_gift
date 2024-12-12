from django.contrib import admin

from .models import CrewMember


class CrewMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "vessel", "age", "joined_on", "email")
    list_filter = ("role", "joined_on")
    search_fields = ("name", "role", "email")


admin.site.register(CrewMember, CrewMemberAdmin)
