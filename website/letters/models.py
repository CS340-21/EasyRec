from django.db import models
from users.models import CustomUser

    
class Letter(models.Model):
    pub_date = models.DateTimeField(auto_now=True, blank=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name = 'written')
    candidate = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name = 'received')
    file_path = models.FileField(upload_to = '')
    title = models.CharField(max_length=200)
    permissions = models.IntegerField(default=0)

    
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
