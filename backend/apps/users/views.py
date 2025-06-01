from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .service import create_patient_user, login_user


@api_view(["POST"])
def register_view(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Fehlende Felder"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = create_patient_user(username, email, password)
        return Response(
            {"message": "Benutzer erstellt", "username": user.username},
            status=status.HTTP_201_CREATED,
        )
    except ValueError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Missing fields"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = login_user(request, username, password)
        return Response(
            {"message": "logged in", "groups": list(user.groups.values_list("name", flat=True))},
            status=status.HTTP_200_OK,
        )
    except ValueError:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


@ensure_csrf_cookie
def csrf(request):
    """Versorgt das Frontend mit einem csrftoken-Cookie."""
    return JsonResponse({"detail": "ok"})
