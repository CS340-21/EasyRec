from rest_framework import serializers
from .models import User, Letter

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'organization', 'acct_type')


class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = ('id', 'pub_date', 'author', 'candidate', 'file_path', 'title', 'permissions')
