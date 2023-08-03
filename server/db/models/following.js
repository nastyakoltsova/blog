'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Following extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Following.belongsTo(models.User, {
        foreignKey: 'follower',
      });
      Following.belongsTo(models.User, {
        foreignKey: 'followsTo',
      });
    }
  }
  Following.init({
    follower: DataTypes.INTEGER,
    followsTo: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Following',
  });
  return Following;
};
