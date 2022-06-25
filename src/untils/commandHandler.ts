import WebSocket from 'ws';
import { Duplex } from 'stream';
import { MouseController } from '../controllers/mouseController';
import { DrawController } from '../controllers/drawController';
import { PrintController } from '../controllers/printController';
import { COMMANDS } from "../constants/commands";

export class CommandHandler {
    private mouseController: MouseController;
    private drawController: DrawController;
    private printController: PrintController;

    constructor() {
        this.mouseController = new MouseController();
        this.drawController = new DrawController();
        this.printController = new PrintController();
    };

    handleCommand = async (command: string) : Promise<void | string> => {
        const commandArg = this._getCommandArguments(command);
        const commandWithoutArg = command.split(' ')[0];

        switch (commandWithoutArg) {
            case COMMANDS.mouse_up:
                return this.mouseController.mouseUp(<number>commandArg);
    
            case COMMANDS.mouse_down:
                return this.mouseController.mouseDown(<number>commandArg);
    
            case COMMANDS.mouse_left:
                return this.mouseController.mouseLeft(<number>commandArg);
    
            case COMMANDS.mouse_right:
                return this.mouseController.mouseRight(<number>commandArg);
    
            case COMMANDS.mouse_position:
                return this.mouseController.sendMousePosition();

            case COMMANDS.draw_circle:
                return this.drawController.drawCircle(<number>commandArg);

            case COMMANDS.draw_rectangle:
                if (!Array.isArray(commandArg)) return;

                const width: number = commandArg[0];
                const height: number = commandArg[1];

                return this.drawController.drawRectangle(width, height);

            case COMMANDS.draw_square:
                return this.drawController.drawSquare(<number>commandArg);

            case COMMANDS.prnt_scrn:
                return await this.printController.printScreen();
        
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
