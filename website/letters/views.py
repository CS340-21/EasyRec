from django.shortcuts import render

# Create your views here.
#from rest_framework import viewsets

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import LetterSerializer, LetterInfoSerializer
from .models import Letter
    
class LetterView(APIView):
    def get_object(self, pk):
        try:
            return Letter.objects.get(pk=pk)
        except Letter.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = LetterInfoSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = LetterSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        letter = self.get_object(pk)
        letter.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)