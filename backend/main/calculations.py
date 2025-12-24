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

