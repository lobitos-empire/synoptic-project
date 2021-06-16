if(window.location.pathname === "/upload"){
    document.getElementById("uploadForm").addEventListener("submit", ()=> {
//    console.log("yeet")
    //document.getElementById("uploadForm").submit();
    //document.getElementById("uploadForm").
        document.getElementById("uploadImage").className="form-horizontal";
    // Initializes default toast with duration of 10 seconds (this will not show the toast since init is set to true)
})
    document.getElementById("uploadImage").addEventListener("submit", ()=> {
        var myToast = mdtoast('Business Uploaded', { duration: 6000, init: true });
        // Displays the toast
        myToast.show();
    })
}
else if (window.location.pathname === "/localBusiness"){
    window.addEventListener('DOMContentLoaded',  ()=> {
        const element = document.getElementById('google_translate_element');
        if(element){

            element.className= "d-visible"
        }
        console.log('DOM F');
        //Getting the cookie--> existing user and storing it in
        try{
            const isLoggedIn = sessionStorage.getItem('existingUser');
            if (isLoggedIn){
                document.getElementById("lbBody").className = "background";
                document.getElementById("passCodeDiv").className = "d-invisible";
            }

        }catch(e){
            sessionStorage.setItem('existingUser', false);

        }

    });

  document.getElementById("passCode").addEventListener('input', ()=>{
     if(document.getElementById("passCode").value === "0000"){
        sessionStorage.setItem('existingUser', true);
        document.getElementById("lbBody").className = "background";
         document.getElementById("passCodeDiv").className = "d-invisible";
       }
    })
 }

if(window.location.pathname === "/localBusiness") {
    document.getElementById("localhelpicon").addEventListener(
        "click", () => {
            document.getElementById("localhelpmodal").className = "modal active"
        }
    )
    document.getElementById("closelocalhelp").addEventListener(
        "click", () => {
            document.getElementById("localhelpmodal").className = "modal"
        }
    )
} else if(window.location.pathname === "/upload") {
    document.getElementById("uploadhelpicon").addEventListener(
        "click", () => {
            document.getElementById("uploadhelpmodal").className = "modal active"
        }
    )
    document.getElementById("closeuploadhelp").addEventListener(
        "click", () => {
            document.getElementById("uploadhelpmodal").className = "modal"
        }
    )
} else if(window.location.pathname === "/business") {
    document.getElementById("businesshelpicon").addEventListener(
        "click", () => {
            document.getElementById("businesshelpmodal").className = "modal active"
        }
    )
    document.getElementById("closebusinesshelp").addEventListener(
        "click", () => {
            document.getElementById("businesshelpmodal").className = "modal"
        }
    )
} else if(window.location.pathname === "/tourist") {
    document.getElementById("touristhelpicon").addEventListener(
        "click", () => {
            document.getElementById("touristhelpmodal").className = "modal active"
        }
    )
    document.getElementById("closetouristhelp").addEventListener(
        "click", () => {
            document.getElementById("touristhelpmodal").className = "modal"
        }
    )

    document.getElementById("survivalhelpicon").addEventListener(
        "click", () => {
            document.getElementById("survivalhelpmodal").className = "modal active"
        }
    )
    document.getElementById("closesurvivalhelp").addEventListener(
        "click", () => {
            document.getElementById("survivalhelpmodal").className = "modal"
        }
    )
} else if(window.location.pathname === "/hottest") {
    document.getElementById("hottesthelpicon").addEventListener(
        "click", () => {
            document.getElementById("hottesthelpmodal").className = "modal active"
        }
    )
    document.getElementById("closehottesthelp").addEventListener(
        "click", () => {
            document.getElementById("hottesthelpmodal").className = "modal"
        }
    )
} else if(window.location.pathname === "/attractions") {
    document.getElementById("attractionhelpicon").addEventListener(
        "click", () => {
            document.getElementById("attractionhelpmodal").className = "modal active"
        }
    )
    document.getElementById("closeattractionhelp").addEventListener(
        "click", () => {
            document.getElementById("attractionhelpmodal").className = "modal"
        }
    )
} else if(window.location.pathname === "/hotels") {
    document.getElementById("hotelshelpicon").addEventListener(
        "click", () => {
            document.getElementById("hotelshelpmodal").className = "modal active"
        }
    )
    document.getElementById("closehotelshelp").addEventListener(
        "click", () => {
            document.getElementById("hotelshelpmodal").className = "modal"
        }
    )
}



