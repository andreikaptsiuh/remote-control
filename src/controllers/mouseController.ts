import robot from 'robotjs';
import WebSocket from 'ws';
import { COMMANDS } from '../constants/commands';

export class MouseController {
    ws: WebSocket.WebSocket;

    constructor(ws: WebSocket.WebSocket) {
        this.ws = ws;
    };

    mouseUp = (step: number) => {
        const currentMousePosition = robot.getMousePos();
        robot.moveMouse(currentMousePosition.x, currentMousePosition.y - step);

        this.ws.send(`${COMMANDS.mouse_up} \0`);
    };

    mouseDown = (step: number) => {
        const currentMousePosition = robot.getMousePos();
        robot.moveMouse(currentMousePosition.x, currentMousePosition.y + step);

        this.ws.send(`${COMMANDS.mouse_down} \0`);
    };

    mouseLeft = (step: number) => {
        const currentMousePosition = robot.getMousePos();
        robot.moveMouse(currentMousePosition.x - step, currentMousePosition.y);

        this.ws.send(`${COMMANDS.mouse_left} \0`);
    };

    mouseRight = (step: number) => {
        const currentMousePosition = robot.getMousePos();
        robot.moveMouse(currentMousePosition.x + step, currentMousePosition.y);

        this.ws.send(`${COMMANDS.mouse_right} \0`);
    };

    sendMousePosition = () => {
        const mousePosition = robot.getMousePos();
        const wsMessage = `${COMMANDS.mouse_position} ${mousePosition.x},${mousePosition.y} \0`;

        this.ws.send(wsMessage);
    };
};
