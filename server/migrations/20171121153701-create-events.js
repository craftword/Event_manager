'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      eventType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      venue: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contactPhone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      contactEmail: {
        allowNull: false,
        type: Sequelize.STRING
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING
      },
      time: {
        allowNull: false,
        type: Sequelize.STRING
      },
      centerId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
            model: "Centers",
            key: "id",
            as: "centerId",
        },
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: "CASCADE",
      references: {
          model: "Users",
          key: "id",
          as: "userId",
      },
  },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Events');
  }
};