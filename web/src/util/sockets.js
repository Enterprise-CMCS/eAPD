
import {apiUrl} from './api'

const socketUrl = apiUrl.replace('http://', 'ws://').replace('https://', 'wss://')
let webSocket
export const subscribeToJoins = () =>{
  console.log(socketUrl)
  if (!webSocket) {
    webSocket = new WebSocket(`${socketUrl}/join`)
  }
  webSocket.onmessage = function (event) {
    console.log(event.data);
  }
  webSocket.send(JSON.stringify({event:'joinEvent', data:{user:"knoll"}}))
  return webSocket

}
