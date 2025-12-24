from django.db import models
import uuid

class BaseStation(models.Model):
    """Модель базовой станции для вычислений"""

    STANDARTS = [
        ('4G', "4G"),
        ('5G','5G')
    ]

    ANT_TYPES = [
        ("Sector", "Секторная"),
        ("Radian", "Круговая"),
        ("Hex", "Восьмерка")
    ]

    id = models.UUIDField(primary_key=True, default = uuid.uuid4,editable = False)
    station_id = models.PositiveIntegerField(unique = True,
                                             verbose_name = 'ИД БС')
    name = models.CharField(max_length = 255, unique=True,
                            verbose_name = 'Название БС')
    cover_area = models.FloatField(verbose_name = 'Площадь покрытия БС')
    frequency = models.PositiveIntegerField(verbose_name = 'Частота работы БС')
    ant_type = models.CharField(max_length = 100, choices = ANT_TYPES,
                           verbose_name = 'Тип антенны БС')
    handover_min = models.PositiveIntegerField(max_length = 100,
                                               verbose_name = "Нижняя граница хендовера БС")
    handover_max = models.PositiveIntegerField(max_length=100,
                                               verbose_name="Верхняя граница хендовера БС")
    standart = models.CharField(max_length = 15, choices = STANDARTS,
                                verbose_name = 'Стандарт связи БС')
    coordinates = models.CharField(max_length = 100,verbose_name = 'Координаты БС')

    class Meta:
        verbose_name = 'Базовая станция'
        verbose_name_plural = 'Базовые станции'
        ordering = ['station_id']

    def __str__(self):
        return self.name

    @property
    def cover_radius(self):
        return (self.cover_area / 3.14) ** 0.5

    @property
    def cover_diameter(self):
        return 2 * self.cover_radius



