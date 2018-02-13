const Record = require('../models').Record;

module.exports = {
  create(input) {
    return new Promise((resolve, reject) => {
      Record
        .create({
          user_ip: input.user_ip,
          play_start: input.play_start,
          play_end: input.play_end,
          browser_id: input.browser_id,
          video_id: input.video_id
        })
        .then(record => resolve(record))
        .catch(error => reject(error));
    });
  },
  totalRecordsById(id) {
    return new Promise((resolve, reject) => {
      Record.count({ where: {video_id: id}})
      .then(record => resolve({id, count:record}))
      .catch(error => reject(error));
    });
  },
  getAllIps(id) {
    return new Promise((resolve, reject) => {
      Record.findAll({
        group: ['user_ip', 'id'], 
        where: {
          video_id: id
        }
      })
      .then(record => resolve(record))
      .catch(error => reject(error));
    });
  }
};
