import os
import uuid

from django.core.files.storage import FileSystemStorage
from django.core.validators import FileExtensionValidator
from django.db import models
from website.settings
from users.models import CustomUser

def get_file_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return os.path.join('', filename)

key_store = FileSystemStorage(location=MEDIA_ROOT)

class Letter(models.Model):
    pub_date = models.DateTimeField(auto_now=True, blank=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='written')
    candidate = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='received')
    title = models.CharField(max_length=200)
    permissions = models.IntegerField(default=0)
    file = models.FileField(upload_to=get_file_path, null=True, blank=True,
                            validators=[FileExtensionValidator(allowed_extensions=['pdf'])])
    
    def __str__(self):
        return self.title

'''
class Campaign(models.Model):
    name = models.CharField(max_length=200)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name = 'organization')
    endpoint = models.CharField(max_length=200)

    def __str__(self):
        return self.name
'''
