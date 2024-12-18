import os
import sys

import django

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_root)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from create_samples.create_scripts.gifts.gifts import create_gifts
from create_samples.create_scripts.users.users import create_users


def main():
    create_gifts()
    create_users()


if __name__ == "__main__":
    main()

print("Dữ liệu mẫu đã được tạo thành công.")
