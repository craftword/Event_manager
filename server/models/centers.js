'use strict';
const Centers = (sequelize, DataTypes) => {
    const Centers = sequelize.define('Centers', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        venueType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        capacity: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        policy: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
          
    });
  // class methods
  Centers.associate = ((models) => {
    Centesr.hasMany(models.Events, {
      foreignKey: 'centerId',
      // as: 'events',
    });
  });
   // class methods
   Centers.associate = ((models) => {
    Centers.hasMany(models.Facilities, {
      foreignKey: 'centerId',
      // as: 'facilities',
    });
  });
    
    return Centers;
};

export default Centers;