from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializers import UserSerializer, LetterSerializer
from .models import User, Letter

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class LetterView(viewsets.ModelViewSet):
    serializer_class = LetterSerializer
    queryset = Letter.objects.all()
