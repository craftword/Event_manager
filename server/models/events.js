'use strict';
const Events = (sequelize, DataTypes) => {
    const Events = sequelize.define('Events', {
       centerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        eventType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        venue: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        contactPhone: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        contactEmail: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        date: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: {
            args: true,
            msg: 'Center is already been booked.'
          },
        },
        time: {
          type: DataTypes.STRING,
          allowNull: false,
        },
          
    });
    Events.associate = (models) => {
      Events.belongsTo(models.Users, { foreignKey: 'userId' });
      Events.belongsTo(models.Centers, { foreignKey: 'centerId' });
    };
    
    
    return Events;
};

export default Events;