import math
from dataclasses import dataclass
from django.db.models import Avg
from typing import List

from models import BaseStation, District


@dataclass
class CalculationsResult:
    """Класс, описывающий результаты расчетов для отдельного района"""

    district_name: str
    area: float
    buildings_coef: float
    cover_radius: float
    cells_quantity: float
    cluster_size: float
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
        unique_stations.sort(key=lambda s: s.diameter, reverse=True)
        d1 = unique_stations[0].cover_diameter
        d2 = unique_stations[1].cover_diameter
        d3 = unique_stations[2].cover_diameter

        return d1 ** (5 / 2) + d2 ** (3 / 2) + d3 ** (1 / 2)

    @classmethod
    def calculate_stations_for_district(cls, district: District,
                                        stations_in_district: List[BaseStation],
                                        all_stations: List[BaseStation]) -> CalculationsResult:
        """Метод для расчета минимального количества вышек в районе и получения результатов вычислений"""

        coef = cls.BUILDING_COEFS[district.density]
        service_radius = cls.calculate_radius(district.area)
        avg_cover_radius = (sum(
            cls.calculate_radius(s.cover_area) for s in stations_in_district)
                            / len(stations_in_district)) if stations_in_district else 0

        cell_quantity = cls.calculate_cells_number(service_radius, avg_cover_radius, coef)

        cluster_size = cls.calculate_cluster_size(all_stations)

        station_quantity = cluster_size / cell_quantity if cell_quantity > 0 else 0

        handover_regulated = False
        for station in stations_in_district:
            if station.real_handover:
                if station.real_handover < station.handover_min or station.real_handover > station.handover_max:
                    handover_regulated = True
                    station_quantity *= 1.4
                    break

        station_quantity = math.ceil(station_quantity)
        calc_result = CalculationsResult(
            district_name=district.name,
            area=district.area,
            buildings_coef=coef,
            cover_radius=service_radius,
            cells_quantity=cell_quantity,
            cluster_size=cluster_size,
            stations_quantity=station_quantity,
            handover_regulated=handover_regulated,
        )
        return calc_result
