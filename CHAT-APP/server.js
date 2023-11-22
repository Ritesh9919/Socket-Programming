import express from 'express';
import {Server} from 'socket.io';
import cors from 'cors';
import http from 'http';

const app = express();

//1. Create server using http

const server = http.createServer(app);


//2. Create socket server

const io = new Server(server, {
    cors:{
        origin:'*',
        methods:['GET', 'POST']
    }
})



// 3. Use socket event

io.on('connection', (socket)=> {
    console.log('Connection is establise');
    socket.on('disconnect', ()=> {
        console.log('Connection is disconnect');
    })
})



server.listen(3000, ()=> {
    console.log('App is listening on port 3000');
})
