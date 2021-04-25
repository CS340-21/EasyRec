from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

from .models import Campaign
from .serizalizers import CampaignInfo

class CampaignView(APIView):
    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = CampaignInfo(snippet)
        return Response(serializer.data)

