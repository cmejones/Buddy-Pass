'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'provider',
        Sequelize.STRING
      ),
      queryInterface.addColumn(
        'users',
        'profile',
        Sequelize.JSON
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    
    return Promise.all([
      queryInterface.removeColumn('users', 'provider'),
      queryInterface.removeColumn('users', 'profile'),
    ])
  }
};
