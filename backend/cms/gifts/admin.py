from django.contrib import admin

from .models import (
    Gift,
    GiftImage,
)


class GiftImageInline(admin.TabularInline):
    model = GiftImage
    extra = 1


@admin.register(Gift)
class GiftAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'price', 'created_at', 'updated_at')
    search_fields = ('name',)
    list_filter = ('created_at', 'updated_at')
    inlines = [GiftImageInline]


@admin.register(GiftImage)
class GiftImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'gift', 'image', 'created_at')
    search_fields = ('gift__name',)
    list_filter = ('created_at',)
