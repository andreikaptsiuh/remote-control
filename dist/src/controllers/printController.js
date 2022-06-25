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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintController = void 0;
const es_1 = __importDefault(require("jimp/es"));
const robotjs_1 = __importDefault(require("robotjs"));
const commands_1 = require("../constants/commands");
class PrintController {
    constructor() {
        this.printScreen = () => __awaiter(this, void 0, void 0, function* () {
            const mousePosition = robotjs_1.default.getMousePos();
            const screen = robotjs_1.default.screen.capture(mousePosition.x, mousePosition.y + 100, 200, 200);
            const width = screen.byteWidth / screen.bytesPerPixel; // screen.width is sometimes wrong!
            const height = screen.height;
            const image = new es_1.default(width, height);
            let red;
            let green;
            let blue;
            screen.image.forEach((byte, i) => {
                switch (i % 4) {
                    case 0: return blue = byte;
                    case 1: return green = byte;
                    case 2: return red = byte;
                    case 3:
                        image.bitmap.data[i - 3] = red;
                        image.bitmap.data[i - 2] = green;
                        image.bitmap.data[i - 1] = blue;
                        image.bitmap.data[i] = 255;
                }
                ;
            });
            const base64 = yield image.getBase64Async(es_1.default.MIME_PNG);
            const base64WithoutHeader = base64.toString().split(',')[1];
            return `${commands_1.COMMANDS.prnt_scrn} ${base64WithoutHeader} \0`;
        });
    }
}
exports.PrintController = PrintController;
;
