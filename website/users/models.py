from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from .managers import CustomUserManager

class Organization(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    
class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    organization = models.ForeignKey(Organization, blank=True, null=True, on_delete=models.CASCADE, related_name = 'members')

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_auth_token(sender, instance=None, created=False, **kwargs):
        if created:
            Token.objects.create(user=instance)
    
    def __str__(self):
        return self.email
