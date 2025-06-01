from django.contrib import admin
from django.urls import path
from django.urls import include
from apps.users.views import csrf

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.users.urls')),
]
