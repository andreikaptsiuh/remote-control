"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./src/http_server/index");
const ws_1 = require("ws");
const commandHandler_1 = require("./src/untils/commandHandler");
const HTTP_PORT = 3000;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
index_1.httpServer.listen(HTTP_PORT);
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on('connection', (ws) => {
    console.log('Web socket connected on ws://localhost:8080!');
    const wsStream = (0, ws_1.createWebSocketStream)(ws, { encoding: 'utf-8', decodeStrings: false });
    const commandHandler = new commandHandler_1.CommandHandler();
    wsStream.on('data', (command) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield commandHandler.handleCommand(command);
        wsStream.write(response, 'utf-8');
    }));
    wsStream.on('error', (err) => {
        console.log(err);
        wsStream.destroy();
    });
    ws.on('close', () => {
        wss.close();
        console.log('Web socket connection was closed!');
    });
});
wss.on('close', () => {
    console.log('Web socket server was disconnected!');
});
