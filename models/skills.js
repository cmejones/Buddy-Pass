'use strict';
module.exports = (sequelize, DataTypes) => {
  const FunctionalAreas = sequelize.define('FunctionalAreas', { name: DataTypes.STRING });
  const skills = sequelize.define('skills', {
    funcArea: {
      type: DataTypes.INTEGER,
      references: {
        model:FunctionalAreas,
        key: 'id'
      }
    },
    skill: DataTypes.STRING
  }, {});
  skills.associate = function(models) {
    // associations can be defined here
    FunctionalAreas.belongsTo(skills);
    skills.hasMany(FunctionalAreas);
  };
  return skills;
};