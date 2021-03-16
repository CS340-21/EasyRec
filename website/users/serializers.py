from rest_framework import serializers
from .models import CustomUser, Organization


class OrganizationSerializer(serializers.ModelSerializer):

    members = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Organization
        fields = ('id', 'name', 'members')

class UserSerializer(serializers.ModelSerializer):

    written = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    received = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'organization', 'acct_type', 'written', 'received']
