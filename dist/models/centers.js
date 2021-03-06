'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Centers = (sequelize, DataTypes) => {
  const Centers = sequelize.define('Centers', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Center name must be unique.'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    venueType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    policy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  });
  // class methods
  Centers.associate = models => {
    Centers.belongsTo(models.Users, { foreignKey: 'userId' });
    Centers.hasMany(models.Events, { as: 'Event', foreignKey: 'centerId' });
  };

  return Centers;
};

exports.default = Centers;