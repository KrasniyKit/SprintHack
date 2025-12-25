import React from 'react';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logoSection">
        <div className="logoIcon">
          <span className="material-symbols-outlined">cell_tower</span>
        </div>
        <div>
          <h2 className="title">Калькулятор Базовых Станций</h2>
          <p className="subtitle">Система планирования телекоммуникационных сетей</p>
        </div>
      </div>
    </header>
  );
};

export default Header;