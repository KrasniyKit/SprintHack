import { BaseStation, District } from '../types';

// Моковые данные для использования при недоступности API
export const mockDistricts: District[] = [
  {
    id: '7c003262-09d4-473a-8c6d-5381901cd06b',
    name: 'Тимирязевский',
    area: 215.0,
    density: 'med'
  },
  {
    id: '280fa45d-ad5a-4560-9d45-6f6658f2325c',
    name: 'Окружной',
    area: 100.0,
    density: 'hard'
  },
  {
    id: '3a7b8c9d-0e1f-2a3b-4c5d-6e7f8a9b0c1d',
    name: 'Центральный',
    area: 85.5,
    density: 'hard'
  },
  {
    id: '4b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e',
    name: 'Северный',
    area: 120.3,
    density: 'low'
  },
  {
    id: '5c9d0e1f-2a3b-4c5d-6e7f-8a9b0c1d2e3f',
    name: 'Западный',
    area: 95.7,
    density: 'med'
  }
];

export const mockStations: BaseStation[] = [
  {
    id: 'cbcf922f-e731-4553-8332-536c1b3b7da9',
    station_id: 1,
    name: 'Базовая станция WOP-12ac-LR',
    cover_area: 8.91,
    frequency: 2600,
    ant_type: 'Sector',
    handover_min: 12,
    handover_max: 18,
    standard: '5G',
    coordinates: '55.7558,37.6173',
    real_handover: 13,
    cover_radius: 1.684511685276892,
    cover_diameter: 3.369023370553784
  },
  {
    id: '35a33064-ecb5-4820-b661-ecdc127be5fd',
    station_id: 2,
    name: 'Cisco IW3702-2E-UXK9',
    cover_area: 6.17,
    frequency: 3200,
    ant_type: 'Radian',
    handover_min: 14,
    handover_max: 20,
    standard: '4G',
    coordinates: '55.7601,37.6254',
    real_handover: 21,
    cover_radius: 1.4017732173451745,
    cover_diameter: 2.803546434690349
  },
  {
    id: '04a7b2ff-fdfc-49cb-ba8c-27a6cb64b2e2',
    station_id: 3,
    name: 'LiteBeam 5AC-16-120',
    cover_area: 4.19,
    frequency: 5000,
    ant_type: 'Radian',
    handover_min: 11,
    handover_max: 19,
    standard: '4G',
    coordinates: '55.7524,37.6219',
    real_handover: 13,
    cover_radius: 1.1551601207012814,
    cover_diameter: 2.3103202414025628
  },
  {
    id: '91503bb8-0b7e-49c2-8aa1-a555b8b5ab16',
    station_id: 4,
    name: 'Ubiquiti UniFi AC Mesh Pro',
    cover_area: 2.18,
    frequency: 5200,
    ant_type: 'Hex',
    handover_min: 16,
    handover_max: 20,
    standard: '5G',
    coordinates: '55.7589,37.6198',
    real_handover: 15,
    cover_radius: 0.8332271694583459,
    cover_diameter: 1.6664543389166917
  },
  {
    id: '5d9121d4-b861-4b6a-93ee-7eeb5abbfea8',
    station_id: 5,
    name: 'Cambium ePMP 1000 C050900A021A',
    cover_area: 6.12,
    frequency: 2500,
    ant_type: 'Sector',
    handover_min: 10,
    handover_max: 17,
    standard: '5G',
    coordinates: '55.7563,37.6237',
    real_handover: 15,
    cover_radius: 1.396081869371299,
    cover_diameter: 2.792163738742598
  },
  {
    id: '6e2a3b4c-5d6e-7f8a-9b0c-1d2e3f4a5b6c',
    station_id: 6,
    name: 'Huawei 5G Macro BTS',
    cover_area: 10.25,
    frequency: 3500,
    ant_type: 'Sector',
    handover_min: 10,
    handover_max: 16,
    standard: '5G',
    coordinates: '55.7532,37.6185',
    real_handover: 12,
    cover_radius: 1.808318128414748,
    cover_diameter: 3.616636256829496
  },
  {
    id: '7f3b4c5d-6e7f-8a9b-0c1d-2e3f4a5b6c7d',
    station_id: 7,
    name: 'Ericsson Radio 8843',
    cover_area: 2.45,
    frequency: 1800,
    ant_type: 'Sector',
    handover_min: 8,
    handover_max: 12,
    standard: '4G',
    coordinates: '55.7598,37.6221',
    real_handover: 10,
    cover_radius: 0.883176086632784,
    cover_diameter: 1.766352173265568
  },
  {
    id: '8a4c5d6e-7f8a-9b0c-1d2e-3f4a5b6c7d8e',
    station_id: 8,
    name: 'Nokia AirScale',
    cover_area: 7.32,
    frequency: 2100,
    ant_type: 'Radian',
    handover_min: 15,
    handover_max: 22,
    standard: '5G',
    coordinates: '55.7576,37.6209',
    real_handover: 18,
    cover_radius: 1.526548609047159,
    cover_diameter: 3.053097218094318
  },
  {
    id: '9b5d6e7f-8a9b-0c1d-2e3f-4a5b6c7d8e9f',
    station_id: 9,
    name: 'ZTE 5G Pico',
    cover_area: 1.89,
    frequency: 3800,
    ant_type: 'Hex',
    handover_min: 6,
    handover_max: 10,
    standard: '5G',
    coordinates: '55.7545,37.6248',
    real_handover: 8,
    cover_radius: 0.775854952210834,
    cover_diameter: 1.551709904421668
  },
  {
    id: 'ac6e7f8a-9b0c-1d2e-3f4a-5b6c7d8e9f0a',
    station_id: 10,
    name: 'Samsung 5G Compact',
    cover_area: 3.75,
    frequency: 2800,
    ant_type: 'Radian',
    handover_min: 9,
    handover_max: 15,
    standard: '5G',
    coordinates: '55.7519,37.6178',
    real_handover: 11,
    cover_radius: 1.092150450514258,
    cover_diameter: 2.184300901028516
  }
];