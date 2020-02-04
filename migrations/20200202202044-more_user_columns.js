'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'favorite_job_tasks',
        Sequelize.TEXT
      ),
      queryInterface.addColumn(
        'users',
        'to_learn',
        Sequelize.TEXT
      ),
      queryInterface.addColumn(
        'users',
        'interests',
        Sequelize.TEXT
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'favorite_job_tasks'),
      queryInterface.removeColumn('users', 'to_learn'),
      queryInterface.removeColumn('users', 'interests'),      
    ])
  }
};
