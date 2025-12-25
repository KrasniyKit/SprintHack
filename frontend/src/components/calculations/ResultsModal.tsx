import React from 'react';
import './ResultsModal.scss';
import { CalculationResult } from 'types';

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  buildingDensity: 'low' | 'medium' | 'high';
  calculationResult: CalculationResult
}

const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  onClose,
  buildingDensity,
  calculationResult
}) => {
  if (!isOpen) return null;

  const densityVariables = {
    low: 'Сельская',
    medium: 'Средняя',
    high: 'Плотная'
  }

  const densityLabel = densityVariables[buildingDensity];
  const handoverLabel = calculationResult.handover_regulated ? 'Низкий' : 'Оптимальный'; 

  return (
    <>
      <div className="modalBackdrop" onClick={onClose} />
      
      <div className="resultsModal">
        <div className="modalHeader">
          <div className="modalHeaderLeft">
            <div className="modalHeaderIcon">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <h2>Результаты расчета</h2>
          </div>
          
          <button className="modalCloseButton" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <div className="modalContent">
          <div className="summaryCard">
            <div className="resultsBackgroundPattern" />
            <p className="districtLabel">Целевой район: Центральный район</p>
            <div className="summaryMain">
              <h1 className="stationsCount">{calculationResult.stations_quantity}</h1>
              <span className="stationsLabel">Базовых станций требуется</span>
            </div>
            <div className="summaryBadges">
              <span className="resultBadge">
                <span className="material-symbols-outlined">bolt</span>
                {densityLabel} застройка
              </span>
              <span className={`resultBadge ${calculationResult.handover_regulated ? 'bad' : 'optimal'}`}>
                <span className="material-symbols-outlined">check_circle</span>
                {handoverLabel} хэндовер
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsModal;