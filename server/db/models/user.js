'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.News, {
        foreignKey: 'userId',
      });
      User.hasMany(models.Followings, {
        foreignKey: 'follower',
      });
      User.hasMany(models.Followings, {
        foreignKey: 'followsTo',
      });
    }
  }

  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
