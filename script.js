// a function that sorts the divs of a website inside a div with the id "content" by the data-mapid tag 
// ascending by the map id and replace the content of the div with the id "content" with the sorted divs
function sortDivsByMapId() {
    // remove the css class "btn-primary" from the button with the id "sort-by-date" and add the css class "btn-primary" to the button with the id "sort-by-map-id"
    // also add the class "btn-secondary" to the button with the id "sort-by-date" and remove the class "btn-secondary" from the button with the id "sort-by-map-id"
    document.getElementById("sort-by-date").classList.remove("btn-primary");
    document.getElementById("sort-by-map-id").classList.add("btn-primary");
    document.getElementById("sort-by-date").classList.add("btn-secondary");
    document.getElementById("sort-by-map-id").classList.remove("btn-secondary");

    var content = document.getElementById("maps");
    var divs = content.getElementsByTagName("div");
    console.log("divs: " + divs)
    var arr = [];
    for (var i = 0; i < divs.length; i++) {
        arr.push(divs[i]);
    }

    arr.sort(function(a, b) {
        return a.dataset.mapId - b.dataset.mapId;
    });

    for (var i = 0; i < arr.length; i++) {
        content.appendChild(arr[i]);
    }
}

// a function that sorts the divs of a website inside a div with the id "content"  by the data-finish-date tag
// ascending by ethe finish date and replace the content of the div with the id "content" with the sorted divs. The 
// dates are in the format YYYY-MM-DD
function sortDivsByDate() {
    // remove the css class "btn-primary" from the button with the id "sort-by-map-id" and add the css class "btn-primary" to the button with the id "sort-by-date"
    // also add the class "btn-secondary" to the button with the id "sort-by-map-id" and remove the class "btn-secondary" from the button with the id "sort-by-date"
    document.getElementById("sort-by-map-id").classList.remove("btn-primary");
    document.getElementById("sort-by-date").classList.add("btn-primary");
    document.getElementById("sort-by-map-id").classList.add("btn-secondary");
    document.getElementById("sort-by-date").classList.remove("btn-secondary");

    var content = document.getElementById("maps");
    var divs = content.getElementsByTagName("div");
    var arr = [];

    for (var i = 0; i < divs.length; i++) {
        arr.push(divs[i]);
    }

    arr.sort(function(a, b) {
        return new Date(a.dataset.finishDate) - new Date(b.dataset.finishDate);
    });
    
    for (var i = 0; i < arr.length; i++) {
        content.appendChild(arr[i]);
    }
}