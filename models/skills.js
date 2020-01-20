'use strict';
module.exports = (sequelize, DataTypes) => {
  const FunctionalAreas = sequelize.define('FunctionalAreas', { name: DataTypes.STRING });
  //const userSkills = sequelize.define('userSkills', { name: DataTypes.STRING });
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
    skills.belongsTo(models.FunctionalAreas, { as: 'functional_area', foreignKey: 'funcArea'});

    //skills.belongsToMany(models.users, {as: 'Strengths', through: models.userSkills, foreignKey: 'user_id'});
  };
  return skills;
};