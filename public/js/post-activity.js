// Get references to page elements
var $runDate = $("#date");
var $runDistance = $("#distance");
var $submitBtn = $("#submitRun");
var $runList = $("#runList");
var $newActivity = $("#newActivity");

// Our signed in User info 
var user = {
  userId: localStorage.getItem("userId"),
  userEmail: localStorage.getItem("userEmail"),
  userName: localStorage.getItem("userName")
};
console.log("userid from Index page " + user.userId);

// The API object contains methods for each kind of request we'll make
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

// handleFormSubmit is called whenever we submit a new run
// Save the new run to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var run = {
    date: $runDate.val().trim(),
    distance: $runDistance.val().trim()
  };

  if (!(run.date && run.distance)) {
    alert("Fill out both fields dude.");
    return;
  }

  API.saveRun(run).then(function () {
    refreshRuns();
  });

  $runDate.val("");
  $runDistance.val("");
};

// handleDeleteBtnClick is called when an run's delete button is clicked
// Remove the run from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteRun(idToDelete).then(function () {
    refreshRuns();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$runList.on("click", ".delete", handleDeleteBtnClick);

// Google signOut()
var auth2

window.onLoadCallback = function () {
  gapi.load('auth2', function () {
    auth2 = gapi.auth2.init({
      client_id: '894965613215-inve9sto28jrujo1kshpeao4gm2e8hdb.apps.googleusercontent.com',
      scope: 'profile',
      fetch_basic_profile: false
    })
  })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    document.location.href = '/';
  });
}