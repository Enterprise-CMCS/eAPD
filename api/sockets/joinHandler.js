module.exports = (expressWs, socket, req) => {
  // eslint-disable-next-line no-param-reassign
  socket.room = 'join'
  socket.on('message', msg => {

    const msgJson = JSON.parse(msg)
    switch (msgJson.event){
      case 'joinEvent':
        expressWs.getWss().clients.forEach((client)=>{
          if (client.room === 'join') {
            client.send(JSON.stringify(msgJson.data));
          }
        })
        break

      case 'newAPD':
        expressWs.getWss().clients.forEach((client)=>{
          if (client.room === 'join') {
            client.send(JSON.stringify({event:'newAPD', data:{foo:'bar'}}));
          }
        })
        break
      default:
        socket.send('unknown event type')
        
    }
  });
}
