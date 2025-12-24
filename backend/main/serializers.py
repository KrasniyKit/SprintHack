from rest_framework import serializers
from .models import *

class DistrictSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = [
            'id', 'name', 'area', 'density',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


