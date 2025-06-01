# users/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .service import create_patient_user

@api_view(["POST"])
def register_view(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Fehlende Felder"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = create_patient_user(username, email, password)
        return Response({"message": "Benutzer erstellt", "username": user.username}, status=status.HTTP_201_CREATED)
    except ValueError as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
