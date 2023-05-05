
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');
 
const socket = io();

socket.on('connect', () => {

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('enviar-mensaje', ( payload ) => {

    
});

socket.on('disconnect', () => {

    lblOffline.style.display = '';
    lblOnline.style.display = 'none';
});

btnEnviar.addEventListener( 'click', () => {

    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id : '1234123',
        fecha: new Date().getTime()
    }

    socket.emit('enviar-mensaje', payload );
});