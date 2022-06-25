import robot from 'robotjs';
import { COMMANDS } from '../constants/commands';

export class MouseController {
    mouseUp = (step: number): string => {
        const currentMousePosition = robot.getMousePos();
        robot.moveMouse(currentMousePosition.x, currentMousePosition.y - step);

        return `${COMMANDS.mouse_up} \0`;
    };

    mouseDown = (step: number) => {
        const currentMousePosition = robot.getMousePos();
        robot.moveMouse(currentMousePosition.x, currentMousePosition.y + step);

        return `${COMMANDS.mouse_down} \0`;
    };

    mouseLeft = (step: number) => {
        const currentMousePosition = robot.getMousePos();
        robot.moveMouse(currentMousePosition.x - step, currentMousePosition.y);

        return `${COMMANDS.mouse_left} \0`;
    };

    mouseRight = (step: number) => {
        const currentMousePosition = robot.getMousePos();
        robot.moveMouse(currentMousePosition.x + step, currentMousePosition.y);

        return `${COMMANDS.mouse_right} \0`;
    };

    sendMousePosition = () => {
        const mousePosition = robot.getMousePos();
        const wsMessage = `${COMMANDS.mouse_position} ${mousePosition.x},${mousePosition.y} \0`;

        return wsMessage;
    };
};
