// GLOBALS
// ======================================================

var directionsService2;
var directionsDisplay2;
var wayPoints2;
var map2;
var runData;

// VIEW ALL RUNS API CALL
// ========================================

// Gets all run entries from database
function viewAllRuns() {
    $.ajax({
        context: $(this),
        url: "/viewAllRuns",
        method: "GET"
    })
        .then(function (response) {
            displayAllRunsList(response);
        });
}

viewAllRuns();

function initViewRunsMap() {

    // Map style settings
    // Turn off points of interest
    var myStyles = [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }
    ];

    // Set up map centered around Seattle
    // ======================================================

    map2 = new google.maps.Map(document.getElementById("map2"), {
        zoom: 15,
        center: { lat: 47.60453, lng: -122.33422 },
        styles: myStyles
    });

    // Set up Direction Tools
    // ======================================================

    directionsService2 = new google.maps.DirectionsService;
    directionsDisplay2 = new google.maps.DirectionsRenderer({
        preserveViewport: true,
        suppressMarkers: true
    });

    directionsDisplay2.setMap(map2);
}

function displayAllRunsList(runData) {
    console.log(runData);

    var runDiv;

    for (var i in runData) {

        runDiv = $("<div>").addClass("runDiv");

        var dateDiv = $("<pre>").addClass("runDetail").text(runData[i].date);
        var distDiv = $("<pre>").addClass("runDetail").text(runData[i].distance);
        var timeDiv = $("<pre>").addClass("runDetail").text(runData[i].duration);
        var locDiv = $("<pre>").addClass("runDetail").text(runData[i].location);
        var surfDiv = $("<pre>").addClass("runDetail").text(runData[i].surface);

        runDiv.append(dateDiv);
        runDiv.append(distDiv);
        runDiv.append(timeDiv);
        runDiv.append(locDiv);
        runDiv.append(surfDiv);

        $("#allRunsList").append(runDiv);
    }
}

$("pre.runDetail").on("click", runDivClicked);

function runDivClicked() {
    $(this).css("background", "blue");
    displayRunRoute(directionsService2, directionsDisplay2, wayPoints2);
}

function displayRunRoute(directionsService2, directionsDisplay2, wayPoints2) {
    return;
}


