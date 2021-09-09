import io from 'socket.io-client';
import {apiUrl} from './api'

let socket;

export const subscribeToJoins = cb =>{
  if (!socket) return (true);
  console.log('listening for room joins')
  socket.on('join', msg => {
    console.log('Websocket join received!');
    console.log(msg)
    if (cb){
      return cb(null, msg);
    }
    return null
  });
  return null
}

// start by initiating the Socket
export const initiateSocket = () => {
  if (!socket) {
    socket = io(`${apiUrl}`);
  }
};

// Join a room to receive updates from this room
export const joinRoom = (room, listeners) =>{
  if (!socket) {
    initiateSocket()
  }

  // configure listeners
  socket.on('join', (data) =>{
    console.log('Got a join event')
    console.log(data)
  })

  // idk why I did this, it made sense in the moment
  if (typeof listeners === 'object'){
    Object.entries(listeners).forEach(entry => {
      const [key, value] = entry
      socket.on(key, data => {
        console.log(`got an event: ${key}`)
        value(data)
      })
    })
  }

  // Tell the server to join the room
  socket.emit('join', {room})

}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
};
export const subscribeToChat = (cb) => {
  if (!socket) return (true);
  socket.on('chat', msg => {
    console.log('Websocket event received!');
    return cb(null, msg);
  });
  return null
};


export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', { message, room });
};


