from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
import json

from . import serializers
from .models import BaseStation, District
from .serializers import DistrictSerializer, BaseStationSerializer


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







