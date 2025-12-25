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
        district_id = request.query_params.get('district_id')
        district = get_object_or_404(District, id=district_id)
        queryset = BaseStation.objects.all()
        result = MinimumStationsCalculator.calculate_stations_for_district(district, list(queryset))
        serializer = CalculationsResultSerializer(result)
        return Response(serializer.data)







