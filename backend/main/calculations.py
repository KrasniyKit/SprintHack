import math
from dataclasses import dataclass
from django.db.models import Avg
from typing import List

from .models import BaseStation, District


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
        "hard": 1.21,
        "med": 0.9,
        "low": 0.47
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

    @classmethod
    def calculate_avg_cells(cls,district: District,stations: List[BaseStation]) -> float:
        service_radius = cls.calculate_radius(district.area)
        return sum(cls.BUILDING_COEFS.get(district.density) * (service_radius / station.cover_radius) ** 2 for station in stations)



    @staticmethod
    def calculate_cluster_size(unique_stations: List[BaseStation]) -> float:
        unique_stations.sort(key=lambda s: s.cover_diameter, reverse=True)
        d1 = unique_stations[0].cover_diameter
        d2 = unique_stations[1].cover_diameter
        d3 = unique_stations[2].cover_diameter

        return d1 ** (5 / 2) + d2 ** (3 / 2) + d3 ** (1 / 2)

    @classmethod
    def calculate_stations_for_district(cls, district: District,
                                        all_stations: List[BaseStation],unique_stations: List[BaseStation]) -> CalculationsResult:
        """Метод для расчета минимального количества БС на район"""

        k = cls.BUILDING_COEFS.get(district.density)
        r0 = cls.calculate_radius(district.area)
        l = cls.calculate_avg_cells(district, all_stations)
        c = cls.calculate_cluster_size(unique_stations)
        n = l / c if c > 0 else 0

        handover_regulated = False
        for station in all_stations:
            if station.real_handover < station.handover_min or station.real_handover > station.handover_max:
                handover_regulated = True
                n*= 1.4
                break
        result_stations = math.ceil(n)
        return CalculationsResult(
            district_name=district.name,
            area=district.area,
            buildings_coef=k,
            cover_radius=r0,
            cells_quantity=l,
            cluster_size=c,
            handover_regulated=handover_regulated,
            stations_quantity=result_stations,
        )

