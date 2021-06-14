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

document.getElementById("trekkingbutton").addEventListener(
    "click",()=>{
        document.getElementById("trekkingmodal").className = "modal active"
    }
)

document.getElementById("closetrekking").addEventListener(
    "click",()=>{
        document.getElementById("trekkingmodal").className = "modal"
    }
)

document.getElementById("birdwatchingbutton").addEventListener(
    "click",()=>{
        document.getElementById("birdwatchingmodal").className = "modal active"
    }
)

document.getElementById("closebirdwatching").addEventListener(
    "click",()=>{
        document.getElementById("birdwatchingmodal").className = "modal"
    }
)

document.getElementById("boatsbutton").addEventListener(
    "click",()=>{
        document.getElementById("boatsmodal").className = "modal active"
    }
)

document.getElementById("closeboats").addEventListener(
    "click",()=>{
        document.getElementById("boatsmodal").className = "modal"
    }
)



