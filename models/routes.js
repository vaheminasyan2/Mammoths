module.exports = function(sequelize, DataTypes) {
    var Routes = sequelize.define("Routes", {
      name: DataTypes.STRING,
      distance: DataTypes.FLOAT,
      wayPoints: DataTypes.STRING
    });

    Routes.associate = function(models) {
      Routes.belongsTo(models.Users, {
        allowNull: false
      });
    };

    return Routes;
  };
  