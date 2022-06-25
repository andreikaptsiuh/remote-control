import Jimp from 'jimp/es';
import robot from 'robotjs';
import { COMMANDS } from '../constants/commands';


export class PrintController {
    printScreen = async (): Promise<string> => {
        const mousePosition = robot.getMousePos();

        const screen = robot.screen.capture(mousePosition.x, mousePosition.y + 100, 200, 200);
        const width = screen.byteWidth / screen.bytesPerPixel; // screen.width is sometimes wrong!
        const height = screen.height;
        const image = new Jimp(width, height);

        let red: any;
        let green: any;
        let blue: any;
        
        screen.image.forEach((byte: any, i: any) => {
            switch (i % 4) {
                case 0: return blue = byte
                case 1: return green = byte
                case 2: return red = byte
                case 3: 
                    image.bitmap.data[i - 3] = red;
                    image.bitmap.data[i - 2] = green;
                    image.bitmap.data[i - 1] = blue;
                    image.bitmap.data[i] = 255;
            };
        });

        const base64 = await image.getBase64Async(Jimp.MIME_PNG);
        const base64WithoutHeader= base64.toString().split(',')[1];

        return `${COMMANDS.prnt_scrn} ${base64WithoutHeader} \0`;
    };
};
