'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    photo: DataTypes.STRING,
    title: DataTypes.STRING,
    department: DataTypes.STRING,
    bio: DataTypes.TEXT,
    photo: DataTypes.STRING,
    communication: DataTypes.STRING,
    provider: DataTypes.STRING,
    profile: DataTypes.JSON
  }, {});
  users.associate = function(models) {
    // associations can be defined here
    users.hasOne(models.userSkills, { foreignKey: 'user_id' }); //this association is breaking the createSkillsAssocation function when more than one is added to table
    
    //users.belongsTo(models.userSkills, { foreignKey: 'user_id' }); //this breaks the LinkedIn authentication, I think
    //Users.belongsToMany(models.Skills, {as: 'User', through: models.userSkills});

  };
  return users;
};