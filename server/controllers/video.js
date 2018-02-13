const Video = require('../models').Video;

module.exports = {
  create(input) {
    return new Promise((resolve, reject) => {
      Video
        .create({
          id: input.id,
          length: input.length,
        })
        .then(video => resolve(video))
        .catch(error => reject(error));
    });
  }
};
