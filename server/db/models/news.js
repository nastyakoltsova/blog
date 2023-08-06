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
    newsText: DataTypes.STRING,
    photoPath: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'News',
  });

  return News;

};
