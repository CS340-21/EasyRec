from rest_framework import serializers
from .models import Organization, User, Letter

class OrganizationSerializer(serializers.ModelSerializer):

    members = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Organization
        fields = ('id', 'name', 'members')

class UserSerializer(serializers.ModelSerializer):

    written = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    received = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'name', 'email', 'organization', 'acct_type', 'written', 'received')


class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = ('id', 'author', 'candidate', 'file_path', 'title', 'permissions')

class LetterInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = ('id', 'author', 'candidate', 'title', 'permissions')
