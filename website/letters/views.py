from django.shortcuts import render

# Create your views here.
#from rest_framework import viewsets

from rest_framework.serializers import ValidationError
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from users.models import CustomUser

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

from .serializers import LetterSerializer, LetterInfoSerializer

from .models import Letter
from campaigns.models import Campaign

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

# accepts {'letter_id': ..., 'camp_id': ...}
class AddCampaign(APIView):
    def put(self, request):

        #letter_id = int(request.data['letter_id'])
        #camp_id = request.data['camp_id']
        
        try:
            letter = Letter.objects.get(pk=int(request.data['letter_id']))
        except:
            return Response({"Error": "No letter with that id"},
                            status=status.HTTP_417_EXPECTATION_FAILED)

        try:
            camp = Campaign.objects.get(camp_id=request.data['camp_id'])
        except:
            return Response({"Error": "No campaign with id {0}".format(request.data['camp_id'])},
                            status=status.HTTP_417_EXPECTATION_FAILED)

        letter.campaigns.add(camp)
        letter.save()

        return Response(status=status.HTTP_201_CREATED)
        
class RegisterView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, format=None):
        if 'file' not in request.data:
            raise ParseError("Empty content")

        author_id = request.data['author_id']
        candidate_email = request.data['email']

        # verify email exists
        try:
            tmp = CustomUser.objects.get(email=candidate_email)
        except:
            raise ValidationError('No user associated with this email')
        
        author = CustomUser.objects.get(pk = int(author_id))
        candidate = CustomUser.objects.get(email = candidate_email)

        file_obj = request.data['file']

        letter = Letter.objects.create(
            author = author,
            candidate = candidate,
            file_doc = file_obj,
            title = file_obj.name
        )

        letter.save()

        return Response(status=status.HTTP_201_CREATED)
