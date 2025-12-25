import React, { useState } from 'react';
import './ParametersPanel.scss';

interface ParametersPanelProps {
  onBuildingDensityChange: (density: 'low' | 'medium' | 'high') => void;
  onHandoverValueChange: (value: string) => void;
  handoverValue: string;
}

const ParametersPanel: React.FC<ParametersPanelProps> = ({
  onBuildingDensityChange,
  onHandoverValueChange,
  handoverValue,
}) => {
  const [buildingDensity, setBuildingDensity] = useState<'low' | 'medium' | 'high'>('medium');
  const [validationError, setValidationError] = useState<string>('');

  const handleDensitySelect = (density: 'low' | 'medium' | 'high') => {
    setBuildingDensity(density);
    onBuildingDensityChange(density);
  };

  const handleHandoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Проверяем, что вводится только число
    if (value === '' || /^\d+$/.test(value)) {
      setValidationError('');
      onHandoverValueChange(value);
    } else {
      setValidationError('Введите только числовое значение');
    }
  };

  // Проверка при потере фокуса
  const handleHandoverBlur = () => {
    if (handoverValue.trim() === '') {
      setValidationError('Поле обязательно для заполнения');
    } else if (!/^\d+$/.test(handoverValue)) {
      setValidationError('Введите только числовое значение');
    } else {
      setValidationError('');
    }
  };

  const isHandoverValid = handoverValue.trim() !== '' && /^\d+$/.test(handoverValue);

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
        
        <div className={`handoverInput ${!isHandoverValid && handoverValue !== '' ? 'error' : ''}`}>
          <div className="handoverLabel">
            <div className="handoverIcon">
              <span className="material-symbols-outlined">network_check</span>
            </div>
            <div>
              <span className="handoverTitle">Значение хэндовера</span>
              <span className="handoverDescription">Только числовое значение в единицах</span>
            </div>
          </div>
          
          <div className="inputWrapper">
            <input
              type="text"
              value={handoverValue}
              onChange={handleHandoverChange}
              onBlur={handleHandoverBlur}
              className="handoverValueInput"
              placeholder="Введите число"
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
        </div>
        
        {validationError && (
          <div className="validationError">
            <span className="material-symbols-outlined">error</span>
            {validationError}
          </div>
        )}
        
        {handoverValue.trim() === '' && !validationError && (
          <div className="validationHint">
            <span className="material-symbols-outlined">info</span>
            Введите числовое значение хэндовера для расчета
          </div>
        )}
      </div>
    </div>
  );
};

export default ParametersPanel;