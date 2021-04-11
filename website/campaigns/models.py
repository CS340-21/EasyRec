from django.db import models

from users.models import CustomUser

#from letters.models import Letter

#class CampLetter(models.Model):
#    letter = models.ForeignKey(Letter, on_delete=models.CASCADE, related_name="source")
#    campaign = models.ForeignKey()

class Campaign(models.Model):
    name = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=500)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='owner')

    camp_id = models.CharField(max_length=200)
    api_endpoint = models.CharField(max_length=200)
    email_enpoint = models.CharField(max_length=200)


    def __str__(self):
        return self.title
    
