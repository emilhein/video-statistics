'use strict';
module.exports = (sequelize, DataTypes) => {
  let VideoStat = sequelize.define('VideoStat', {
    id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      primaryKey: true
      }, 
    video_id: DataTypes.INTEGER,
    unique_views: DataTypes.INTEGER,
    video_watch_data: DataTypes.JSON
  });

  return VideoStat;
};