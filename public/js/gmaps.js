// GLOBALS
// ======================================================

var directionsService;
var directionsDisplay;
var wayPoints;
var distance;
var icon;

// INITIALIZE MAP
// ======================================================

function initMap() {

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

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: { lat: 47.60453, lng: -122.33422 },
        draggableCursor: "crosshair",
        styles: myStyles
    });

    // Set up Direction Tools
    // ======================================================

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({
        // draggable: true,
        preserveViewport: true,
        suppressMarkers: true
    });

    directionsDisplay.setMap(map);

    // Calculate and Draw Routes
    // ======================================================

    wayPoints = [];

    // Listen for user clicks on map
    // Calculate and update directions display
    google.maps.event.addListener(map, 'click', function (event) {

        wayPoints.push({
            location: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
        });

        // Google libraries of map marker icons
        var startIcon = "http://maps.google.com/mapfiles/arrow.png";

        // If this is the first point, put a marker there
        if (wayPoints.length == 1) {

            icon = new google.maps.Marker({
                position: wayPoints[0].location,
                icon: startIcon,
                map: map
            });

            // Event handler for clicking on Marker
            // ======================================================

            var content = "<div id='loopRoute'>Loop route to this point</div>";

            var infowindow = new google.maps.InfoWindow({
                content: content
            });

            icon.addListener('click', function () {
                infowindow.open(map, icon);
            });
        }


        // If at least one wayPoint present, calculate route
        if (wayPoints.length > 1) {
            calculateAndDisplayRoute(directionsService, directionsDisplay, wayPoints);
        }
    });

    // Event handlers for Map Control Buttons
    // ======================================================

    $("#saveRoute").on("click", saveRoute);
    $("#clearRoute").on("click", clearRoute);
    $("#undoLast").on("click", undoLast);
    $("#loadRoute").on("click", loadRoute);

    // $("#loopRoute").on("click", )

}

// CALCULATE AND DISPLAY ROUTE
// ======================================================

function calculateAndDisplayRoute(directionsService, directionsDisplay, wayPoints) {

    distance = 0;
    var meters = 0;
    const metersToMiles = 0.000621371192;

    directionsService.route({
        origin: wayPoints[0],
        waypoints: wayPoints,
        destination: wayPoints[wayPoints.length - 1],
        optimizeWaypoints: false,
        travelMode: 'WALKING'
    },
        function (response, status) {
            // console.log(response);

            // Sum up the distance (in meters) of each leg of route
            for (var i = 0; i < response.routes[0].legs.length; i++) {
                meters += response.routes[0].legs[i].distance.value;
            }

            // Convert total distance from meters to miles
            distance = Math.round((meters * metersToMiles) * 100) / 100;

            $("#distance").text(distance + " mi.");

            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
}

// The API object contains methods for each kind of request we'll make
var API = {
    saveRoute: function(route) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        url: "api/saveRoute",
        type: "POST",
        data: JSON.stringify(route)
      });
    }
  };

// SAVE ROUTE
// ======================================================

function saveRoute(event) {
    event.preventDefault();

    var newRoute = {
        name: "default",
        distance: distance,
        wayPoints: wayPoints
    }

    console.log(newRoute);

    API.saveRoute(newRoute).then(function(response) {
        console.log("Saving...");
        console.log(response);
    });

    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', '/api/saveRoute');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.send(newRoute);
}

// LOAD ROUTE
// ======================================================

function loadRoute() {
    // get wayPoints from database

}

// UNDO LAST
// ======================================================

function undoLast(event) {
    event.preventDefault();

    wayPoints.pop();

    // If waypoints are emptied, clear markers from map
    if (wayPoints.length == 0) {
        icon.setMap(null);
    }

    calculateAndDisplayRoute(directionsService, directionsDisplay, wayPoints);
}

// CLEAR ROUTE
// ======================================================

function clearRoute(event) {
    event.preventDefault();

    // Clear waypoints
    wayPoints = [];

    // Clear icons
    icon.setMap(null);

    $("#distance").text("0.0 mi.");

    // Erase route from map
    directionsDisplay.set("directions", null);
}