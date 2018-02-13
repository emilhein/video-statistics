'use strict';
module.exports = (sequelize, DataTypes) => {
  let Video = sequelize.define('Video', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    }, 
    length: DataTypes.INTEGER,
  });
  return Video;
};