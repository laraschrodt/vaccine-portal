from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth import authenticate, login

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


def login_user(request, username, password):
    user = authenticate(request, username=username, password=password)
    if user is None:
        raise ValueError("Ungültige Anmeldedaten")
    login(request, user)
    return user
