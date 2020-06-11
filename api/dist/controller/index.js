"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
;
class Controller {
    constructor(settings) {
        this.cycleCount = 0;
        this.cycleInterval = 1000;
        this.enableRun = false;
        this.start = () => {
            this.enableRun = true;
            this.nextCycle();
        };
        this.stop = () => {
            this.enableRun = false;
        };
        this.readTemps = () => {
            console.log('checking Temps IN');
            const temps = { water: { units: 'F', temp: 65 } };
            return temps;
        };
        this.readInputs = () => __awaiter(this, void 0, void 0, function* () {
            // Sample the connected input sensor
            // ADS 1115 via i2c
            // native i2c sensors
            this.inputs = {
                temps: this.readTemps(),
            };
        });
        this.computeOutputs = () => __awaiter(this, void 0, void 0, function* () {
            const calcLight = () => {
                const now = new Date();
                return now.getHours() > 12;
            };
            this.outputs = {
                pump: true,
                light: calcLight()
            };
        });
        this.writeOutputs = () => __awaiter(this, void 0, void 0, function* () {
            console.log('writing OUT');
        });
        this.nextCycle = (lastCycleTime = 0) => {
            if (this.enableRun) {
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        console.clear();
                        const start = new Date();
                        yield this.cycle();
                        this.cycleCount++;
                        const end = new Date();
                        const cycleTime = end.getTime() - start.getTime();
                        console.log(`Cycle ${this.cycleCount} ran in ${cycleTime}ms`);
                        this.nextCycle(cycleTime);
                    }
                    catch (e) {
                        console.log(`Cycle ${this.cycleCount} crashed`, e);
                    }
                }), this.cycleInterval - lastCycleTime);
            }
        };
        this.cycle = () => __awaiter(this, void 0, void 0, function* () {
            yield this.readInputs();
            yield this.computeOutputs();
            yield this.writeOutputs();
        });
        this.settings = settings;
    }
}
exports.Controller = Controller;
//# sourceMappingURL=index.js.map