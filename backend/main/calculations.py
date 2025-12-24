import math
from dataclasses import dataclass
from django.db.models import Avg
from typing import List

from models import BaseStation


@dataclass
class CalculationsResult:
    """Класс, описывающий результаты расчетов для отдельного района"""

    district_name: str
    area: float
    buildings_coef: float
    cover_radius: float
    cells_number: float
    cluster_size: float
    stations_required: float
    handover_regulated: bool
    stations_quantity: int


class MinimumStationsCalculator:
    """Класс для расчета минимального количества станций"""

    BUILDING_COEFS = {
        "Плотная": 1.21,
        "Средняя": 0.9,
        "Сельская": 0.47
    }

    @staticmethod
    def calculate_radius(area: float) -> float:
        """Метод для расчета радиуса зоны обслуживания и радиуса
         покрытия БС с помощью формулы из ТЗшки"""
        return (area / 3.14) ** 0.5

    @staticmethod
    def calculate_cells_number(base_radius: float, zone_radius: float, coef: float) -> float:
        """Метод для подсчета количества сот с помощью формулы из ТЗшки"""
        return coef * (zone_radius / base_radius) ** 2

    @staticmethod
    def calculate_cluster_size(stations: List[BaseStation]) -> float:
        """Метод для расчета количества базовых станций в одном кластере из формулы в ТЗ"""
        unique_stations = []
        seen_stations = set()
        for station in sorted(stations, key=lambda s: s.diameter,
                              reverse=True):  # Проходим по массиву станций и отбираем 3 с уникальной частотой
            if station.frequency not in seen_stations:
                unique_stations.append(station)
                seen_stations.add(station)
            if len(unique_stations) == 3:
                break

        if len(unique_stations) < 3:  # Если уникальные не набрались, берем просто любые 3
            unique_stations = list(stations)[:3]

        D1 = unique_stations[0].cover_diameter
        D2 = unique_stations[1].cover_diameter
        D3 = unique_stations[2].cover_diameter

        return D1 ** (5 / 2) + D2 ** (3 / 2) + D3 ** (1 / 2)
