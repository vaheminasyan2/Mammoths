var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  app.get("/register", function (req, res) {
    res.render("register");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
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


  app.get("/goTo", function(req, res) {
    res.render(req.params.page);
  });

  // Submit new activity to database
  app.post("/", function(req, res) {
    res.render("index");
  });
};
