// src/websocket.js
// when app is in develpment mode (npm start) then we set the h
//host to localhst:8080
// when app is in production mode (npm run build)
// then the host is the current browser host

const host = process.env.Node_ENV === 'production' ? window.location.host : 'localhost:8080'
export let send
// onMessageCallback is assigned later and
//the let'send' 
let onMessageCallback   
export const startWebsocketConnection = () => {
    // websocket connection to server
    const ws =new window.WebSocket('ws://' + host + '/chat') || {}

    // successful opened cnnection , log the console
    ws.onopen = () => {
        console.log('opened ws connection')
    }
    ws.onclose = (e) => {
        console.log(' close ws connection:', e.code,e.reason)
    }
    // this callback is called everytime a message is recieved. 
    ws.onmessage = (e) => {
        // onMessageCallback function is caled with the message.
        onMessageCallback && onMessageCallback(e.data)
    }
    send=ws.send.bind(ws)
}

// react application registers a callback that needs to be called when a message is recieved. 
export const registerOnmessageCallback = (fn) => {
    onMessageCallback = fn
}
