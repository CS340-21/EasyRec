from uuid import uuid4

from django.db import models

from users.models import CustomUser

#from letters.models import Letter

#class CampLetter(models.Model):
#    letter = models.ForeignKey(Letter, on_delete=models.CASCADE, related_name="source")
#    campaign = models.ForeignKey()

class Campaign(models.Model):
    name = models.CharField(max_length=200)
    #camp_id = models.CharField(max_length=200)
    camp_id = models.CharField(max_length=16, blank=True, unique=True,
                               default=str(uuid4().hex)[:16])

    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='owner')

    description = models.CharField(max_length=500, blank=True)
    api_endpoint = models.CharField(max_length=200, blank=True)
    email_enpoint = models.CharField(max_length=200, blank=True)


    def __str__(self):
        return self.name
    
