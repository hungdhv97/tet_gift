from cms.tracking.models import PositionHistory

from cms.vessels.models import Vessel
from create_samples.create_scripts.consts import positions_data


def create_positions():
    PositionHistory.objects.all().delete()
    for position_data in positions_data:
        try:
            vessel = Vessel.objects.get(name=position_data["vessel_name"])
            PositionHistory.objects.create(
                vessel=vessel,
                latitude=position_data["latitude"],
                longitude=position_data["longitude"],
            )
        except Vessel.DoesNotExist:
            print(f"Vessel with name {position_data['vessel_name']} does not exist.")
        except Exception as e:
            print(
                f"Error creating Position for vessel {position_data['vessel_name']}: {e}"
            )

    print("Positions created successfully.")
