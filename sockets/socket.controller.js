//!MANEJO DE EVENTOS

const socketController = (cliente) => {
  console.log("cliente conectado", cliente.id);

  //Se activa cada vez que un cliente se desconecta del servidor
  cliente.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  //Se activa cada vez que el cliente envíe un mensaje con el nombre enviar mensaje
  //El payload son los datos enviados por el cliente
  //Callback es la respuesta del servidor al front (Confirmación del lado sel servidor)
  cliente.on("enviar-mensaje", (payload, callback) => {
    const id = "Mensaje_Enviado";
    callback(id);
    //EMITE EVENTO permite que el mensaje sea recibido por los demás clientes conectados
    //broadcast permite que el cliente que envia el evento no lo vuelva a recibir
    cliente.broadcast.emit("enviar-mensaje", payload);

    console.log("En el server desde el front", payload);
  });
};

module.exports = { socketController };
