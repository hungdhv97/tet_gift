import os
import sys

import django

project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(project_root)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from create_samples.create_scripts.crew.crew import create_crew
from create_samples.create_scripts.tracking.positions import create_positions
from create_samples.create_scripts.users.users import create_users
from create_samples.create_scripts.vessels.vessels import create_vessels


def main():
    create_vessels()
    create_users()
    create_positions()
    create_crew()


if __name__ == "__main__":
    main()

print("Dữ liệu mẫu đã được tạo thành công.")
