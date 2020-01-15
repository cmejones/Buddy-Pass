'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    title: DataTypes.STRING,
    department: DataTypes.STRING,
    bio: DataTypes.TEXT,
    strengths: DataTypes.INTEGER,
    weaknesses: DataTypes.INTEGER,
    goals: DataTypes.INTEGER,
    provider: DataTypes.STRING,
    profile: DataTypes.JSON
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};