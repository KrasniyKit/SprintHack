from django.db import models
import uuid


class BaseStation(models.Model):
    """Модель базовой станции для вычислений"""

    STANDARTS = [  # Перечисление для выбора стандартов связи БС
        ('4G', "4G"),
        ('5G', '5G')
    ]

    ANT_TYPES = [  # Перечисление для выбора типов антенн БС
        ("Sector", "Секторная"),
        ("Radian", "Круговая"),
        ("Hex", "Восьмерка")
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    station_id = models.PositiveIntegerField(unique=True,
                                             verbose_name='ИД БС')
    name = models.CharField(max_length=255, unique=True,
                            verbose_name='Название БС')
    cover_area = models.FloatField(verbose_name='Площадь покрытия БС')
    frequency = models.PositiveIntegerField(verbose_name='Частота работы БС')
    ant_type = models.CharField(max_length=100, choices=ANT_TYPES,
                                verbose_name='Тип антенны БС')
    handover_min = models.PositiveIntegerField(max_length=100,
                                               verbose_name="Нижняя граница хендовера БС")
    handover_max = models.PositiveIntegerField(max_length=100,
                                               verbose_name="Верхняя граница хендовера БС")
    standard = models.CharField(max_length=15, choices=STANDARTS,
                                verbose_name='Стандарт связи БС')
    coordinates = models.CharField(max_length=100, verbose_name='Координаты БС')

    real_handover = models.PositiveIntegerField(max_length=100, verbose_name='Актуальный хендовер')

    class Meta:
        verbose_name = 'Базовая станция'
        verbose_name_plural = 'Базовые станции'
        ordering = ['station_id']  # Сортировка по айдишникам станций

    def __str__(self):
        return self.name

    @property
    def cover_radius(self):
        """Метод возвращающий радиус из площади по формуле из ТЗшки + можно обращаться как
        к свойству объекта класса"""
        return (self.cover_area / 3.14) ** 0.5

    @property
    def cover_diameter(self):
        """Метод возвращающий диаметр из площади по формуле из ТЗшки + можно обращаться как
        к свойству объекта класса"""
        return 2 * self.cover_radius


class District(models.Model):
    BUILDINGS_DENSITY = [
        ('hard', 'Плотная застройка'),
        ('med', 'Средняя застройка'),
        ('low', 'Слабая застройка')
    ]
    """Модель района города"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True, verbose_name='Название')
    area = models.FloatField(verbose_name="Площадь района")
    density = models.CharField(max_length=100, choices=BUILDINGS_DENSITY,
                               verbose_name='Плотность застройки', default='med')

    class Meta:
        verbose_name = 'Район'
        verbose_name_plural = 'Районы'

    def __str__(self):
        return self.name
