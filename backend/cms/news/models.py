from django.db import models


class NewsPost(models.Model):
    title = models.CharField(max_length=255, verbose_name="Tiêu đề")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Ngày tạo")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Ngày cập nhật")

    def __str__(self):
        return self.title


class ContentType(models.TextChoices):
    TEXT = "text", "Chữ"
    IMAGE = "image", "Hình ảnh"
    VIDEO = "video", "Video"


class NewsContent(models.Model):
    post = models.ForeignKey(
        NewsPost,
        on_delete=models.CASCADE,
        related_name="contents",
        verbose_name="Bài viết",
    )
    content_type = models.CharField(
        max_length=10, choices=ContentType.choices, verbose_name="Loại nội dung"
    )
    content_text = models.TextField(blank=True, null=True, verbose_name="Nội dung chữ")
    content_image = models.ImageField(
        upload_to="news_images/", blank=True, null=True, verbose_name="Hình ảnh"
    )
    content_video = models.FileField(
        upload_to="news_videos/", blank=True, null=True, verbose_name="Video"
    )
    caption = models.CharField(
        max_length=255, blank=True, null=True, verbose_name="Caption"
    )
    order = models.PositiveIntegerField(default=0, verbose_name="Thứ tự hiển thị")

    class Meta:
        ordering = ["order"]
        verbose_name = "Nội dung bài viết"
        verbose_name_plural = "Các nội dung bài viết"

    def __str__(self):
        return f"{self.post.title} - {self.get_content_type_display()}"
