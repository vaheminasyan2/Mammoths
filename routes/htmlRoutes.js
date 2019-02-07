var db = require("../models");

module.exports = function (app) {

  app.get("/home", function(req, res) {
    res.render("index")
  });

  
  app.get("/", function(req, res) {
    res.render("login")
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
  app.post("/home", function(req, res) {
    res.render("index");
  });

};
