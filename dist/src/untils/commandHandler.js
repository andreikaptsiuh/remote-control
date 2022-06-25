"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const mouseController_1 = require("../controllers/mouseController");
const drawController_1 = require("../controllers/drawController");
const printController_1 = require("../controllers/printController");
const commands_1 = require("../constants/commands");
class CommandHandler {
    constructor() {
        this.handleCommand = (command) => __awaiter(this, void 0, void 0, function* () {
            const commandArg = this._getCommandArguments(command);
            const commandWithoutArg = command.split(' ')[0];
            switch (commandWithoutArg) {
                case commands_1.COMMANDS.mouse_up:
                    return this.mouseController.mouseUp(commandArg);
                case commands_1.COMMANDS.mouse_down:
                    return this.mouseController.mouseDown(commandArg);
                case commands_1.COMMANDS.mouse_left:
                    return this.mouseController.mouseLeft(commandArg);
                case commands_1.COMMANDS.mouse_right:
                    return this.mouseController.mouseRight(commandArg);
                case commands_1.COMMANDS.mouse_position:
                    return this.mouseController.sendMousePosition();
                case commands_1.COMMANDS.draw_circle:
                    return this.drawController.drawCircle(commandArg);
                case commands_1.COMMANDS.draw_rectangle:
                    if (!Array.isArray(commandArg))
                        return;
                    const width = commandArg[0];
                    const height = commandArg[1];
                    return this.drawController.drawRectangle(width, height);
                case commands_1.COMMANDS.draw_square:
                    return this.drawController.drawSquare(commandArg);
                case commands_1.COMMANDS.prnt_scrn:
                    return yield this.printController.printScreen();
                default:
                    break;
            }
        });
        this._getCommandArguments = (command) => {
            const commandWithArgs = command.split(' ');
            if (commandWithArgs.length === 1) {
                return null;
            }
            else if (commandWithArgs.length === 2) {
                return +commandWithArgs[1];
            }
            else {
                commandWithArgs.splice(0, 1);
                const commandArgs = commandWithArgs.map((item) => Number(item));
                return commandArgs;
            }
            ;
        };
        this.mouseController = new mouseController_1.MouseController();
        this.drawController = new drawController_1.DrawController();
        this.printController = new printController_1.PrintController();
    }
    ;
}
exports.CommandHandler = CommandHandler;
;
