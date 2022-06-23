import Jimp from 'jimp/es';
import robot from 'robotjs';
import WebSocket from 'ws';
import { COMMANDS } from '../constants/commands';


export class PrintController {
    private ws: WebSocket.WebSocket;
    
    constructor(ws: WebSocket.WebSocket) {
        this.ws = ws;
    };

    printScreen = async (): Promise<void> => {
        const mousePosition = robot.getMousePos()

        const screen = robot.screen.capture(mousePosition.x, mousePosition.y + 100, 200, 200);
        const image = new Jimp({
            width:200,
            height: 200,
            data: screen.image
        });

        const base64 = await image.getBase64Async(Jimp.MIME_PNG);
        const base64WithoutHeader= base64.toString().split(',')[1];

        this.ws.send(`${COMMANDS.prnt_scrn} ${base64WithoutHeader} \0`);
    };
};
