
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    document.location.href = '/home?' + profile.getName();
  }