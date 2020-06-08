import { ISettings } from './../config';

interface IOutputs {
  pump: boolean;
  light: boolean;
};

export class Controller {
  constructor(settings: ISettings) {
    this.settings = settings;
    this.cycleInterval = 1000;
    this.nextCycle();
  }

  inputs
  outputs: IOutputs;
  settings: ISettings;
  cycleCount = 0;
  cycleInterval: number;

  readTemps = () => {
    console.log('checking Temps IN');
    const temps = { water: { units: 'F', temp: 65 }}

    return temps;
  }

  readInputs = async (): Promise<void> => {
    // Sample the connected input sensor
    // ADS 1115 via i2c
    // native i2c sensors

    this.inputs = {
      temps: this.readTemps(),
      // humidity: this.readHumidity(),
      // ph: this.readPh(),
      // tds: this.readTotalDissolvedSolids(),
      // camera: this.readCamera(),
    }
  };

  computeOutputs = async (): Promise<void> => {
    const calcLight = () => {
      const now = new Date();

      return now.getHours() > 12
    };

    this.outputs = {
      pump: true,
      light: calcLight()
    }
  }

  writeOutputs = async (): Promise<void> => {
    console.log('writing OUT');
  }

  nextCycle = (lastCycleTime: number = 0) => {
      setTimeout(async () => {
        try {
          console.clear();
          const start = new Date();
          await this.cycle();
          this.cycleCount++;
          const end = new Date();
          const cycleTime = end.getTime() - start.getTime();
          console.log(`Cycle ${this.cycleCount} ran in ${cycleTime}ms`)

          this.nextCycle(cycleTime);
        } catch (e) {
          console.log(`Cycle ${this.cycleCount} crashed`, e)
        }
      }, this.cycleInterval - lastCycleTime);
  }

  cycle = async (): Promise<void> => {
    await this.readInputs()
    await this.computeOutputs();
    await this.writeOutputs();
  }
}
