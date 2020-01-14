'use strict';
module.exports = (sequelize, DataTypes) => {
  const FunctionalAreas = sequelize.define('FunctionalAreas', {
    function: DataTypes.STRING
  }, {});
  FunctionalAreas.associate = function(models) {
    // associations can be defined here
  };
  return FunctionalAreas;
};