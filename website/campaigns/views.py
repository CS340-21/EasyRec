from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

from .models import Campaign
from .serializers import CampaignInfo, CampLetters

class CampaignLetters(APIView):
    def get_campaign(self, pk):
        try:
            return Campaign.objects.get(pk=pk)
        except CustomUser.DoesNotExist:
            raise Http40

    def get(self, request, format=None):
        snippet = self.get_campaign(int(request.data['campaign_id']))
        serializer = CampLetters(snippet)
        return Response(serializer.data)

    def post(self, request, format=None):
        snippet = self.get_campaign(int(request.data['campaign_id']))
        serializer = CampLetters(snippet)
        return Response(serializer.data)

    
class CampaignView(APIView):
    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CampaignInfo(snippet)
        return Response(serializer.data)

