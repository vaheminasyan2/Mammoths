function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  var id_token = googleUser.getAuthResponse().id_token;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/login');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  //var user = 
  xhr.onload = function () {
    var googleUserObject = JSON.parse(xhr.responseText);
    localStorage.setItem("userId", googleUserObject.sub);
    localStorage.setItem("userEmail", googleUserObject.email);
    localStorage.setItem("userName", googleUserObject.name);
    document.location.href = '/home?' + profile.getName();
  };
  xhr.send('idtoken=' + id_token); 
}


/*
Signed in as: {
  "iss":"accounts.google.com","azp":"894965613215-inve9sto28jrujo1kshpeao4gm2e8hdb.apps.googleusercontent.com","aud":"894965613215-inve9sto28jrujo1kshpeao4gm2e8hdb.apps.googleusercontent.com",
  "sub":"105954656735327480941",
  "email":"vahe1816@gmail.com",
  "email_verified":"true",
  "at_hash":"R0TWVEbePx2wNoUkj1bsvw",
  "name":"Vahe Minasyan",
  "picture":"https://lh6.googleusercontent.com/-LtMAdRBeMjk/AAAAAAAAAAI/AAAAAAAAAKU/CoYbRdjPDV8/s96-c/photo.jpg",
  "given_name":"Vahe",
  "family_name":"Minasyan",
  "locale":"en",
  "iat":"1549748780",
  "exp":"1549752380",
  "jti":"41f1b20282c6d3778918c94241c8a827d3226a11",
  "alg":"RS256",
  "kid":"7c309e3a1c1999cb0404ab7125ee40b7cdbcaf7d",
  "typ":"JWT"}

  */