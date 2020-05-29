"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const controller_1 = require("./controller");
const express_1 = __importDefault(require("express"));
const controller = new controller_1.Controller(config_1.settings);
const app = express_1.default();
const port = 3000;
app.get('/', (req, res) => {
    res.send('The he antelope!');
});
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map