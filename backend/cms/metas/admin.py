from django.contrib import admin

from .models import (
    Banner,
    WebsiteMeta,
)


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ("id", "image")
    search_fields = ("id",)


@admin.register(WebsiteMeta)
class WebsiteMetaAdmin(admin.ModelAdmin):
    list_display = ("email", "telephone", "zalo", "facebook")
    search_fields = ("email", "telephone")
