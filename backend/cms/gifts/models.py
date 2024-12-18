from django.db import models


class Gift(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class GiftImage(models.Model):
    gift = models.ForeignKey(Gift, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='gift_images/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.gift.name}"
