import axios from 'axios';
import { BaseStation, CalculationResult, District } from 'types';

const API_BASE_URL = 'http://localhost:8080/api'; // Замените на ваш бэкенд URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDistricts = async () => {
  try {
    const response = await api.get<District[]>('/districts');
    return response.data;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

export const fetchBaseStations = async () => {
  try {
    const response = await api.get<BaseStation[]>('/base-stations');
    return response.data;
  } catch (error) {
    console.error('Error fetching base stations:', error);
    throw error;
  }
};

export const calculateOptimization = async (data: {
  districtId: string;
  buildingDensity: string;
  handoverValue: string;
  selectedStationIds: string[];
}) => {
  try {
    const response = await api.post<CalculationResult>('/calculate', data);
    return response.data;
  } catch (error) {
    console.error('Error calculating optimization:', error);
    throw error;
  }
};

export default api;