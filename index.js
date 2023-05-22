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

//MANEJO DE EVENTOS del lado del servidor
//Se activa cada vez que un cliente se conecta al servidor
io.on("connection", (cliente) => {
  console.log("cliente conectado", cliente.id);

  //Se activa cada vez que un cliente se desconecta del servidor
  cliente.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  //Se activa cada vez que el cliente envíe un mensaje con el nombre enviar mensaje
  //El payload son los datos enviados por el cliente
  cliente.on("enviar-mensaje", (payload) => {
    console.log("En el server desde el front", payload);
    cliente.broadcast.emit("enviar-mensaje", payload);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on PORT ${BASE_URL}${PORT}`);
});
