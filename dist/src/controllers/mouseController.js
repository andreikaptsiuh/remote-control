"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MouseController = void 0;
const robotjs_1 = __importDefault(require("robotjs"));
const commands_1 = require("../constants/commands");
class MouseController {
    constructor() {
        this.mouseUp = (step) => {
            const currentMousePosition = robotjs_1.default.getMousePos();
            robotjs_1.default.moveMouse(currentMousePosition.x, currentMousePosition.y - step);
            return `${commands_1.COMMANDS.mouse_up} \0`;
        };
        this.mouseDown = (step) => {
            const currentMousePosition = robotjs_1.default.getMousePos();
            robotjs_1.default.moveMouse(currentMousePosition.x, currentMousePosition.y + step);
            return `${commands_1.COMMANDS.mouse_down} \0`;
        };
        this.mouseLeft = (step) => {
            const currentMousePosition = robotjs_1.default.getMousePos();
            robotjs_1.default.moveMouse(currentMousePosition.x - step, currentMousePosition.y);
            return `${commands_1.COMMANDS.mouse_left} \0`;
        };
        this.mouseRight = (step) => {
            const currentMousePosition = robotjs_1.default.getMousePos();
            robotjs_1.default.moveMouse(currentMousePosition.x + step, currentMousePosition.y);
            return `${commands_1.COMMANDS.mouse_right} \0`;
        };
        this.sendMousePosition = () => {
            const mousePosition = robotjs_1.default.getMousePos();
            const wsMessage = `${commands_1.COMMANDS.mouse_position} ${mousePosition.x},${mousePosition.y} \0`;
            return wsMessage;
        };
    }
}
exports.MouseController = MouseController;
;
