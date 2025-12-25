import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BaseStation, District } from '../types';
import { fetchDistricts, fetchBaseStations } from '../api';
import { mockDistricts, mockStations } from '../utils/data';

interface DataContextType {
  districts: District[];
  stations: BaseStation[];
  loading: boolean;
  isDemoMode: boolean;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [stations, setStations] = useState<BaseStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Пытаемся загрузить данные с API
      const [districtsData, stationsData] = await Promise.all([
        fetchDistricts(),
        fetchBaseStations(),
      ]);
      
      setDistricts(districtsData);
      setStations(stationsData);
      setIsDemoMode(false);
    } catch (err) {
      console.warn('API недоступен, используются демонстрационные данные');
      
      // Используем моковые данные без показа ошибки
      setDistricts(mockDistricts);
      setStations(mockStations);
      setIsDemoMode(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ districts, stations, loading, isDemoMode, refreshData: loadData }}>
      {children}
    </DataContext.Provider>
  );
};