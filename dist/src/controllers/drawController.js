"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrawController = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
const commands_1 = require("../constants/commands");
class DrawController {
    constructor() {
        this.drawCircle = (radius) => {
            const mousePos = robotjs_1.default.getMousePos();
            robotjs_1.default.mouseToggle('down');
            for (let i = 0; i <= Math.PI * 2; i += 0.01) {
                const x = mousePos.x + (radius * Math.cos(i) - radius);
                const y = mousePos.y + (radius * Math.sin(i));
                robotjs_1.default.dragMouse(x, y);
            }
            ;
            robotjs_1.default.mouseToggle('up');
            return `${commands_1.COMMANDS.draw_circle} \0`;
        };
        this.drawRectangle = (width, height) => {
            const firstMousePosition = robotjs_1.default.getMousePos();
            const secondPositionX = firstMousePosition.x + width;
            const secondPositionY = firstMousePosition.y + height;
            robotjs_1.default.mouseToggle('down');
            robotjs_1.default.moveMouseSmooth(secondPositionX, firstMousePosition.y);
            robotjs_1.default.moveMouseSmooth(secondPositionX, secondPositionY);
            robotjs_1.default.moveMouseSmooth(firstMousePosition.x, secondPositionY);
            robotjs_1.default.moveMouseSmooth(firstMousePosition.x, firstMousePosition.y);
            robotjs_1.default.mouseToggle('up');
            return `${commands_1.COMMANDS.draw_rectangle} \0`;
        };
        this.drawSquare = (size) => {
            const firstMousePosition = robotjs_1.default.getMousePos();
            const secondPositionX = firstMousePosition.x + size;
            const secondPositionY = firstMousePosition.y + size;
            robotjs_1.default.mouseToggle('down');
            robotjs_1.default.moveMouseSmooth(secondPositionX, firstMousePosition.y);
            robotjs_1.default.moveMouseSmooth(secondPositionX, secondPositionY);
            robotjs_1.default.moveMouseSmooth(firstMousePosition.x, secondPositionY);
            robotjs_1.default.moveMouseSmooth(firstMousePosition.x, firstMousePosition.y);
            robotjs_1.default.mouseToggle('up');
            return `${commands_1.COMMANDS.draw_square} \0`;
        };
    }
}
exports.DrawController = DrawController;
;
