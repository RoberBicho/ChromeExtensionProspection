document.addEventListener('DOMContentLoaded', function () {

    chrome.tabs.query({currentWindow: true, active: true},
        function (tabs){
            chrome.tabs.sendMessage(tabs[0].id, 'Hi', setUrl)
        })
    

    function setUrl(res) {
        ////Correspondiente a si creáramos un elemento nuevo en el body, pero yo lo quiero substituir
        const setTitle = document.getElementById("pageTitle").value = `${res.title}`
        const setUrl = document.getElementById("pageURL").value = `${res.url}`
        //setUrl.textContent = `${res.urlTab}`
    }

// Enviamos la marca evaluada a webhook inteegromat
    document.getElementById('save').addEventListener('click', onclickSave, false)
    document.getElementById('check').addEventListener('click', onclickCheck, false)

    function onclickSave () {


        //chrome.tabs.sendMessage(tab.id, { action: 'sendMessage' });

        const hostname = document.getElementById("pageURL").value;
        const pagetitle = document.getElementById("pageTitle").value;
        const store = document.getElementById('stores').value;
        const details = document.getElementById('details').value;
        const cms = document.getElementById('cms').value;

        let webhook = 'https://hook.integromat.com/48ygf95wq3avkssl5x9otilurqgx5iya'
        let data = {"hostname": `${hostname}`, 
                    "pageTitle": `${pagetitle}`, 
                    "author": 'Roberto',
                    "store":`${store}`,
                    "details": `${details}`,
                    "cms": `${cms}`
                    }
    
        fetch(webhook, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json; charset=utf-8'
                     },
                body: JSON.stringify(data)

            }).then(function(response) {
                // The response is a Response instance.
                // You parse the data into a useable format using `.json()`
                return response.json();
              }).then(function(data) {
                // `data` is the parsed version of the JSON returned from the above endpoint.
                console.log(data);
                message(data)
              })
    }

    function onclickCheck() {

        const hostname = document.getElementById("pageURL").value;

        let webhook = 'https://hook.integromat.com/48ygf95wq3avkssl5x9otilurqgx5iya'
        let data = {"hostname": `${hostname}`, "check": "revisar"}
        
        fetch(webhook, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json; charset=utf-8'
                 },
            body: JSON.stringify(data)
        }).then(function(response) {
            // The response is a Response instance.
            // You parse the data into a useable format using `.json()`
            return response.json();
          }).then(function(data) {
            // `data` is the parsed version of the JSON returned from the above endpoint.
            console.log(data);
            message(data)
          })
        
    }


    function onclickHubspot() {

    }

    function message(data) {
        if(data.status) {
            document.getElementById('message').innerHTML = `${data.message}`
            document.getElementById('message').classList.remove("messageHide");
            document.getElementById('message').classList.add("messageBlock");   
        }
          if(!data.status) {
            document.getElementById('message').innerHTML = `${data.message}`
            document.getElementById('message').classList.remove("messageHide");
            document.getElementById('message').classList.add("messageBlock");
        }
    }


},false)
