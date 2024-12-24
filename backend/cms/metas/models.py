from django.db import models


class Banner(models.Model):
    image = models.ImageField(upload_to="banners/")

    def __str__(self):
        return f"Banner {self.id}"


class WebsiteMeta(models.Model):
    telephone = models.CharField(max_length=20)
    email = models.EmailField()
    zalo = models.CharField(max_length=100, blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.email
