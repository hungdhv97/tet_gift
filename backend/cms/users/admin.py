from django.contrib import admin

from .models import CustomUser


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ("username", "role", "is_active", "date_joined")
    list_filter = ("role", "is_active")
    search_fields = ("username", "phone", "email")
