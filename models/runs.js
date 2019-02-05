module.exports = function(sequelize, DataTypes) {
  var Runs = sequelize.define("Runs", {
    date: DataTypes.STRING,
    distance: DataTypes.FLOAT
  });
  return Runs;
};
