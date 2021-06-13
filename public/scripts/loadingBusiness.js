//Reading the JSON file
/*fetch('../scripts/loadingBusiness.js')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log(err);
    });*/



/*function appendData(data){
    //Container that would receive all the items.
    var divContainer = document.getElementById("testRead");
    for (var i = 0; i < data.length; i++) {
        var bodyDiv= document.getElementById("#secondTest");
        // append each person to our page
        bodyDiv.innerHTML = "Owner's Name:"  + data.ownersName;
        divContainer.appendChild(bodyDiv);
    }
}*/

let businessData = require('business.json');
let