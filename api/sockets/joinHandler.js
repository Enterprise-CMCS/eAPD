module.exports = (io, socket) => {
  const joinRoom = (payload) => {
    const room = payload.room
    // join this socket to the room
    socket.join(room);
    // emit a join event to the room so everyone knows
    io.to(room).emit('join', `${socket.id} has joined the ${room} room`)
  }

  // register events here
  socket.on("join", joinRoom);
}
