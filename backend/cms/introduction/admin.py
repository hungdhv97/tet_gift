from django.contrib import admin

from .models import (
    CarouselImage,
    Introduction,
    Video,
)


@admin.register(CarouselImage)
class CarouselImageAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "is_active")
    list_editable = ("order", "is_active")


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active")


@admin.register(Introduction)
class IntroductionAdmin(admin.ModelAdmin):
    list_display = ("title",)
