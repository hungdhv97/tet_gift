from cms.vessels.models import Vessel
from create_samples.create_scripts.consts import vessels_data


def create_vessels():
    Vessel.objects.all().delete()
    for vessel_data in vessels_data:
        try:
            Vessel.objects.create(**vessel_data)
        except Exception as e:
            print(f"Error creating Vessel ({vessel_data.get('name')}): {e}")

    print("Vessels created successfully.")
