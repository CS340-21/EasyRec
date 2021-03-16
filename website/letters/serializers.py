from rest_framework import serializers
from .models import Letter

class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = ('id', 'author', 'candidate', 'file_path', 'title', 'permissions')

class LetterInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = ('id', 'author', 'candidate', 'title', 'permissions')
