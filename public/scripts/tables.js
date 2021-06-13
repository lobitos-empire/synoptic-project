
setInterval(()=>{ //Runs on an interval every 1000 miliseconds it updates the
    var mq = window.matchMedia( "(max-width: 800px)" );
    if (mq.matches) {
        // window width is at less than 570px
        document.getElementById("tableScroll").className = "table table-striped table-scroll"
        document.getElementById("tableScroll2").className = "table table-striped table-scroll"
    }
    else {
        document.getElementById("tableScroll").className = "table table-striped"
        document.getElementById("tableScroll2").className = "table table-striped"
        // window width is greater than 800px
    }
}, 1000)
