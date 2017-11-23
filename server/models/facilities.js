'use strict';
const Facilities = (sequelize, DataTypes) => {
    const Facilities = sequelize.define('Facilities', {
      centerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        check: {
          type: DataTypes.STRING,
          allowNull: false,
        },
                 
    });
    Facilities.associate = (models) => {
        Facilities.belongsTo(models.Centers, {
          foreignKey: 'centerId',
          onDelete: 'CASCADE',
        });
      };

    return Facilities;
};

export default Facilities;