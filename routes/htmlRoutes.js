var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    // if we dont have tokens, go to login page
    if (!req.session["tokens"]) {
      res.redirect("/login");
    } else {
      db.Runs.findAll({}).then(function (dbRuns) {
        res.render("index", {
          msg: "Welcome!",
          runs: dbRuns,
        });
      });
    }
  });

  app.get("/login", function (req, res) {
    // if we already have tokens, go to home page
    if (req.session["tokens"]) {
      res.redirect("/");
    } else {
      res.render("login", {
        loginUrl: app.get("loginUrl")
      });
    }
  });

  app.get("/register", function (req, res) {
    res.render("register");
  });

  // clear tokens and redirect for logout
  app.get("/logout", function (req, res) {
    req.session["tokens"] = undefined;
    res.redirect("/login");
  });

  // Load example page and pass in an example by id
  app.get("/runs/:id", function (req, res) {
    db.Runs.findOne({ where: { id: req.params.id } }).then(function (dbRun) {
      res.render("run", {
        run: dbRun
      });
    });
  });

  // Get Post Activity page
  app.get("/post-activity", function (req, res) {
    res.render("post-activity");
  });

  // Get Plan page
  app.get("/plan", function (req, res) {
    res.render("plan");
  });

  // Get History page
  app.get("/history", function (req, res) {
    res.render("history");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  // Submit new activity to database
  app.post("/", function(req, res) {
    res.render("index");
  });
};
