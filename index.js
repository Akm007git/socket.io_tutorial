
const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app); // for creating server using http

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// initialysing the socket
const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile("index")
})

// socket io use

io.on("connection", (socket) => {
    console.log("a user connected : " + socket.id);

    // here the key:value should be same as frontend
    socket.on("user-message", (messege) => {
        console.log("receving in server & sending back to all client: " + messege);  // Logging the message in console
        io.emit("server-messege", messege);  // Emitting message to all connected clients

    })
})


server.listen(3000, () => {
    console.log("Server is running on port 3000");  // Server is listening on port 3000
})


