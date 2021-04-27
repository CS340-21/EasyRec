from rest_framework import serializers

from .models import Letter


class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = ('id', 'author', 'candidate', 'title', 'pub_date', 'permissions')

class LetterInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = ('id', 'author', 'candidate', 'title', 'permissions')

class LetterDownload(serializers.ModelSerializer):

    file_doc = serializers.FileField()

    class Meta:
        model = Letter
        fields = ('title', 'pub_date', 'file_doc')
