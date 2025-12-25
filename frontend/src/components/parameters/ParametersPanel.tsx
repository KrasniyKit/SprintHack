import React, { useState } from 'react';
import './ParametersPanel.scss';

interface ParametersPanelProps {
  onBuildingDensityChange: (density: 'low' | 'medium' | 'high') => void;
  onHandoverValueChange: (value: string) => void;
  handoverValue: string; // Добавляем пропс для текущего значения
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({
  onBuildingDensityChange,
  onHandoverValueChange,
  handoverValue,
}) => {
  const [buildingDensity, setBuildingDensity] = useState<'low' | 'medium' | 'high'>('medium');

  const handleDensitySelect = (density: 'low' | 'medium' | 'high') => {
    setBuildingDensity(density);
    onBuildingDensityChange(density);
  };

  const handleHandoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onHandoverValueChange(value);
  };

  return (
    <div className="parametersCard">
      <div className="parametersHeader">
        <span className="material-symbols-outlined">tune</span>
        <h3>Параметры</h3>
      </div>
      
      <div className="parameterSection">
        <span className="sectionTitle">Плотность застройки</span>
        <div className="densityButtons">
          <button
            className={`densityButton ${buildingDensity === 'low' ? 'active' : ''}`}
            onClick={() => handleDensitySelect('low')}
          >
            <span className="material-symbols-outlined">home</span>
            Низкая
          </button>
          
          <button
            className={`densityButton ${buildingDensity === 'medium' ? 'active' : ''}`}
            onClick={() => handleDensitySelect('medium')}
          >
            <span className="material-symbols-outlined">apartment</span>
            Средняя
          </button>
          
          <button
            className={`densityButton ${buildingDensity === 'high' ? 'active' : ''}`}
            onClick={() => handleDensitySelect('high')}
          >
            <span className="material-symbols-outlined">domain</span>
            Высокая
          </button>
        </div>
      </div>
      
      <div className="parameterSection">
        <span className="sectionTitle">Дополнительные параметры</span>
        
        <div className={`handoverInput ${handoverValue.trim() === '' ? 'empty' : ''}`}>
          <div className="handoverLabel">
            <div className="handoverIcon">
              <span className="material-symbols-outlined">network_check</span>
            </div>
            <div>
              <span className="handoverTitle">Значение хэндовера</span>
              <span className="handoverDescription">Количество хэндоверов в единицах</span>
            </div>
          </div>
          
          <div className="inputWrapper">
            <input
              type="text"
              value={handoverValue}
              onChange={handleHandoverChange}
              className="handoverValueInput"
              placeholder="Введите значение"
            />
          </div>
        </div>
        
        {handoverValue.trim() === '' && (
          <div className="validationHint">
            <span className="material-symbols-outlined">info</span>
            Введите значение хэндовера для расчета
          </div>
        )}
      </div>
    </div>
  );
};

export default ParametersPanel;