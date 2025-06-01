from django.apps import AppConfig
from django.db.models.signals import post_migrate

class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.users'

    def ready(self):
        from django.contrib.auth.models import Group

        def create_roles(sender, **kwargs):
            for name in ["Patient", "ClinicStaff", "Admin"]:
                Group.objects.get_or_create(name=name)

        post_migrate.connect(create_roles, sender=self)
