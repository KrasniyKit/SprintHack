from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
import json

from . import serializers
from .calculations import MinimumStationsCalculator, CalculationsResult
from .models import BaseStation, District
from .serializers import DistrictSerializer, BaseStationSerializer, CalculationsResultSerializer


class DistrictViewSet(viewsets.ModelViewSet):
    """API вьюшка для районов """
    queryset = District.objects.all()
    serializer_class = DistrictSerializer

class BaseStationViewSet(viewsets.ModelViewSet):
    """API вьюшка для БС"""
    queryset = BaseStation.objects.all()
    serializer_class = BaseStationSerializer
    filterset_fields = ['district', 'standard', 'ant_type']
    search_fields = ['name']

class CalculationViewSet(APIView):
    """API вьюшка для расчетов"""
    def get(self, request):
        params = request.query_params
        station_ids = [params['st1'], params['st2'], params['st3']]
        unique_stations = [get_object_or_404(BaseStation, station_id = station_id) for station_id in station_ids]
        district_id = params.get('district_id')
        district = get_object_or_404(District, id=district_id)
        queryset = BaseStation.objects.all()
        result = MinimumStationsCalculator.calculate_stations_for_district(district, list(queryset),unique_stations)
        serializer = CalculationsResultSerializer(result)
        return Response(serializer.data)







