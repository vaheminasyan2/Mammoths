// Get references to page elements
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

// refreshRuns gets new runs from the db and repopulates the list
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

refreshRuns();

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


// Google Sign Out
// =======================================================
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

// Bar Chart
// =======================================================

var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Joseph", "Vahe", "Curtis", "Bhavin",],
      datasets: [{
        label: 'Miles',
        data: [5, 15, 30, 20,],
        backgroundColor: [
          'rgba(255, 0, 0, 0.3)',
          'rgba(0, 255, 0, 0.3)',
          'rgba(0, 0, 255, 0.3)',
          'rgba(75, 192, 192, 0.3)',
        ],
        borderColor: [
          'red',
          'green',
          'blue',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
        hoverBorderWidth: 5
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Miles Ran',
        fontColor: "white"
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor: "white"
          },
          gridLines: {
            color: 'rgb(118, 40, 155)'
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: "white"
          },
        }]
      },
    }
  });

  // Line Chart
  // =======================================================

  var lineC = document.getElementById("lineChart").getContext('2d');
  var myChart = new Chart(lineC, {
    type: 'line',
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: 'Joseph',
          data: [50, 60, 40, 80],
          borderColor: 'rgba(255, 0, 0, 0.3)',
          fill: false,
          pointBackgroundColor: 'red',
          pointHoverRadius: 7,
        },
        {
          label: 'Vahe',
          data: [22, 11, 44, 50],
          borderColor: 'rgba(0, 255, 0, 0.3)',
          fill: false,
          pointBackgroundColor: 'green',
          pointHoverRadius: 7,
        },
        {
          label: 'Curtis',
          data: [30, 70, 100, 90],
          borderColor: 'rgba(0, 0, 255, 0.3)',
          fill: false,
          pointBackgroundColor: 'blue',
          pointHoverRadius: 7,
        },
        {
          label: 'Bhavin',
          data: [74, 70, 30, 5],
          borderColor: 'rgba(75, 192, 192, 0.3)',
          fill: false,
          pointBackgroundColor: 'cyan',
          pointHoverRadius: 7,
        }
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Weekly Goal Completion',
        fontColor: "white"
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: "% Completion",
            fontColor: "gray"
          },
          ticks: {
            beginAtZero: true,
            fontColor: "white"
          },
          gridLines: {
            color: 'rgb(118, 40, 155)'
          }
        }],
      }
    }
  });

  module.exports = API;
