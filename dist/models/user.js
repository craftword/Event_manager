"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const Users = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Username taken! Please enter a new username.'
            }

        },
        password: {
            type: DataTypes.STRING,
            allowNull: false

        },
        fullname: {

            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });
    // class methods
    Users.associate = models => {
        Users.hasMany(models.Centers, { as: 'Center', foreignKey: 'userId' });
    };

    return Users;
};

exports.default = Users;