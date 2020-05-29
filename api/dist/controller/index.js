"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
class Controller {
    constructor(settings) {
        this.checkTemps = () => {
            console.log('checking temps');
        };
        this.settings = settings;
        setInterval(() => this.checkTemps(), settings.tickTime);
    }
}
exports.Controller = Controller;
//# sourceMappingURL=index.js.map