import { httpServer } from './src/http_server/index';
import { WebSocketServer } from 'ws';
import { CommandHandler } from './src/untils/commandHandler';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Web socket connected on ws://localhost:8080!');

    const commandHandler = new CommandHandler(ws);

    ws.on('message', (data) => {
        const command = data.toString();
        commandHandler.handleCommand(command, ws);
    });

    ws.on('close', () => {
        wss.close();
        console.log('Web socket connection was closed!');
    })
});

wss.on('close', () => {
    console.log('Web socket server was disconnected!');
});
