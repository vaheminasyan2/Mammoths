// REFERENCES TO FORM ELEMENTS
// ========================================

var $runDate = $("#dateForm");
var $runDistance = $("#distanceForm");
var $runDuration = $("#durationForm");
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

var handleFormSubmit = function (event) {
  event.preventDefault();

  var run = {
    date: $runDate.val().trim(),
    distance: $runDistance.val().trim(),
    duration: $runDuration.val().trim(),
    location: $runLocation.val().trim(),
    surface: $runSurface.val().trim(),
    UserId: user.userId
  };

  // ===== Form Validation =====

  if (!(run.date && run.distance && run.duration)) {
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
  $runDuration.val("");
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