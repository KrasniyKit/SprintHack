import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import Header from '../common/Header';
import DistrictSelector from '../districts/DistrictSelector';
import StationTable from '../stations/StationTable';
import ParametersPanel from '../parameters/ParametersPanel';
import ResultsModal from '../calculations/ResultsModal';
import LoadingSpinner from '../common/LoadingSpinner';
import './MainLayout.scss';

const MainLayout: React.FC = () => {
  const { districts, stations, loading } = useData();
  const [selectedDistrict, setSelectedDistrict] = useState('1');
  const [buildingDensity, setBuildingDensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [handoverValue, setHandoverValue] = useState('');
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalculateEnabled, setIsCalculateEnabled] = useState(false);

  const mockResult = {
    id: '1',
    totalStations: 42,
    lowHandoverValue: parseInt(handoverValue) < 50
  };

  // Проверяем условия для активации кнопки расчета
  useEffect(() => {
    const hasHandoverValue = handoverValue.trim() !== '';
    const isHandoverNumber = /^\d+$/.test(handoverValue);
    const hasThreeStations = selectedStations.length === 3;
    
    setIsCalculateEnabled(hasHandoverValue && isHandoverNumber && hasThreeStations);
  }, [handoverValue, selectedStations]);

  const handleCalculate = async () => {
    if (!isCalculateEnabled) {
      if (selectedStations.length !== 3) {
        alert('Пожалуйста, выберите ровно 3 базовые станции для расчета');
      } else if (handoverValue.trim() === '') {
        alert('Пожалуйста, введите значение хэндовера');
      } else if (!/^\d+$/.test(handoverValue)) {
        alert('Хэндовер должен быть числовым значением');
      }
      return;
    }

    try {
      // Здесь будет вызов API для расчета
      // const result = await calculateOptimization({
      //   districtId: selectedDistrict,
      //   buildingDensity,
      //   handoverValue,
      //   selectedStationIds: selectedStations
      // });
      
      // Временно используем моковый результат
      
      setIsModalOpen(true);
    } catch (err) {
      alert('Ошибка при расчете оптимизации. Пожалуйста, попробуйте еще раз.');
      console.error('Calculation error:', err);
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
              className={`calculateButton ${isCalculateEnabled ? 'active' : 'disabled'}`} 
              onClick={handleCalculate}
              disabled={!isCalculateEnabled}
            >
              <span className="material-symbols-outlined">calculate</span>
              Рассчитать оптимизацию
            </button>
          </div>
        </div>
      </main>
      
      <ResultsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buildingDensity={buildingDensity}
        calculationResult={mockResult}
      />
    </div>
  );
};

export default MainLayout;