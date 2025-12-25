from django.test import TestCase
from .calculations import MinimumStationsCalculator
from .models import District, BaseStation


class CalculationTest(TestCase):
    """Тесты алгоритмов вычислений """
    def setUp(self):
        """Сет ап мок данных"""
        self.district = District.objects.create(
            name='Район для теста',
            area=50,
            density='hard'
        )
        self.station1 = BaseStation.objects.create(
            station_id=1,
            name='БС для теста 1',
            cover_area=6.16,
            frequency=1700,
            ant_type='sec',
            handover_min=9,
            handover_max=15,
            standard='5G'
        )
        self.station2 = BaseStation.objects.create(
            station_id=2,
            name='БС для теста 2',
            cover_area=7.46,
            frequency=2500,
            ant_type='rad',
            handover_min=12,
            handover_max=19,
            standard='5G'
        )

    def test_radius_calculation(self):  # Проверка правильно ли считает радиус
        radius = MinimumStationsCalculator.calculate_radius(self.district.area)
        expect = (50 / 3.14) ** 0.5
        self.assertAlmostEqual(radius, expect,places = 2)

    def test_avg_cell_calculation(self): # Проверка правильно ли считает среднее кол-во сот
        avg_cell = (MinimumStationsCalculator.calculate_avg_cells
                    (self.district, [self.station1, self.station2]))
        expect = 1.24 * ((50 / 3.14) ** 0.5 / (self.station1.cover_area / 3.14) ** 0.5) ** 2
        self.assertAlmostEqual(avg_cell, expect,places = 3)

