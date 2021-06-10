//Enable modals for the references to open and close.

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

document.getElementById("cyclebutton").addEventListener(
    "click",()=>{
        document.getElementById("cyclemodal").className = "modal active"
    }
)
document.getElementById("closecycle").addEventListener(
    "click",()=>{
        document.getElementById("cyclemodal").className = "modal"
    }
)
