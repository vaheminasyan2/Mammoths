// REFERENCES TO FORM ELEMENTS
// ========================================

var $runDate = $("#dateForm");
var $runDistance = $("#distanceForm");
var $runHours = $("#hours");
var $runMins = $("#minutes");
var $runSecs = $("#seconds");
var $runLocation = $("#locationForm");
var $runSurface = $("#surfaceForm")

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

console.log("userid from Index page " + user.userId);

// API OBJECT
// ========================================

var API = {
  getRuns: function () {
    return $.ajax({
      url: "api/runs",
      type: "GET"
    });
  },

  saveRun: function (run) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/runs",
      data: JSON.stringify(run)
    });
  },

  deleteRun: function (id) {
    return $.ajax({
      url: "api/runs/" + id,
      type: "DELETE"
    });
  },

};

// SUBMIT NEW RUN
// ========================================
$(".duration").on("change", calculatePace);

function calculatePace() {

  // Convert form values to total minutes
  var hours = parseInt($runHours.val().trim());
  var minutes = parseInt($runMins.val().trim());
  var seconds = parseInt($runSecs.val().trim());

  if ($runDistance && $runHours && $runMins && $runSecs) {
    var totalMinutes = (hours * 60) + (minutes) + (seconds / 60);
    var distance = parseFloat($runDistance.val().trim());

    var paceMins = Math.floor(totalMinutes / distance);
    var paceSecs = Math.round(((totalMinutes / distance) - paceMins) * 60);
  }

  $("#pace").text(`${paceMins}:${paceSecs}`);
}

var handleFormSubmit = function (event) {
  event.preventDefault();

  var $runDuration = `${$runHours.val().trim()}:${$runMins.val().trim()}:${runSecs.val().trim()}`;

  var run = {
    date: $runDate.val().trim(),
    distance: $runDistance.val().trim(),
    duration: $runDuration,
    location: $runLocation.val().trim(),
    surface: $runSurface.val().trim(),
    UserId: user.userId
  };

  // ===== Form Validation =====

  if (!(run.date && run.distance && $runDuration)) {
    alert("Please fill out the date, distance and duration.");
    return;
  };

  console.log(run);

  // Submit new run
  $.ajax({
    headers: {
      "Content-Type": "application/json"
    },
    type: "POST",
    url: "api/runs",
    data: JSON.stringify(run)
  }).then(function (response) {
    console.log(response);
    refreshRuns();
  });

  // Empty form fields
  $runDate.val("");
  $runDistance.val("");
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

  API.deleteRun(idToDelete).then(function () {
    refreshRuns();
  });
};

// REFRESH RUNS
// ========================================

var refreshRuns = function () {
  API.getRuns().then(function (data) {
    console.log(data);
    // var $runs = data.map(function (run) {
    //   var $a = $("<a>")
    //     .text(run.date)
    //     .attr("href", "/runs/" + run.id);

    //   var $li = $("<li>")
    //     .attr({
    //       class: "list-group-item",
    //       "data-id": run.id
    //     })
    //     .append($a);

    //   var $button = $("<button>")
    //     .addClass("btn btn-danger float-right delete")
    //     .text("ｘ");

    //   $li.append($button);

    //   return $li;
    // });

    // $runList.empty();
    // $runList.append($runs);
  });
};

// EVENT HANDLERS: SUBMIT, DELETE
// ========================================

$submitBtn.on("click", handleFormSubmit);
//$runList.on("click", ".delete", handleDeleteBtnClick);


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