let events = () => {
    // Tab Selection
    document.querySelectorAll(".tab").forEach(e => {
        e.addEventListener("click", ()=>{
            document.querySelectorAll(".tab").forEach(e => e.classList.remove("selected"))
            e.classList.add("selected")
        })
    })

    document.querySelectorAll(".control_panel__display_mode").forEach(e => {
        e.addEventListener("click", ()=>{
            document.querySelectorAll(".control_panel__display_mode").forEach(e => e.classList.remove("selected"))
            e.classList.add("selected")
        })
    })

    document.querySelectorAll(".item").forEach(e => {
        e.addEventListener("click", ()=>{
            document.querySelectorAll(".item").forEach(e => e.classList.remove("selected"))
            e.classList.add("selected")
        })
    })
}

window.onload = () => {
    events()
}