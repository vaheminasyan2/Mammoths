// REFERENCES TO FORM ELEMENTS
// ========================================

var $runDate = $("#dateForm");
var $runDistance = $("#distanceForm");
var $runRoute = $("#showRoutes");
var $runHours = $("#hours");
var $runMins = $("#minutes");
var $runSecs = $("#seconds");
var $runLocation = $("#locationForm");
var $runSurface = $("#surfaceForm");
var $submitBtn = $("#submitRun");
var $runList = $("#runList");
var $newActivity = $("#newActivity");

// USER INFO ON SIGN IN
// ========================================

var user = {
  userId: localStorage.getItem("userId"),
  userEmail: localStorage.getItem("userEmail"),
  userName: localStorage.getItem("userName"),
};

console.log("userid" + user.userId);

// APPEND USER NAME TO THE NAV BAR
$("#loggedInUser").append(user.userName)

// REFRESH RUNS
// ========================================

var refreshRuns = function () {

  $.ajax({
      url: "api/runs/" + user.userId,
      type: "GET"
    })
  .then(function (data) {
    //console.log(data);
    var $runs = data.map(function (run) {
      var $recentRun = $("<a>").html(run.date + ": " + run.distance + " miles, " + run.duration);

      var $deleteBtn = $("<div>")
      .addClass("delete")
      .css("float", "right")
      .css("margin-left", "10px")
      .text("delete");

      var $div = $("<div>")
        .attr({
          "data-id": run.id
        })
        .addClass("recentRun")
        .css("margin-bottom", "5px")
        .append($recentRun);
        // .append($deleteBtn)

      return $div;
    });

    $("#run-list").empty();
    $("#run-list").append($runs);
  });
};

refreshRuns();

// LOAD EXISTING ROUTE (DROP DOWN MENU IN FORM)
// ========================================

// Initial call to populate drop down menu
showRoutes();

// Update Load Existing Route drop down menu when clicked
$("#showRoutes").on("mouseenter", checkShowRoutes);

function checkShowRoutes() {
  if ($("#showRoutes").val() == "") {
    showRoutes();
  }
}

function showRoutes() {

  $.ajax({
    url: "api/loadAllRoutes/" + user.userId,
    type: "GET"
  })
  .then(function (data) {
    //console.log(data);

    $("#showRoutes").empty();
    $("#showRoutes").append(`<option val="">`);

    for (var i=0; i<data.length; i++) {
      var route = $(`<option val=${data[i].name}>`).text(data[i].name + ": " + data[i].distance + " miles, " + data[i].location);

      $("#showRoutes").append(route);
    }
  });
};

// AUTO-POPULATE DISTANCE & LOCATION FIELDS
// ========================================

$("#showRoutes").on("change", populateFields);

function populateFields() {
  var routeText = $("#showRoutes").val().trim();
  var distanceText = routeText.split(":")[1];
  var distanceVal = parseFloat(distanceText.split(" ")[1]);

  var locationText = routeText.split(",")[1].trim();

  $("#distanceForm").val(distanceVal);
  $("#locationForm").val(locationText);
}

// CALCULATE MILE PACE
// ========================================

$(".duration").on("change", calculatePace);
$(".distance").on("change", calculatePace);

function calculatePace() {

  // Convert form values to total minutes
  var hours = parseInt($runHours.val().trim());
  var minutes = parseInt($runMins.val().trim());
  var seconds = parseInt($runSecs.val().trim());

  // Get distance
  var distance = parseFloat($runDistance.val().trim());

  // Validate data
  // Then calculate and display pace
  if ($runDistance && $runHours && (minutes <= 59 && minutes >= 0) && (seconds <= 59 && seconds >= 0)) {

    var totalMinutes = (hours * 60) + (minutes) + (seconds / 60);
    
    var paceMins = Math.floor(totalMinutes / distance);
    var paceSecs = Math.round(((totalMinutes / distance) - paceMins) * 60);

    // Adds a zero before the seconds figure
    // To avoid having a result such as "5:9" for the pace. Corrects to "5:09"
    var addZero = "";
    if (paceSecs < 10) {
      addZero = 0;
    }

    $("#pace").text(` ${paceMins}:${addZero}${paceSecs}`);
  }
}

// SUBMIT NEW RUN
// ========================================

var handleFormSubmit = function (event) {
  event.preventDefault();

  var $runDuration = `${$runHours.val().trim()}:${$runMins.val().trim()}:${$runSecs.val().trim()}`;
  
  var run = {
    date: $runDate.val().trim(),
    distance: $runDistance.val().trim(),
    route: $runRoute.val(),
    duration: $runDuration,
    location: $runLocation.val().trim(),
    surface: $runSurface.val().trim(),
    UserId: user.userId
  };

  // ===== Form Validation =====

  if (!(run.date && run.distance && $runHours.val().trim() && $runMins.val().trim() && $runSecs.val().trim())) {
    alert("Please fill out the date, distance and duration.");
    return;
  };

  // Submit new run
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "api/runs",
    data: JSON.stringify(run)
  }).then(function () {
    //console.log(response);
    refreshRuns();
  });
  
  // Empty form fields
  $runDate.val("");
  $runDistance.val("");
  $runRoute.val("");
  $runHours.val("");
  $runMins.val("");
  $runSecs.val("");
  $runLocation.val("");
  $runSurface.val("");
};

// DELETE RUN
// ========================================

var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

    $.ajax({
        url: "api/runs/" + idToDelete,
        type: "DELETE"
      })

  .then(function () {
    refreshRuns();
  });
}

// EVENT HANDLERS: SUBMIT, DELETE
// ========================================

$submitBtn.on("click", handleFormSubmit);
$("#run-list").on("click", ".delete", handleDeleteBtnClick);

// GOOGLE SIGN OUT
// ========================================

var auth2;

window.onLoadCallback = function () {
  gapi.load('auth2', function () {
    auth2 = gapi.auth2.init({
      client_id: '894965613215-inve9sto28jrujo1kshpeao4gm2e8hdb.apps.googleusercontent.com',
      scope: 'profile',
      fetch_basic_profile: false
    });
  });
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    document.location.href = '/';
  });
}