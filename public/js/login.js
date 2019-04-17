function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/login');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function () {
    var googleUserObject = JSON.parse(xhr.responseText);
    localStorage.setItem("userId", googleUserObject.sub);
    localStorage.setItem("userEmail", googleUserObject.email);
    localStorage.setItem("userName", googleUserObject.name);
    document.location.href = '/home';
  };
  xhr.send('idtoken=' + id_token); 
}

//onSignIn(googleUser);

//console.log(process.env.GOOGLE_CLIENT_ID)


   
// loadScript = () => {
//   console.log(process.env.GOOGLE_CLIENT_ID);
//   var index = window.document.getElementsByTagName("meta")[0];
//   var meta = window.document.createElement("meta");
//   meta.name = "google-signin-client_id";
//   meta.content = process.env.GOOGLE_CLIENT_ID;
//   // script.defer = true;
//   index.parentNode.insertBefore(meta, index);
// };
//  loadScript();