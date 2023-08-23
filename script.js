// a function that initializes the maps for the "maps" div and reads the data from the json file
// the json file is in the format: 
// {
//     "258":
//     {
//         "finish_date": "2023-08-19",
//         "isYouTubeShort": true,
//         "clip": "https://www.youtube-nocookie.com/embed/VcqP02QOmhU"
//     }
// }
// If isYoutubeShort is true, the clip is a youtube short, otherwise it is a twitch clip. The finish date is in the format YYYY-MM-DD
// YouTube Shorts need to be embedded like this:
// <iframe src="https://www.youtube-nocookie.com/embed/VcqP02QOmhU" width="100%" height="300px"
// title="YouTube video player" frameborder="0"
// allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
// allowfullscreen>
// </iframe>
// Twitch clips need to be embedded like this:
// <iframe
// src="https://clips.twitch.tv/embed?clip=OnerousIntelligentLyrebirdDogFace-Nyd_6ZXyuksrrJOc&parent=kacky.jnic.club"
// allowfullscreen="" width="100%" height="300px">
// </iframe>
// Also add title with h3 that contains the map id (258 in the example) and a paragraph with the finish date (2023-08-19 in the example)
// The divs need to be sorted by the map id ascending by default
function initMaps() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            var maps = JSON.parse(this.responseText);
            console.log(maps);
            for (var map in maps) {
                var div = document.createElement("div");
                div.dataset.mapId = map;
                div.dataset.finishDate = maps[map].finish_date;
                var title = document.createElement("h3");
                title.innerHTML = "Map " + map;
                var date = document.createElement("p");
                date.innerHTML = maps[map].finish_date;
                var clip = document.createElement("iframe");
                clip.width = "100%";
                clip.height = "300px";
                clip.allowfullscreen = "";
                clip.src = maps[map].clip;
                div.appendChild(title);
                div.appendChild(date);
                div.appendChild(clip);
                document.getElementById("maps").appendChild(div);
            }
            sortDivsByMapId();
        } else if (this.readyState == 4 && this.status != 200) {
            console.log("Error while loading maps: " + this.status + " " + this.statusText);

            // add an error message to the div with the id "content" using bootstrap to make it look pretty. Append it without removing any existing content
            var div = document.createElement("div");
            div.classList.add("alert");
            div.classList.add("alert-danger");
            div.innerHTML = "Error while downloading the maps: " + this.status + " " + this.statusText;
            document.getElementById("content").appendChild(div);
        }
    };
    xhttp.open("GET", "finishes.json", true);
    xhttp.send();
}

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

document.addEventListener("DOMContentLoaded", function() {  
    initMaps();
}, false);