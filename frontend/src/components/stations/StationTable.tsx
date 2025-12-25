import React, { useState } from 'react';
import { BaseStation } from '../../types';
import './StationTable.scss';

interface StationTableProps {
  stations: BaseStation[]
  selectedStations: string[];
  onStationSelect: (stationId: string) => void;
}

const StationTable: React.FC<StationTableProps> = ({
  stations,
  selectedStations,
  onStationSelect,
}) => {
  const getStationTypeInfo = (type: BaseStation['type']) => {
    switch (type) {
      case 'секторная':
        return { label: 'Секторная', color: 'blue', letter: 'С' };
      case 'круговая':
        return { label: 'Круговая', color: 'purple', letter: 'К' };
      case 'восьмерка':
        return { label: 'Восьмерка', color: 'orange', letter: '8' };
      default:
        return { label: 'Сота', color: 'gray', letter: 'С' };
    }
  };

  const getStandardInfo = (standard: BaseStation['standard']) => {
    switch (standard) {
      case '5G':
        return { label: '5G', color: 'emerald' };
      case '4G':
        return { label: '4G', color: 'amber' };
      default:
        return { label: 'Unknown', color: 'gray' };
    }
  };

  const handleSelectStation = (stationId: string) => {
    if (selectedStations.includes(stationId)) {
      // Если уже выбрана - снимаем выбор
      onStationSelect(stationId);
    } else {
      // Если не выбрана - проверяем лимит 3 станции
      if (selectedStations.length < 3) {
        onStationSelect(stationId);
      } else {
        // Можно показать уведомление, что нельзя выбрать больше 3
        alert('Можно выбрать максимум 3 базовые станции');
      }
    }
  };

  return (
    <div className="stationCard">
      <div className="stationHeader">
        <div className="titleSection">
          <span className="titleIcon">settings_input_antenna</span>
          <div>
            <h3>Выбор базовых станций</h3>
            <p>Выберите до 3 базовых станций для расчета</p>
          </div>
        </div>
        <div className="selectionCounter">
          Выбрано: {selectedStations.length} / 3
        </div>
      </div>
      
      <div className="tableContainer">
        <table className="stationTable">
          <thead>
            <tr>
              <th>Название БС</th>
              <th>Площадь покрытия</th>
              <th>Частота</th>
              <th>Диапазон хэндовера</th>
              <th>Стандарт</th>
              <th className="actionsHeader">Выбрать</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station) => {
              const typeInfo = getStationTypeInfo(station.type);
              const standardInfo = getStandardInfo(station.standard);
              const isSelected = selectedStations.includes(station.id);
              
              return (
                <tr 
                  key={station.id} 
                  className={`tableRow ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleSelectStation(station.id)}
                >
                  <td>
                    <div className="cellType">
                      <div className={`typeBadge ${typeInfo.color}`}>
                        {typeInfo.letter}
                      </div>
                      <div className="stationInfo">
                        <span className="stationName">{station.name}</span>
                        <span className="stationType">{typeInfo.label}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="coverageCell">
                      <span className="coverageValue">{station.coverageArea}</span>
                      <span className="coverageUnit">км²</span>
                    </div>
                  </td>
                  <td>
                    <div className="frequencyCell">
                      <span className="frequencyValue">{station.frequency}</span>
                      <span className="frequencyUnit">Гц</span>
                    </div>
                  </td>
                  <td>
                    <div className="handoverCell">
                      <span className="handoverValue">{station.handoverRange}</span>
                      <span className="handoverUnit">ед.</span>
                    </div>
                  </td>
                  <td>
                    <div className="standardCell">
                      <span className={`standardBadge ${standardInfo.color}`}>
                        {standardInfo.label}
                      </span>
                    </div>
                  </td>
                  <td className="actionsCell">
                    <div className="checkboxWrapper">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectStation(station.id)}
                        className="stationCheckbox"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="stationFooter">
        <p className="selectionHint">
          {selectedStations.length < 3 ? `Выберите еще ${3 - selectedStations.length} станции` : 'Выбрано максимальное количество станций'}
        </p>
        <div className="selectedStationsInfo">
          {selectedStations.length > 0 ? (
            <span className="selectedCount">
              Готово к расчету: {selectedStations.length} станций
            </span>
          ) : (
            <span className="noSelection">
              Выберите базовые станции для расчета
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StationTable;