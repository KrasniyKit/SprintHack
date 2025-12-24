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

class BaseStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseStation
        fields = [
            'id', 'station_id', 'name', 'coverage_area', 'frequency',
            'ant_type', 'handover_min', 'handover_max', 'standard',
            'coordinates','real_handover','cover_radius', 'cover_diameter'
        ]
class CalculationsResultSerializer(serializers.Serializer):
    district_name = serializers.CharField()
    area = serializers.FloatField()
    building_coef = serializers.FloatField()
    cover_radius = serializers.FloatField()
    cells_number = serializers.FloatField()
    cluster_size = serializers.FloatField()
    stations_required = serializers.FloatField()
    handover_regulated = serializers.BooleanField()
    stations_quantity = serializers.IntegerField()

