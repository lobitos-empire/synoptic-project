if (window.location.pathname === "/upload") {
    let tabs = document.getElementsByClassName("tab-item");
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].className === "tab-item active") {
            if (tabs[i].children[0].innerText === "Subir") {
                tabs[i].children[0].innerText = "👩🏽‍💼 Subir"

            }
        }
    }
} else if (window.location.pathname === "/business") {
    let tabs = document.getElementsByClassName("tab-item");
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].className === "tab-item active") {
            if (tabs[i].children[0].innerText === "Negocios") {
                tabs[i].children[0].innerText = "🏪 Negocios"
            }
        }
    }
} else if (window.location.pathname === "/explore") {
    let tabs = document.getElementsByClassName("tab-item");
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].className === "tab-item active") {
            if (tabs[i].children[0].innerText === "Explorar Nuevos Mercados") {
                tabs[i].children[0].innerText = "🌎 Explorar Nuevos Mercados"
            }
        }
    }
}

//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
