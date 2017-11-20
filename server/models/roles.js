"use strict";

const Roles = (sequelize, DataTypes) => {
    const Recipes = sequelize.define("Roles", {
        Name: {
            type: DataTypes.STRING,
            allowNull: false,            
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
        
           
    });
    Roles.associate = (models) => {
      Roles.belongsTo(models.Users, {
            foreignKey: "userId",
            onDelete: "CASCADE",
        });
             
    };
    

    return Roles;
};

export default Roles;
