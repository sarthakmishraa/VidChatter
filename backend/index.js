import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

const frontend_url = process.env.FE_URL || "http://localhost:3000";

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`User with id: ${socket.id} connected`);
    socket.emit("me", socket.id);
    
    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
        console.log(`User with id: ${socket.id} disconnected`);
    });
    
    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("screenShare", (data) => {
        io.to(data.to).emit("screenShared", data.signal);
    });
});

app.get("/", (req, res) => {
    res.send("<h2>VidChatter BE</h2>");
});

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});