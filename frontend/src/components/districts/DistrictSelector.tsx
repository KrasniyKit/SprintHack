import React from 'react';
import { District } from '../../types';
import './DistrictSelector.scss';

interface DistrictSelectorProps {
  districts: District[];
  selectedDistrict: string;
  onDistrictChange: (districtId: string) => void;
}

const DistrictSelector: React.FC<DistrictSelectorProps> = ({
  districts,
  selectedDistrict,
  onDistrictChange,
}) => {
  const selected = districts.find(d => d.id === selectedDistrict) || districts[0];

  return (
    <div className="districtCard">
      <div className="backgroundPattern" />
      
      <div className="districtHeader">
        <span className="material-symbols-outlined">location_on</span>
        <h3>Зона Покрытия</h3>
      </div>
      
      <div className="districtContent">
        <label className="districtFormGroup">
          <span className="districtLabel">Выбрать район</span>
          <div className="selectWrapper">
            <select
              className="districtSelect"
              value={selectedDistrict}
              onChange={(e) => onDistrictChange(e.target.value)}
            >
              {districts.map(district => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
            <div className="selectIcon">
              <span className="material-symbols-outlined">expand_more</span>
            </div>
          </div>
        </label>
        
        <div className="areaInfo">
          <div>
            <span className="areaLabel">Расчетная площадь</span>
            <div className="areaValue">
              {selected.area} <span className="areaUnit">км²</span>
            </div>
          </div>
          <span className="material-symbols-outlined">map</span>
        </div>
      </div>
    </div>
  );
};

export default DistrictSelector;