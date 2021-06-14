
//Get the hotels modal id
if(window.location.pathname === "/hotels") {
    document.getElementById("hotelModal-id").addEventListener(
        "click", () => {
            document.getElementById("modal-id").className = "modal active"
        }
    )
    document.getElementById("close-id").addEventListener(
        "click", () => {
            document.getElementById("modal-id").className = "modal"
        }
    )


//Get the second hotels modal id
    document.getElementById("hotelModal2-id").addEventListener(
        "click", () => {
            document.getElementById("modal2-id").className = "modal active"
        }
    )
    document.getElementById("close2-id").addEventListener(
        "click", () => {
            document.getElementById("modal2-id").className = "modal"
        }
    )


    document.getElementById("hotelModal3-id").addEventListener(
        "click", () => {
            document.getElementById("modal3-id").className = "modal active"
        }
    )
    document.getElementById("close3-id").addEventListener(
        "click", () => {
            document.getElementById("modal3-id").className = "modal"
        }
    )

    document.getElementById("hotelModal4-id").addEventListener(
        "click", () => {
            document.getElementById("modal4-id").className = "modal active"
        }
    )
    document.getElementById("close4-id").addEventListener(
        "click", () => {
            document.getElementById("modal4-id").className = "modal"
        }
    )

    document.getElementById("hotelModal5-id").addEventListener(
        "click", () => {
            document.getElementById("modal5-id").className = "modal active"
        }
    )
    document.getElementById("close5-id").addEventListener(
        "click", () => {
            document.getElementById("modal5-id").className = "modal"
        }
    )
    let tabs = document.getElementsByClassName("tab-item");
    for(let i = 0; i<tabs.length; i++){
        console.log(tabs[i])
        if(tabs[i].className === "tab-item active"){
            if(tabs[i].children[0].innerText === "Hotel"){
                tabs[i].children[0].innerText = "🏨 Hotel"
            }}}
}
else if(window.location.pathname === "/attractions"){
    let tabs = document.getElementsByClassName("tab-item");
    for(let i = 0; i<tabs.length; i++){
        if(tabs[i].className === "tab-item active"){
            if(tabs[i].children[0].innerText === "Attractions"){
                tabs[i].children[0].innerText = "🏄‍♀ Attractions"

            }
        }
    }
}
else if(window.location.pathname === "/hottest"){
    let tabs = document.getElementsByClassName("tab-item");
    for(let i = 0; i<tabs.length; i++){
        if(tabs[i].className === "tab-item active"){
            if(tabs[i].children[0].innerText === "Hottest"){
                tabs[i].children[0].innerText = "🔥 Hottest"
            }
        }
    }
}
else if(window.location.pathname === "/tourist"){
    let tabs = document.getElementsByClassName("tab-item");
    for(let i = 0; i<tabs.length; i++){
        if(tabs[i].className === "tab-item active"){
            if(tabs[i].children[0].innerText === "Tourist"){
                tabs[i].children[0].innerText = "🧭 Tourist"
            }
        }
    }
}

