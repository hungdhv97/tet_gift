from cms.users.models import CustomUser
from create_samples.create_scripts.consts import users_data


def create_users():
    CustomUser.objects.all().delete()
    for user_data in users_data:
        try:
            user = CustomUser(**user_data)
            user.set_password(user_data["password"])
            user.save()
        except Exception as e:
            print(f"Error creating User ({user_data.get('username')}): {e}")

    print("Users created successfully.")
