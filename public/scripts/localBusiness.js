if(window.location.pathname === "/upload"){
    let tabs = document.getElementsByClassName("tab-item");
    for(let i = 0; i<tabs.length; i++){
        if(tabs[i].className === "tab-item active"){
            if(tabs[i].children[0].innerText === "Subir"){
                tabs[i].children[0].innerText = "👩🏽‍💼 Subir"

            }
        }
    }
}
else if(window.location.pathname === "/business"){
    let tabs = document.getElementsByClassName("tab-item");
    for(let i = 0; i<tabs.length; i++){
        if(tabs[i].className === "tab-item active"){
            if(tabs[i].children[0].innerText === "Negocios"){
                tabs[i].children[0].innerText = "🏪 Negocios"
            }
        }
    }
}
else if(window.location.pathname === "/explore"){
    let tabs = document.getElementsByClassName("tab-item");
    for(let i = 0; i<tabs.length; i++){
        if(tabs[i].className === "tab-item active"){
            if(tabs[i].children[0].innerText === "Explorar Nuevos Mercados"){
                tabs[i].children[0].innerText = "🌎 Explorar Nuevos Mercados"
            }
        }
    }
}
