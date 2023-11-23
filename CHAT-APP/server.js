import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import {connectDB} from './config.js';
import {Chat} from './chat.schema.js';

const app = express();

//1. Create server using http

const server = http.createServer(app);

//2. Create socket server

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 3. Use socket event

io.on("connection", (socket) => {
  console.log("Connection is establise");

  socket.on("join", (username) => {
    socket.username = username;
  })

    socket.on("new_message", (message) => {
      
      let userMessage = {
        username: socket.username,
        message: message,
      };

      // Storing chat in database

      const newChat = new Chat({
        username:socket.username,
        message:message,
        timestamp:new Date()
      });
      newChat.save()

      // broadcasting this message to all the clients

      socket.broadcast.emit("broadcast_message", userMessage);
    });
  
  socket.on("disconnect", () => {
    console.log("Connection is disconnect");
  });
});

server.listen(3000, () => {
  console.log("App is listening on port 3000");
  connectDB();
});
