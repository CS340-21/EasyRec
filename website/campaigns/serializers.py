from rest_framework import serializers

from letters.serializers import LetterSerializer
from campaigns.models import Campaign
from letters.models import Letter

class CampaignInfo(serializers.ModelSerializer):

    class Meta:
        model = Campaign
        fields = ('name', 'camp_id')

class CampaignLetters(serializers.ModelSerializer):
    my_campaigns = LetterSerializer(many=True, read_only=True)

    class Meta:
        model = Campaign

        fields = ['my_campaigns']
