import { BaseStation, District } from '../types';

// Моковые данные для использования при недоступности API
export const mockDistricts: District[] = [
  {
    id: '1',
    name: 'Центральный район',
    latitude: '34.0522 N',
    longitude: '118.2437 W',
    area: '42.5'
  },
  {
    id: '2',
    name: 'Северный промышленный',
    latitude: '34.0522 N',
    longitude: '118.2437 W',
    area: '38.2'
  },
  {
    id: '3',
    name: 'Западные пригороды',
    latitude: '34.0522 N',
    longitude: '118.2437 W',
    area: '56.8'
  },
  {
    id: '4',
    name: 'Восточные холмы',
    latitude: '34.0522 N',
    longitude: '118.2437 W',
    area: '29.3'
  }
];

export const mockStations: BaseStation[] = [
  {
    id: '1',
    name: 'Базовая станция WOP-12ac-LR',
    type: 'секторная',
    coverageArea: 8.91,
    frequency: 2600,
    handoverRange: '12-18',
    standard: '5G'
  },
  {
    id: '2',
    name: 'Cisco IW3702-2E-UXK9',
    type: 'круговая',
    coverageArea: 6.17,
    frequency: 3200,
    handoverRange: '14-20',
    standard: '4G'
  },
  {
    id: '3',
    name: 'Huawei 5G Macro BTS',
    type: 'секторная',
    coverageArea: 10.25,
    frequency: 3500,
    handoverRange: '10-16',
    standard: '5G'
  },
  {
    id: '4',
    name: 'Ericsson Radio 8843',
    type: 'восьмерка',
    coverageArea: 2.45,
    frequency: 1800,
    handoverRange: '8-12',
    standard: '4G'
  },
  {
    id: '5',
    name: 'Nokia AirScale',
    type: 'круговая',
    coverageArea: 7.32,
    frequency: 2100,
    handoverRange: '15-22',
    standard: '5G'
  },
  {
    id: '6',
    name: 'ZTE 5G Pico',
    type: 'восьмерка',
    coverageArea: 1.89,
    frequency: 3800,
    handoverRange: '6-10',
    standard: '5G'
  }
];