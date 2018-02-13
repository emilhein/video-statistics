'use strict';
module.exports = (sequelize, DataTypes) => {
  let Browser = sequelize.define('Browser', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    name: DataTypes.STRING,
  });

  // User.associate = models => models.User.hasMany(models.Task);
  
  return Browser;
};