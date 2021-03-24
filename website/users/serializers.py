from rest_framework import serializers
from .models import CustomUser, Organization
from rest_framework.validators import UniqueValidator
from .models import CustomUser
from letters.models import Letter

class OrganizationSerializer(serializers.ModelSerializer):

    members = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Organization
        fields = ('id', 'name', 'members')

class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = ('id', 'author', 'candidate', 'title', 'pub_date', 'permissions')

class UserSerializer(serializers.ModelSerializer):
    written = LetterSerializer(many=True, read_only=True)
    received = LetterSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'first_name', 'last_name', 'organization', 'acct_type', 'written', 'received')

class RegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all())]
    )

    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('password', 'email', 'first_name', 'last_name', 'organization')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'organization': {'required': False}
        }

        def create(self, validated_data):
            user = User.objects.create(
                email=validated_data['email'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name']
            )
            
            user.set_password(validated_data['password'])
            user.save()
            
            return user
