import robot from 'robotjs';
import WebSocket from 'ws';
import { COMMANDS } from '../constants/commands';

export class MouseController {
    robot: typeof robot;
    ws: WebSocket.WebSocket;

    constructor(ws: WebSocket.WebSocket) {
        this.robot = robot;
        this.ws = ws;
    };

    mouseUp = (step: number) => {
        const currentMousePosition = robot.getMousePos();
        robot.moveMouse(currentMousePosition.x, currentMousePosition.y - step);

        this.ws.send(COMMANDS.mouse_up);
    };

    mouseDown = (step: number) => {
        const currentMousePosition = robot.getMousePos();
        robot.moveMouse(currentMousePosition.x, currentMousePosition.y + step);

        this.ws.send(COMMANDS.mouse_down);
    };

    mouseLeft = (step: number) => {
        const currentMousePosition = robot.getMousePos();
        robot.moveMouse(currentMousePosition.x - step, currentMousePosition.y);

        this.ws.send(COMMANDS.mouse_left);
    };

    mouseRight = (step: number) => {
        const currentMousePosition = robot.getMousePos();
        robot.moveMouse(currentMousePosition.x + step, currentMousePosition.y);

        this.ws.send(COMMANDS.mouse_right);
    };

    sendMousePosition = () => {
        const mousePosition = robot.getMousePos();
        const wsMessage = `${COMMANDS.mouse_position} ${mousePosition.x},${mousePosition.y}`;

        this.ws.send(wsMessage);
    };
};
