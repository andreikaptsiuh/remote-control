import robot from 'robotjs';
import WebSocket from 'ws';
import { COMMANDS } from '../constants/commands';

export class DrawController {
    private ws: WebSocket.WebSocket;

    constructor(ws: WebSocket.WebSocket) {
        this.ws = ws;
    };

    drawCircle = (radius: number) => {
        const mousePos = robot.getMousePos();
        robot.mouseToggle('down');

        for (let i = 0; i <= Math.PI * 2; i += 0.01) {
            const x = mousePos.x + (radius * Math.cos(i) - radius);
            const y = mousePos.y + (radius * Math.sin(i));
            
            robot.dragMouse(x, y);    
        };

        robot.mouseToggle('up');

        this.ws.send(`${COMMANDS.draw_circle} \0`);
    };

    drawRectangle = (width: number, height: number) => {
        const firstMousePosition = robot.getMousePos();
        const secondPositionX = firstMousePosition.x + width;
        const secondPositionY = firstMousePosition.y + height;

        robot.mouseToggle('down');
        robot.moveMouseSmooth(secondPositionX, firstMousePosition.y);
        robot.moveMouseSmooth(secondPositionX, secondPositionY);
        robot.moveMouseSmooth(firstMousePosition.x, secondPositionY);
        robot.moveMouseSmooth(firstMousePosition.x, firstMousePosition.y);
        robot.mouseToggle('up');

        this.ws.send(`${COMMANDS.draw_rectangle} \0`);
    };

    drawSquare = (size: number) => {
        const firstMousePosition = robot.getMousePos();
        const secondPositionX = firstMousePosition.x + size;
        const secondPositionY = firstMousePosition.y + size;

        robot.mouseToggle('down');
        robot.moveMouseSmooth(secondPositionX, firstMousePosition.y);
        robot.moveMouseSmooth(secondPositionX, secondPositionY);
        robot.moveMouseSmooth(firstMousePosition.x, secondPositionY);
        robot.moveMouseSmooth(firstMousePosition.x, firstMousePosition.y);
        robot.mouseToggle('up');

        this.ws.send(`${COMMANDS.draw_square} \0`);
    };
};
