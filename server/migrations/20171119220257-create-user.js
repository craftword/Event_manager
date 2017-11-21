'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => 
      queryInterface.createTable('Users', {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
          username: {
              type: Sequelize.STRING,
              unique: true,
              allowNull: false
          },
          password: {
              allowNull: false,
              type: Sequelize.STRING
          },
          fullname: {
              allowNull: false,
              type: Sequelize.STRING
          },
          email: {
              allowNull: false,
              type: Sequelize.STRING
          },
          phone: {
              allowNull: false,
              type: Sequelize.STRING
          },
          createdAt: {
              allowNull: false,
              type: Sequelize.DATE
          },
          updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
          },
      }),  
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable('Users'),
};