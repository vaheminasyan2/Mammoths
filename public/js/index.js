// Get references to page elements
var $runDate = $("#date");
var $runDistance = $("#distance");
var $submitBtn = $("#submitRun");
var $runList = $("#runList");

// The API object contains methods for each kind of request we'll make
var API = {
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
  getRuns: function () {
    return $.ajax({
      url: "api/runs",
      type: "GET"
    });
  },
  deleteRun: function (id) {
    return $.ajax({
      url: "api/runs/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshRuns = function () {
  API.getRuns().then(function (data) {
    var $runs = data.map(function (run) {
      var $a = $("<a>")
        .text(run.date)
        .attr("href", "/runs/" + run.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": run.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $runList.empty();
    $runList.append($runs);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
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

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
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

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}

onSignIn(googleUser);


