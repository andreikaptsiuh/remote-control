import WebSocket from 'ws';
import { MouseController } from '../controllers/mouseController';
import { COMMANDS } from "../constants/commands";

export class CommandHandler {
    private mouseController: MouseController;

    constructor(ws: WebSocket.WebSocket) {
        this.mouseController = new MouseController(ws);
    };

    handleCommand = (command: string, ws: WebSocket.WebSocket) : void => {
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
            const commandArgs = commandWithArgs.splice(0, 1).map((item) => +item);
            return commandArgs;
        };
    };
};
