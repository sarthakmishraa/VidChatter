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
    socket.emit("me", socket.id);
    
    socket.on("disconnect", () => {
        socket.broadcast.emit("callEnded");
    });

    socket.on("joinRoom", (roomId) => {
        socket.join(roomId);
    });

    socket.on("sendMessage", (data) => {
        socket.to(data.roomId).emit("receivedMessage", data);
    });
});

app.get("/", (req, res) => {
    res.send("<h2>VidChatter BE</h2>");
});

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});