// ---> Comunicacion con WEBSOCKET

const template = () => `
    <div>
        <div>
            <input type="text" id="mensaje" />
        </div>
        <div>
            <button id="enviar">
                Enviar
            </button>
        </div>
        <span>
            <p class="pOnline">Online</p>
            <p class="pOffline">Offline</p>
        </span>
    </div>
    `;

const printTemplate = () => {
  const app = document.querySelector("main");
  app.innerHTML = template();
};

printTemplate();

const textoMensaje = document.getElementById("mensaje");
const btnEnviar = document.getElementById("enviar");
const pOnline = document.querySelector(".pOnline");
const pOffline = document.querySelector(".pOffline");

// Este IO conecta con el script
const socket = io();

// Escuchadores del cliente -> Reciben evento
socket.on("connect", () => {
  pOnline.style.display = "block";
  pOffline.style.display = "none";
});

socket.on("disconnect", () => {
  pOnline.style.display = "none";
  pOffline.style.display = "block";
});

//Escuchador del evento enviar mensaje --> clientes reciben evento
socket.on("enviar-mensaje", (payload) => {
  console.log("En el front", payload);
});

//Evento que envia mensaje al servidor
btnEnviar.addEventListener("click", () => {
  const mensaje = textoMensaje.value;
  const payload = {
    mensaje,
    id: "1234",
    fecha: new Date().getTime(),
  };

  // Emitimos el evento
  socket.emit("enviar-mensaje", payload, (id) => {
    //Se ejecuta al insertar el callback en el controller
    console.log("Desde el server", payload);
  });
});
