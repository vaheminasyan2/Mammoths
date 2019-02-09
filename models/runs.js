module.exports = function(sequelize, DataTypes) {
  var Runs = sequelize.define("Runs", {
    date: DataTypes.STRING,
    distance: DataTypes.FLOAT
  });

  Runs.associate = function(models) {
    Runs.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  
  return Runs;
};
