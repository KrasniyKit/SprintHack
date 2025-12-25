from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
import json

from . import serializers
from .calculations import MinimumStationsCalculator
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

class CalculationViewSet(viewsets.ViewSet):
    """API вьюшка для расчетов"""

    @action(detail=False, methods=['get'])
    def calculate(self, request):
        district_id = request.query_params.get('district_id')
        district = get_object_or_404(District, pk=district_id)
        stations = BaseStation.objects.all()
        result = MinimumStationsCalculator.calculate_stations_for_district(district,list(stations))
        serializer = CalculationsResultSerializer(result)
        return Response(serializer.data)






