module.exports = function(sequelize, DataTypes) {
    var Routes = sequelize.define("Routes", {
      name: DataTypes.STRING,
      distance: DataTypes.FLOAT
    });

    return Routes;
  };
  