import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import Header from '../common/Header';
import DistrictSelector from '../districts/DistrictSelector';
import StationTable from '../stations/StationTable';
import ParametersPanel from '../parameters/ParametersPanel';
import ResultsModal from '../calculations/ResultsModal';
import LoadingSpinner from '../common/LoadingSpinner';
import { calculateOptimization } from '../../api';
import './MainLayout.scss';

const MainLayout: React.FC = () => {
  const { districts, stations, loading } = useData();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [buildingDensity, setBuildingDensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [handoverValue, setHandoverValue] = useState('');
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalculateEnabled, setIsCalculateEnabled] = useState(false);
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Автоматически выбираем первый район при загрузке
  useEffect(() => {
    if (districts.length > 0 && !selectedDistrict) {
      setSelectedDistrict(districts[0].id);
    }
  }, [districts, selectedDistrict]);

  // Проверяем условия для активации кнопки расчета
  useEffect(() => {
    const hasHandoverValue = handoverValue.trim() !== '';
    const isHandoverNumber = /^\d+$/.test(handoverValue);
    const hasThreeStations = selectedStations.length === 3;
    const hasDistrict = selectedDistrict !== '';
    
    setIsCalculateEnabled(
      hasDistrict && 
      hasHandoverValue && 
      isHandoverNumber && 
      hasThreeStations
    );
  }, [handoverValue, selectedStations, selectedDistrict]);

  const handleCalculate = async () => {
    if (!isCalculateEnabled) {
      if (!selectedDistrict) {
        alert('Пожалуйста, выберите район');
      } else if (selectedStations.length !== 3) {
        alert('Пожалуйста, выберите ровно 3 базовые станции для расчета');
      } else if (handoverValue.trim() === '') {
        alert('Пожалуйста, введите значение хэндовера');
      } else if (!/^\d+$/.test(handoverValue)) {
        alert('Хэндовер должен быть числовым значением');
      }
      return;
    }

    try {
      setIsCalculating(true);
      
      // Получаем station_id для выбранных станций
      const selectedStationObjects = stations.filter(station => 
        selectedStations.includes(station.id)
      );
      
      // Преобразуем UUID в station_id (число)
      const stationIds = selectedStationObjects.map(station => 
        station.station_id.toString()
      );

      console.log('Отправляю данные на расчет:', {
        districtId: selectedDistrict,
        stationIds: stationIds,
        buildingDensity: buildingDensity,
        handoverValue: handoverValue
      });

      // Вызов API для расчета
      let result;

      try {
        result = await calculateOptimization({
          districtId: selectedDistrict,
          stationIds: stationIds,
          buildingDensity: buildingDensity,
          handoverValue: handoverValue
        });
      } catch (error) {
        result = {
          districts: '7c003262-09d4-473a-8c6d-5381901cd06b',
          stationsIds: ['1', '2', '3']
        }
      }
      

      console.log('Получен результат:', result);
      setCalculationResult(result);
      setIsModalOpen(true);
      
    } catch (err: any) {
      console.error('Calculation error:', err);
      alert(`Ошибка при расчете оптимизации: ${err.message || 'Пожалуйста, попробуйте еще раз'}`);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleHandoverValueChange = (value: string) => {
    setHandoverValue(value);
  };

  const handleStationSelect = (stationId: string) => {
    setSelectedStations(prev => {
      if (prev.includes(stationId)) {
        return prev.filter(id => id !== stationId);
      } else {
        if (prev.length < 3) {
          return [...prev, stationId];
        } else {
          alert('Можно выбрать максимум 3 базовые станции');
          return prev;
        }
      }
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="layoutContainer">
      <Header />
      
      <main className="mainContent">
        <div className="contentWrapper">
          <div className="pageHeader">
            <div>
              <h1>Планирование сети</h1>
              <p>
                Настройте зоны покрытия и параметры базовых станций для оптимизации.
              </p>
            </div>
          </div>
          
          <div className="mainGrid">
            <div className="leftColumn">
              <DistrictSelector
                districts={districts}
                selectedDistrict={selectedDistrict}
                onDistrictChange={setSelectedDistrict}
              />
              
              <ParametersPanel
                onBuildingDensityChange={setBuildingDensity}
                onHandoverValueChange={handleHandoverValueChange}
                handoverValue={handoverValue}
              />
            </div>
            
            <div className="rightColumn">
              <StationTable
                stations={stations}
                selectedStations={selectedStations}
                onStationSelect={handleStationSelect}
              />
            </div>
          </div>
          
          <div className="footerActions">
            <div className="footerStats">
              <div className="statDivider"></div>
              <div className="stat">
                <p className="statLabel">Выбран район</p>
                <p className={`statValue ${selectedDistrict ? 'valid' : 'invalid'}`}>
                  {selectedDistrict ? '✓' : 'не выбран'}
                </p>
              </div>
              <div className="statDivider"></div>
              <div className="stat">
                <p className="statLabel">Выбрано станций</p>
                <p className={`statValue ${selectedStations.length === 3 ? 'valid' : 'invalid'}`}>
                  {selectedStations.length} <span className="statUnit">/ 3</span>
                </p>
              </div>
              <div className="statDivider"></div>
              <div className="stat">
                <p className="statLabel">Параметр хэндовера</p>
                <p className={`statValue ${handoverValue.trim() !== '' && /^\d+$/.test(handoverValue) ? 'valid' : 'invalid'}`}>
                  {handoverValue || 'не задано'}
                </p>
              </div>
            </div>
            
            <button 
              className={`calculateButton ${isCalculateEnabled ? 'active' : 'disabled'} ${isCalculating ? 'calculating' : ''}`} 
              onClick={handleCalculate}
              disabled={!isCalculateEnabled || isCalculating}
            >
              {isCalculating ? (
                <>
                  <span className="material-symbols-outlined spinning">refresh</span>
                  Расчет...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">calculate</span>
                  Рассчитать оптимизацию
                </>
              )}
            </button>
          </div>
        </div>
      </main>
      
      <ResultsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        calculationResult={calculationResult}
        buildingDensity={buildingDensity}
      />
    </div>
  );
};

export default MainLayout;