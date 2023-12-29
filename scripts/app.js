window.addEventListener("load", ()=>{
    document.getElementById("navbar__close").onclick = ()=>{
        window.parent.postMessage({action: "CLOSE"})
    }

    document.body.addEventListener("focus", ()=>{
        window.parent.postMessage({actionbar: app.actions, name: app.name})
    })
})