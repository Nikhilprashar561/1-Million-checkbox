import http from 'node:http'
import 'dotenv/config'

import { Server } from 'socket.io'
import { app } from './app.js';

async function main(){

    const PORT = process.env.PORT || 3000;

    const httpServer = http.createServer(app);

    const io = new Server();
    io.attach(httpServer);

    httpServer.listen(PORT, () => {
        console.log(`Server Started at PORT No. ${PORT}`)
    })
}

main();
