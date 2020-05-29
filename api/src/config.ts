export interface ISettings {
  units: {
    temp: 'F' | 'C';
    TDS: 'PPM';
  };
  setpoints: {
    waterTemp: number;
    TDS: number;
  },
  tickTime: number;
}

export const settings: ISettings = {
  units: {
    temp: 'F',
    TDS: 'PPM'
  },
  setpoints: {
    waterTemp: 65,
    TDS: 1200
  },
  tickTime: 4000
}
