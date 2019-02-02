module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });
  return Users;
};
