var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/runs", function (req, res) {
    db.Runs.findAll({}).then(function (dbRuns) {
      res.json(dbRuns);
    });
  });

  // Create a new example
  app.post("/api/runs", function (req, res) {
    db.Runs.create(req.body).then(function (dbRun) {
      res.json(dbRun);
    });
  });

  // Delete an example by id
  app.delete("/api/runs/:id", function (req, res) {
    db.Runs.destroy({ where: { id: req.params.id } }).then(function (dbRun) {
      res.json(dbRun);
    });
  });

  // Create a new user with a validation to check if that user already exisits in the database. It'll check against user's email. Return false if an user with same email has been found
  app.post("/api/register", function (req, res) {
    db.Users.findOrCreate({
      where: {email: req.body.email},
      defaults: {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        password: req.body.password
      }
    }).spread(user,created).then(function (dbUser) {
      res.json(dbUser);
    })
  })
};
