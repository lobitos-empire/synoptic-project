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
            if(tabs[i].children[0].innerText === "Explore Nuevos Mercados"){
                tabs[i].children[0].innerText = "🌎 Explore Nuevos Mercados"
            }
        }
    }
}



//Form validation for the location to ensure it is always lobitos:
// get the element
/*const element = document.getElementById('continuebtn')

// always checking if the element is clicked, if so, do alert('hello')
element.addEventListener("click", () => {
    //Ensure that all input information has been filled before alerting them on the error:
    var  businessLocation = document.forms["uploadForm"]["businessLoc"].value;

    if(businessLocation == null){
        alert("location is null");
    }

});*/


const element = document.getElementById('continuebtn');

// always checking if the element is clicked, if so, do alert('hello')
element.addEventListener("click", () => {
    const locationame = document.getElementById('locationname');
    console.log(locationame.value.toLowerCase());
    //Ensure that all input information has been filled before alerting them on the error:
   if(locationame.value !== "" && locationame.value.toLowerCase() !== "lobitos"){
       locationame.className = "form-input is-error"
   }else{
       locationame.className = "form-input "

   }




});


function validateForm() {
    console.log("Functon is hit");

}
