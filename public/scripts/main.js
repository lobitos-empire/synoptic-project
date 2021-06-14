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
} else if (window.location.pathname === "/localBusiness"){
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
        }else{
            if(document.getElementById("passCode").value.length===4){
                //validation for the passcode. If password is incorrect.
                mdtoast('Contraseña incorrecta', { duration: 2000, type: mdtoast.ERROR });    // or type: 'error'
            }



        }

    })
}




