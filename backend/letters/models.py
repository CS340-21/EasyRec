from django.db import models

class Organization(models.Model):
    name = models.CharField(max_length=200)

class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    acct_type = models.IntegerField(default=0)

class Letter(models.Model):
    pub_date = models.DateTimeField('date published')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'author')
    candidate = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'candidate')
    file_path = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    permissions = models.IntegerField(default=0)
    
class Campaign(models.Model):
    name = models.CharField(max_length=200)
