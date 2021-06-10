//Get the hotels modal id

document.getElementById("modalbutton").addEventListener(
    "click",()=>{
        document.getElementById("kitemodal").className = "modal active"
    }
)
document.getElementById("closeid").addEventListener(
    "click",()=>{
        document.getElementById("kitemodal").className = "modal"
    }
)
