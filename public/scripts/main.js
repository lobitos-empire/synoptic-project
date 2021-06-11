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
    document.getElementById("passCode").addEventListener('input', ()=>{
        if(document.getElementById("passCode").value === "0000"){
            document.getElementById("lbBody").className = "background";
            document.getElementById("passCodeDiv").className = "d-invisible";
        }
    })
} else if (window.location.pathname === "/business"){
    document.g ('input[type=radio]').on('change', function() {
        document.getElementById (this).closest("form").submit();
    });
}




