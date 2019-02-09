var db = require("../models");
var axios = require("axios");

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

  // Create new user with a validation to check if that user already exists in the database. It'll check against user's id. Return false if an user with same email has been found
  app.post("/api/login", function (req, res) {
    var newUser = {};
    //console.log(req.body);
    axios.get('https://oauth2.googleapis.com/tokeninfo?id_token=' + req.body.idtoken)
      .then(function (response) {
        newUser = {
          name: response.data.name,
          email: response.data.email,
          id: response.data.sub
        }
      }).catch(function (error) {
        console.log(error);
      }).then(function () {
        //console.log(newUser);
        db.Users.findOrCreate({
          where: { id: newUser.id },
          defaults: {
            name: newUser.name,
            email: newUser.email
          }
        }).spread(user, created).then(function (dbUser) {
          res.json(dbUser);
        });
      });
  });




};