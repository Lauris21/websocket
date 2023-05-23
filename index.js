const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;

const app = express();

// Configuramos la ruta donde esta el index.html para poder acceder a él desde el navegador
app.use(express.static("public"));

const server = require("http").createServer(app);

const cors = require("cors");

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//Directorio público para establecer clientes
const io = require("socket.io")(server);
const { socketController } = require("./sockets/socket.controller");

//MANEJO DE EVENTOS del lado del servidor
//Se activa cada vez que un cliente se conecta al servidor
io.on("connection", socketController);

server.listen(PORT, () => {
  console.log(`Listening on PORT ${BASE_URL}${PORT}`);
});
