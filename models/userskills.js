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
  }
  });
  userSkills.associate = function(models) {
    // associations can be defined here
    Users.belongsToMany(Skills, {through: 'userSkills'});
    Skills.belongsToMany(Users, { through: 'userSkills'});
  };
  return userSkills;
};