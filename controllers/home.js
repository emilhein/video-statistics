const RecordController = require('../server/controllers/record')
const VideoStatsController = require('../server/controllers/videostats')

const datapoints = require('../helpers/datapoint')

exports.index = (req, res) => {
  let videoViews
  getTotalViewsByID()
  .then(data => {
      videoViews = data
      return getVideoStatsById()
    })
    .then(otherdata => {
      res.render('home', {
        title: 'Home',
        data: videoViews,
        watchData: otherdata
      });
    })
};


const getTotalViewsByID = () => {
  const getData = []
  return new Promise((resolve, reject) => {
    datapoints.videos
      .map(videoId => getData.push(RecordController.totalRecordsById(videoId)))
    Promise.all(getData)
      .then(data => resolve(data))
      .catch(err => reject(err))
  });
}


const getVideoStatsById = () => {
  const getData = []
  return new Promise((resolve, reject) => {
    datapoints.videos
      .map(videoId => getData.push(VideoStatsController.getStatById(videoId)))
    Promise.all(getData)
      .then(data => resolve(data))
      .catch(err => reject(err))
  });
}