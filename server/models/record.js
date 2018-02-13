'use strict';
module.exports = (sequelize, DataTypes) => {
  let Record = sequelize.define('Record', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }, 
    user_ip: DataTypes.STRING,
    play_start: DataTypes.FLOAT,
    play_end: DataTypes.FLOAT,
    browser_id: DataTypes.INTEGER,
    video_id: DataTypes.INTEGER
  });

  // User.associate = models => models.User.hasMany(models.Task);
  

  return Record;
};