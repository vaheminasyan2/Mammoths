var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/runs", function(req, res) {
    db.Runs.findAll({}).then(function(dbRuns) {
      res.json(dbRuns);
    });
  });

  // Create a new example
  app.post("/api/runs", function(req, res) {
    db.Runs.create(req.body).then(function(dbRun) {
      res.json(dbRun);
    });
  });

  // Delete an example by id
  app.delete("/api/runs/:id", function(req, res) {
    db.Runs.destroy({ where: { id: req.params.id } }).then(function(dbRun) {
      res.json(dbRun);
    });
  });
};
