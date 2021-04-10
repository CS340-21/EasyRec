from rest_framework import serializers

from users.models import CustomUser

from .models import Letter


class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = ('id', 'author', 'candidate', 'title', 'pub_date', 'permissions')

class LetterInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = ('id', 'author', 'candidate', 'title', 'permissions')
