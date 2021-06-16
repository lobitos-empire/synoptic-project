
//The code below enables the modals created within the hotel.pug file to be intercative

if(window.location.pathname === "/hotels") {
    document.getElementById("hotelModal-id").addEventListener(
        //When the users click on the modal image, the modal should appear
        "click", () => {
            document.getElementById("modal-id").className = "modal active"
        }
    )
    //In the modal the X symbol is displayed and when the user clicks on it, the code below enables the modal to close.
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

    //Get the third hotels modal id
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

    //Get the fourth hotels modal id
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

    //Get the fifth hotels modal id
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

    //The code below enables the tabs within the application to display an icon once the tab is set to active
    let tabs = document.getElementsByClassName("tab-item");
    for(let i = 0; i<tabs.length; i++){
        console.log(tabs[i])
        if(tabs[i].className === "tab-item active"){
            if(tabs[i].children[0].innerText === "Hotel"){
                tabs[i].children[0].innerText = "🏨 Hotel"
            }}}
}
//else if the window is on a different page e.g "/attractions", then apply the previous code within this section.
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

// Go back up button
//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the page the button is shown
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

// When clicked on the button, scroll to the top of page
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
