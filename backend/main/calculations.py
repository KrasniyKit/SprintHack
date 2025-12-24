import math
from dataclasses import dataclass
from django.db.models import Avg

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

    