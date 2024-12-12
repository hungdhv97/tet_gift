from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "password",
            "role",
            "is_active",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create(**validated_data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True, style={"input_type": "password"})

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        try:
            user = User.objects.get(username=username)
            if user.password != password:
                raise serializers.ValidationError("Invalid password.")
            if not user.is_active:
                raise serializers.ValidationError("User account is inactive.")
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this username does not exist.")

        data["user"] = user
        return data
