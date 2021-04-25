from rest_framework import serializers
from .models import CustomUser, Organization
from rest_framework.validators import UniqueValidator
from .models import CustomUser
from letters.models import Letter
from letters.serializers import LetterSerializer
from campaigns.serializers import CampaignInfo

class OrganizationSerializer(serializers.ModelSerializer):

    members = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Organization
        fields = ('id', 'name', 'members')

class UserSerializer(serializers.ModelSerializer):
    written = LetterSerializer(many=True, read_only=True)
    received = LetterSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser

        fields = ['id', 'email', 'first_name', 'last_name', 'organization', 'written', 'received']

class UserCampaigns(serializers.ModelSerializer):
    owner = CampaignInfo(many=True, read_only=True)
    
    class Meta:
        model = CustomUser

        fields = ['owner']



class RegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )

    first_name = serializers.CharField(required=True)

    last_name = serializers.CharField(required=True)

    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('password', 'email', 'first_name', 'last_name', 'organization')
        extra_kwargs = {
            'email': {"error_messages": "Email in use"},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'organization': {'required': False}
        }

    def create(self, validated_data):        
            
        user = CustomUser.objects.create_user(
            validated_data['email'],
            validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        
        return user
