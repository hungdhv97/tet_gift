from django.contrib.auth.models import User

from create_samples.create_scripts.consts import users_data


def create_users():
    User.objects.all().delete()
    for user_data in users_data:
        try:
            user = User(**user_data)
            user.set_password(user_data["password"])
            user.save()
        except Exception as e:
            print(f"Error creating User ({user_data.get('username')}): {e}")

    print("Users created successfully.")
