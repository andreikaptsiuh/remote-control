import WebSocket from 'ws';
import { MouseController } from '../controllers/mouseController';
import { DrawController } from '../controllers/drawController';
import { PrintController } from '../controllers/printController';
import { COMMANDS } from "../constants/commands";

export class CommandHandler {
    private mouseController: MouseController;
    private drawController: DrawController;
    private printController: PrintController;

    constructor(ws: WebSocket.WebSocket) {
        this.mouseController = new MouseController(ws);
        this.drawController = new DrawController(ws);
        this.printController = new PrintController(ws);
    };

    handleCommand = async (command: string, ws: WebSocket.WebSocket) : Promise<void> => {
        const commandArg = this._getCommandArguments(command);
        const commandWithoutArg = command.split(' ')[0];

        switch (commandWithoutArg) {
            case COMMANDS.mouse_up:
                this.mouseController.mouseUp(<number>commandArg);
                break;
    
            case COMMANDS.mouse_down:
                this.mouseController.mouseDown(<number>commandArg);
                break;
    
            case COMMANDS.mouse_left:
                this.mouseController.mouseLeft(<number>commandArg);
                break;
    
            case COMMANDS.mouse_right:
                this.mouseController.mouseRight(<number>commandArg);
                break;
    
            case COMMANDS.mouse_position:
                this.mouseController.sendMousePosition();
                break;

            case COMMANDS.draw_circle:
                this.drawController.drawCircle(<number>commandArg);
                break;

            case COMMANDS.draw_rectangle:
                if (!Array.isArray(commandArg)) return;

                const width: number = commandArg[0];
                const height: number = commandArg[1];

                this.drawController.drawRectangle(width, height);
                break;

            case COMMANDS.draw_square:
                this.drawController.drawSquare(<number>commandArg);
                break;

            case COMMANDS.prnt_scrn:
                await this.printController.printScreen();
                break;
        
            default:
                break;
        }
    };

    private _getCommandArguments = (command: string): number | number[] | null => {
        const commandWithArgs = command.split(' ');

        if (commandWithArgs.length === 1) {
            return null;
        } else if (commandWithArgs.length === 2) {
            return +commandWithArgs[1];
        } else {
            commandWithArgs.splice(0, 1);
            const commandArgs = commandWithArgs.map((item) => Number(item));
            return commandArgs as number[];
        };
    };
};
