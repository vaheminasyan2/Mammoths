$("#strengthForm").hide();
$("#runningForm").show();

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
