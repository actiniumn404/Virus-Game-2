window.addEventListener("load", ()=>{
    console.log("successfully loaded")
    document.getElementById("navbar__close").onclick = ()=>{
        window.parent.postMessage({action: "CLOSE"})
    }

    document.body.addEventListener("focus", ()=>{
        window.parent.postMessage({actionbar: app.actions, name: app.name})
    })
})