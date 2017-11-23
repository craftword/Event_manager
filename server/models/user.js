"use strict";

const Users = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullname: {
            
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true, 
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
              
    });
     // class methods
     Users.associate = (models) => {
       Users.hasMany(models.Centers, { as: 'Center', foreignKey: 'userId' });
  };    

    return Users;Location
};


export default Users;