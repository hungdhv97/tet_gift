from cms.crew.models import CrewMember
from cms.vessels.models import Vessel
from create_samples.create_scripts.consts import crew_data


def create_crew():
    CrewMember.objects.all().delete()
    for crew_member_data in crew_data:
        try:
            vessel = Vessel.objects.get(name=crew_member_data["vessel_name"])
            CrewMember.objects.create(
                name=crew_member_data["name"],
                role=crew_member_data["role"],
                phone=crew_member_data["phone"],
                address=crew_member_data["address"],
                unit=crew_member_data["unit"],
                vessel=vessel,
            )
        except Vessel.DoesNotExist:
            print(
                f"Vessel with name {crew_member_data['vessel_name']} does not exist. Cannot create crew member {crew_member_data['name']}."
            )
        except Exception as e:
            print(f"Error creating CrewMember {crew_member_data['name']}: {e}")

    print("Crew members created successfully.")
