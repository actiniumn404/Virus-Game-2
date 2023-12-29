class Workspace{
    constructor(id) {
        this.id = id

        this.iframe = document.createElement("iframe")
        this.iframe.src = `apps/${id}/app.html`
        this.iframe.tabIndex = "0"
        this.iframe.classList.add("workspace")
        document.getElementById("workspace").appendChild(this.iframe)
        this.iframe.width = 680
        this.iframe.height = 600
    }

    handleMessage(event){
        if (event.source !== this.iframe.contentWindow){
            return;
        }
        if (event.data.action === "CLOSE"){
            this.iframe.remove()
            OS.apps.workspaces.splice(OS.apps.workspaces.indexOf(this), 1); // js remove
        }
        if (event.data.actionbar){
            document.getElementById("navbar__customize").innerHTML = ""
            document.getElementById("navbar__customize").innerHTML += `<div class="navbar__btn header" tabindex="0">${event.data.name}</div>`
            for (let tab in event.data.actionbar){
                document.getElementById("navbar__customize").innerHTML += `<div class="navbar__btn" tabindex="0" data-name="${tab}">${tab}</div>`
            }
        }

    }
}

OS = {
    dock: {
        grow: 2,
        deviation: 150,
        normal_const: (1 / (150 * Math.sqrt(2 * Math.PI))),
        resize: (x)=>{
            document.querySelectorAll(".dock__app img").forEach((element)=>{
                let dist = Math.abs(x - (element.getBoundingClientRect().x + element.offsetWidth/2))
                let scale = 1 + 150 * (OS.dock.normal_const *
                    Math.pow(2.7182, -0.5*(dist/OS.dock.deviation * dist/OS.dock.deviation))) // approx for E
                element.style.width = scale * 60 + "px"
                element.style.height = scale * 60 + "px"
                element.setAttribute("data-size", scale * 60 + "px")
            })
        }
    },
    apps: {
        workspaces: [],
        open: (id)=>{
            OS.apps.workspaces.push(new Workspace(id))
        },
        handleMessage: (event) =>{
            for (let workspace of OS.apps.workspaces){
                workspace.handleMessage(event)
            }
        }
    }
}

$("#dock").mousemove((e)=>{
    OS.dock.resize(e.clientX)
})

$(".dock__app").click((e)=>{
    OS.apps.open($(e.currentTarget).data("app"))
})

window.addEventListener("load", ()=>{
    OS.apps.open("Finder")
})

window.addEventListener(
    "message",
    (event) => {
        OS.apps.handleMessage(event)
    }
);
