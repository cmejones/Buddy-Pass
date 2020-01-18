'use strict';
module.exports = (sequelize, DataTypes) => {
  const FunctionalAreas = sequelize.define('FunctionalAreas', {
    functional_area: DataTypes.STRING
  }, {});
  FunctionalAreas.associate = function(models) {
    // associations can be defined here
  };
  return FunctionalAreas;
};