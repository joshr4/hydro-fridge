import { ISettings } from './../config';

export class Controller {
  constructor(settings: ISettings) {
    this.settings = settings;
    setInterval(() => this.checkTemps(), settings.tickTime);
  }

  settings;

  checkTemps = () => {
    console.log('checking temps');
  }
}
