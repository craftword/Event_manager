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
          type: DataTypes.DATE,
          allowNull: false,
        },
        time: {
          type: DataTypes.DATE,
          allowNull: false,
        },
          
    }, 
    {
        associate: (models) => {
            Events.belongsTo(models.Centers, {
                foreignKey: 'centerId',
                onDelete: 'CASCADE',
            });
            Events.belongsTo(models.Users, {
              foreignKey: 'userId',
              onDelete: 'CASCADE',
          });
        },
    });
    
    return Events;
};

export default Events;