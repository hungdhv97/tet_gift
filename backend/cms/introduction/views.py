from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    CarouselImage,
    Introduction,
    Video,
)
from .serializers import (
    CarouselImageSerializer,
    IntroductionSerializer,
    VideoSerializer,
)


class CombinedDataView(APIView):
    def get(self, request):
        images = CarouselImage.objects.filter(is_active=True)
        image_serializer = CarouselImageSerializer(
            images, many=True, context={"request": request}
        )

        videos = Video.objects.filter(is_active=True)
        video_serializer = VideoSerializer(
            videos, many=True, context={"request": request}
        )

        introduction = Introduction.objects.first()
        intro_serializer = IntroductionSerializer(introduction)

        combined_data = {
            "carousel_images": image_serializer.data,
            "videos": video_serializer.data,
            "introduction": intro_serializer.data,
        }

        return Response(combined_data)
