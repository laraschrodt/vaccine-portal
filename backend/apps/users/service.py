from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

User = get_user_model()

def create_patient_user(username, email, password):
    if User.objects.filter(username=username).exists():
        raise ValueError("Benutzername existiert bereits")

    user = User.objects.create_user(username=username,
                                    email=email,
                                    password=password)

    group, _ = Group.objects.get_or_create(name="Patient")
    user.groups.add(group)
    return user
