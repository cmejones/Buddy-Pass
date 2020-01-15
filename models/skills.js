'use strict';
module.exports = (sequelize, DataTypes) => {
  const skills = sequelize.define('skills', {
    funcArea: DataTypes.INTEGER,
    skill: DataTypes.STRING
  }, {});
  skills.associate = function(models) {
    // associations can be defined here
  };
  return skills;
};