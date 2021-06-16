// js code created in order to enable the scroll function to appear within the tables in the tourists page
// When the screen has been resized to a max width of 900 or else remove the scroll function

setInterval(()=>{ //Runs on an interval every 100 milliseconds
    var mq = window.matchMedia( "(max-width: 900px)" );
    if (mq.matches) {
        // window width is at less than 900px
        document.getElementById("tableScroll").className = "table table-striped table-scroll"
        document.getElementById("tableScroll2").className = "table table-striped table-scroll"
    }
    else {
        // window width is greater than 900px
        document.getElementById("tableScroll").className = "table table-striped"
        document.getElementById("tableScroll2").className = "table table-striped"

    }
}, 100)
