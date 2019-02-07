require("dotenv").config();

// Google
var http = require('http');
var Session = require('express-session');

var express = require("express");
var exphbs = require("express-handlebars");
//var login = require("./routes/loginroutes");

var db = require("./models");

// BEGIN GOOGLE
var { google } = require('googleapis');
var plus = google.plus('v1');
const OAuth2 = google.auth.OAuth2;
const ClientId = "998275819899-rjr5qft278mhidlpbbp08uvfttk8ed9v.apps.googleusercontent.com";
const ClientSecret = "ylmjsFksC0VZ_WSAZJEqnUK5";
const RedirectionUrl = "http://localhost:3000/oauthCallback/";

function getOAuthClient () {
  return new OAuth2(ClientId ,  ClientSecret, RedirectionUrl);
}

function getAuthUrl () {
  var oauth2Client = getOAuthClient();
  // generate a url that asks permissions for Google+ and Google Calendar scopes
  var scopes = [
    'https://www.googleapis.com/auth/plus.me'
  ];

  var url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes // If you only need one scope you can pass it as string
  });

  return url;
}

var app = express();
var PORT = process.env.PORT || 3000;

app.use(Session({
  secret: 'raysources-secret-19890913007',
  resave: true,
  saveUninitialized: true
}));

app.use("/oauthCallback", function (req, res) {
  var oauth2Client = getOAuthClient();
  var session = req.session;
  var code = req.query.code;
  oauth2Client.getToken(code, function(err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    if(!err) {
      oauth2Client.setCredentials(tokens);
      session["tokens"]=tokens;
      res.redirect("/");
    }
    else{
      res.send(`
          &lt;h3&gt;Login failed!!&lt;/h3&gt;
      `);
    }
  });
});
// END GOOGLE

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");
app.set("loginUrl", getAuthUrl());

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/loginroutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
