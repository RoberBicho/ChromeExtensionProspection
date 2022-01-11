 // Esto se entiende que es como se comunica el popup.js con el content.js. Como si fuera un websocket.
 
 chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //alert(window.location.href)
    //const re = new RegExp('tiendas', 'store')
    //const matches = document.documentElement.innerHTML.match(re) || []
    const urlTab = window.location.hostname
    sendResponse({url: urlTab, title: document.title})

    if (request.action === 'sendMessage') {
       alert('Mensaje recibido de popup.js')
    }
 })

 //// Si queremos que este código se ejecute en el background lo quitamos del runtime. Es decir, 
 ////que no dependamos del mensaje que envía popup.js que está configurado para que se abra por defecto en manifest.js.
 //// desde background.js escuchamos el mensaje que manda content.js
//const re = new RegExp('bear', 'gi')
//const matches = document.documentElement.innerHTML.match(re) || []
//
//chrome.runtime.sendMessage({
//  url: window.location.href,
//  count: matches.length
//})








