import axios from 'axios';
import { BaseStation, District, CalculationResult } from '../types';

// Базовый URL вашего API
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 секунд таймаут
});

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Сервер ответил с ошибкой
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Запрос был сделан, но нет ответа
      console.error('Network Error:', error.message);
    } else {
      // Что-то пошло не так при настройке запроса
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Получить все районы
 */
export const fetchDistricts = async (): Promise<District[]> => {
  try {
    const response = await api.get<District[]>('/districts');
    return response.data;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

/**
 * Получить все базовые станции
 */
export const fetchBaseStations = async (): Promise<BaseStation[]> => {
  try {
    const response = await api.get<BaseStation[]>('/basestations');
    return response.data;
  } catch (error) {
    console.error('Error fetching base stations:', error);
    throw error;
  }
};

/**
 * Получить расчет оптимизации
 * @param districtId - ID района
 * @param stationIds - Массив из 3 ID станций
 * @param buildingDensity - Коэффициент застройки ('low' | 'medium' | 'high')
 * @param handoverValue - Значение хэндовера (число)
 */
export const calculateOptimization = async ({
  districtId,
  stationIds,
  buildingDensity,
  handoverValue,
}: {
  districtId: string;
  stationIds: string[]; // Массив из 3 ID
  buildingDensity: string; // 'low' | 'medium' | 'high'
  handoverValue: string; // Число как строка
}): Promise<CalculationResult> => {
  try {
    // Проверяем что ровно 3 станции
    if (stationIds.length !== 3) {
      throw new Error('Необходимо выбрать ровно 3 базовые станции');
    }

    // Преобразуем плотность застройки в формат API
    const densityMap: Record<string, string> = {
      'low': 'low',
      'medium': 'med',
      'high': 'hard'
    };
    
    const apiDensity = densityMap[buildingDensity] || 'med';

    // Создаем параметры запроса
    const params = new URLSearchParams({
      district_id: districtId,
      st1: stationIds[0],
      st2: stationIds[1],
      st3: stationIds[2],
      building_coef: apiDensity,
      handover: handoverValue,
    });

    // Делаем GET запрос с параметрами
    const response = await api.get<CalculationResult>(`/calculations/?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error calculating optimization:', error);
    throw error;
  }
};

/**
 * Альтернативный вариант - через POST запрос (если предпочитаете)
 */
export const calculateOptimizationPost = async (data: {
  districtId: string;
  stationIds: string[];
  buildingDensity: string;
  handoverValue: string;
}): Promise<CalculationResult> => {
  try {
    const densityMap: Record<string, string> = {
      'low': 'low',
      'medium': 'med',
      'high': 'hard'
    };
    
    const apiDensity = densityMap[data.buildingDensity] || 'med';

    const requestData = {
      district_id: data.districtId,
      station_ids: data.stationIds, // Отправляем как массив
      building_coef: apiDensity,
      handover: data.handoverValue,
    };

    const response = await api.post<CalculationResult>('/calculations/', requestData);
    return response.data;
  } catch (error) {
    console.error('Error calculating optimization:', error);
    throw error;
  }
};

export default api;