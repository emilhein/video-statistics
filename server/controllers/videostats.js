const VideoStats = require('../models').VideoStat;

module.exports = {
  create(input) {
    return new Promise((resolve, reject) => {
      VideoStats
        .create({
          id: input.id,
          video_id: input.video_id,
          unique_views: input.views,
          video_watch_data: input.data
        })
        .then(videoStats => resolve(videoStats))
        .catch(error => reject(error))
    });
  },
  getStatById(id) {
    return new Promise((resolve, reject) => {
      VideoStats.findAll({
          where: {
            video_id: id
          }
        })
        .then(record => {
          let secondData = record[0].dataValues.video_watch_data
          let watchArray = []
          Object.keys(secondData)
          .forEach(second => watchArray.push(secondData[second]))
          record[0].dataValues.watchArray = watchArray
         return resolve(record[0].dataValues)
        })
        .catch(error => reject(error));
    });
  },
  updateStatById(id, newStat) {
    return new Promise((resolve, reject) => {
      VideoStats.update(newStat, {
          where: {
            video_id: id
          }
        })
        .then(record => resolve(record))
        .catch(error => reject(error));
    });
  }
};