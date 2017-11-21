'use strict';
module.exports = (sequelize, DataTypes) => {
  var Facilities = sequelize.define('Facilities', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Facilities;
};