const socketIo = require('socket.io')

const registerJoinHandlers = require("./joinHandler");
// const registerUserHandlers = require("./userHandler");

const options = {
  cors:{ credentials: true, origin: true }

};
module.exports = (
  server
) =>{
  const io = socketIo(server, options)
  io.on("connection", (socket) => {
    console.log('got a socket connection')
    socket.onAny((event) => {
      console.log(`got ${event}`);
    });

    registerJoinHandlers(io, socket)
  } );

  return io

}
