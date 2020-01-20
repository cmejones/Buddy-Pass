'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', { name: DataTypes.STRING });
  const Skills = sequelize.define('Skills', { name: DataTypes.STRING });
  const userSkills = sequelize.define('userSkills', {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model:Users,
        key:'id'
      }
    },
    skills_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Skills,
        key:'id'
      }
  },
  weaknesses_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Skills,
      key:'id'
      }
  },
  goals_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Skills,
      key:'id'
      }
  }
  });
  userSkills.associate = function(models) {
    // associations can be defined here
    userSkills.belongsTo(models.skills, { as: 'strengths', foreignKey: 'skills_id'});
    userSkills.belongsTo(models.skills, { as: 'weaknesses', foreignKey: 'weaknesses_id'});
    userSkills.belongsTo(models.skills, { as: 'goals', foreignKey: 'goals_id'});
   // Users.belongsToMany(Skills, {through: 'userSkills', foreignKey: 'user_id'});
    //userSkills.belongsTo(Skills, {through: 'userSkills'});
    //Skills.belongsTo(userSkills);
    //userSkills.hasMany(Skills);
  };
  return userSkills;
};