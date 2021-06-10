if(window.location.pathname === "/upload"){
    document.getElementById("uploadForm").addEventListener("submit", ()=> {
//    console.log("yeet")
    //document.getElementById("uploadForm").submit();
    //document.getElementById("uploadForm").
    document.getElementById("uploadImage").className="form-horizontal";
})
} else if (window.location.pathname === "/localBusiness"){
    document.getElementById("passCode").addEventListener('input', ()=>{
        if(document.getElementById("passCode").value === "0000"){
            document.getElementById("lbBody").className = "background";
            document.getElementById("passCodeDiv").className = "d-invisible";
        }
    })
}




