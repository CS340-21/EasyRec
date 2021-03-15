from django.db import models

class Organization(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    
class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name = 'members')
    acct_type = models.IntegerField(default=0)

    def	__str__(self):
        return self.name
    
class Letter(models.Model):
    pub_date = models.DateTimeField('date published')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'written')
    candidate = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'received')
    file_path = models.CharField(max_length=200)
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
