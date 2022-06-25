import { httpServer } from './src/http_server/index';
import { WebSocketServer, createWebSocketStream } from 'ws';
import { CommandHandler } from './src/untils/commandHandler';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Web socket connected on ws://localhost:8080!');

    const wsStream = createWebSocketStream(ws, { encoding: 'utf-8', decodeStrings: false });
    const commandHandler = new CommandHandler();

    wsStream.on('data', async (command) => {
        try {
            const response = await commandHandler.handleCommand(command);
            wsStream.write(response, 'utf-8');
            console.log(`Command ${command} complete!`);
        } catch {
            console.log(`Command ${command} failed!`);
        }
    });

    wsStream.on('error', (err) => {
        console.log(err);
        wsStream.destroy();
    });

    ws.on('close', () => {
        wss.close();
        console.log('Web socket connection was closed!');
    })
});

wss.on('close', () => {
    console.log('Web socket server was disconnected!');
});
