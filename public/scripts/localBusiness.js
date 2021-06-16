// Emojis for the local business tabs

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



//Form validation for the location to ensure it is always lobitos:const element = document.getElementById('continuebtn');
// always checking if the element is clicked, if so, the event should be done
element.addEventListener("click", () => {
    const locationame = document.getElementById('locationname');
    console.log(locationame.value.toLowerCase());
    /*
      The if condition  checks if the location input is not null and
      if it is equal to lobitos.
      .toLowerCase() ensures that whatever input is placed is turned to
      lowercase
     */
   if(locationame.value !== "" && locationame.value.toLowerCase() !== "lobitos"){
       //Showcase that the name of the location is input using the spectre class.
       locationame.className = "form-input is-error"
   }else{
       //Leave the input as it is, since it isn't an error
       locationame.className = "form-input "

   }
});


function validateForm() {
    console.log("Functon is hit");

}
