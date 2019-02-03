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

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  // Submit new activity to database
  app.post("/", function(req, res) {
    res.render("index");
  });
};
