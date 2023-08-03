'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      News.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }

  News.init({
    userId: DataTypes.INTEGER,
    newsText: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'News',
  });

  return News;

};
