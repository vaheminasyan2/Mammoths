$("#strengthForm").hide();
$("#runningForm").hide();

// Displays data entry form for Running
function showRunningForm() {
  $("#strengthForm").hide();
  $("#runningForm").show();
  }

// Displays data entry form for Strength Training
function showStrengthForm() {
  $("#runningForm").hide();
  $("#strengthForm").show();
}


function addExercise() {
    
}

$("#runningBtn").on("click", showRunningForm);
$("#strengthBtn").on("click", showStrengthForm);

$("#addExercise").on("click", addExercise);


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