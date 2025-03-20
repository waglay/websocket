import  {createClient}  from 'redis';

const client = createClient({
    url: 'redis://localhost:6379',
    // url: 'redis://redis:6379',
    pingInterval: 5
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect().then(()=>{console.log("redis connected")}).catch((e)=>{
    console.log("error connecting", e)
});


import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
 const io = new Server(server, 
    {
    path: '/',
    cors: {
        origin: "*", // Allow all origins for testing
        methods: ["GET", "POST"]   
        // ,transports: ["websocket"]
    }
        
}
);

// Get instance ID from ENV (default: "1")
const INSTANCE_ID = process.env.INSTANCE_ID || "1";

// Store players per instance
const players = {};

io.on("connection", (socket) => {
    console.log(`✅ Player connected to Instance ${INSTANCE_ID}:`, socket.id);

    // Assign player to instance
    players[socket.id] = { instance: INSTANCE_ID, x: 0, y: 0 };

    // Send instance info to player
    socket.emit("server-info", { instance: INSTANCE_ID });

    // Handle chat messages (fix: don't use "message" event)
    socket.on("chat-message", async (msg) => {
        console.log(`📩 Received message:`, msg);
        socket.emit("server-response", `🔄 Echo from Instance ${INSTANCE_ID}: ${msg}`);
        await client.hSet(msg, {
            name: 'John',
            surname: 'Smith',
            company: 'Redis',
            age: 29
        })
       
    });

    // Handle player movement
    socket.on("move", async (data) => {
        const value = await client.hGetAll(data);
        console.log("this is the value from redis: ", value)
        socket.emit("redis", value)
    });

    // Handle disconnect
    socket.on("disconnect", () => {
        console.log(`❌ Player ${socket.id} disconnected from Instance ${INSTANCE_ID}`);
        delete players[socket.id];
    });

    // Handle errors
    socket.on("error", (err) => {
        console.error("🚨 Socket.io error:", err);
    });
});



// Start server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Game Server Instance ${INSTANCE_ID} running on ws://localhost:${PORT}`)
    
);

