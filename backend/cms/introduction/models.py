from django.db import models


class CarouselImage(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(upload_to="carousel/")
    is_deleted = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.title or f'Image {self.id}'}{' [DELETED]' if self.is_deleted else ''}"


class Video(models.Model):
    title = models.CharField(max_length=255)
    video_url = models.URLField(blank=True, null=True)
    is_deleted = models.BooleanField(default=False)
    video_file = models.FileField(upload_to="videos/", blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class Introduction(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    is_deleted = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title}{' [DELETED]' if self.is_deleted else ''}"
