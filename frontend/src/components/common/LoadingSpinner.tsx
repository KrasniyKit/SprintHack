import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loadingOverlay">
      <div className="loadingContent">
        <div className="spinnerContainer">
          <div className="spinner"></div>
          <div className="spinnerRing"></div>
        </div>
        <h2 className="loadingTitle">Загрузка данных</h2>
        <p className="loadingSubtitle">Подготавливаем систему для работы...</p>
        <div className="loadingProgress">
          <div className="progressBar">
            <div className="progressFill"></div>
          </div>
          <span className="progressText">Инициализация компонентов</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;