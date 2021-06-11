
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
                let icon = document.createElement("i");
                icon.className = "material-icons";
                icon.innerText = "home"
                tabs[i].children[0].appendChild(icon)
            }}}
}
else if(window.location.pathname === "/attractions"){
    let tabs = document.getElementsByClassName("tab-item");
    for(let i = 0; i<tabs.length; i++){
        if(tabs[i].className === "tab-item active"){
            if(tabs[i].children[0].innerText === "Attractions"){
                console.log(tabs[i].children[0])
                let icon = document.createElement("i");
                icon.className = "material-icons";
                icon.innerText = "surfing"
                tabs[i].children[0].appendChild(icon)
            }
        }
    }
}
else if(window.location.pathname === "/hottest"){
    let tabs = document.getElementsByClassName("tab-item");
    for(let i = 0; i<tabs.length; i++){
        if(tabs[i].className === "tab-item active"){
            if(tabs[i].children[0].innerText === "Hottest"){
                console.log(tabs[i].children[0])
                let icon = document.createElement("i");
                icon.className = "material-icons";
                icon.innerText = "store"
                tabs[i].children[0].appendChild(icon)
            }
        }
    }
}







// console.log("Hello")
// for(let i =0; i<document.getElementsByClassName("hotelCard").length; i++){
//     let elementList = document.getElementsByClassName("hotelCard");
//     console.log(elementList[0].children)
//     elementList[i].addEventListener(
//         "click",()=>{
//             for(let j =0; j<document.getElementsByClassName("column").length; j++){
//                 console.log(elementList[i].children)
//                 for(let k=0; k<document.getElementsByClassName("column")[j].children.length; k++) {
//
//                     if (document.getElementsByClassName("column")[j].children[k] == "modal") {
//
//                         document.getElementsByClassName("column")[j].children[k].className = "modal active"
//
//                     }
//                 }
//             }
//         }
//     )
// }
