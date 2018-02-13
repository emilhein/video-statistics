'use strict'

const datapoint = require('./datapoint')

const VideoController = require('../server/controllers/video')
const VideoStatsController = require('../server/controllers/videostats')
const BrowserController = require('../server/controllers/browser')
const RecordController = require('../server/controllers/record')

const Seeder = require('../server/seed/seed')



const feedData = () => {
  const browsers = Seeder.seedBrowsers(BrowserController)
  const videos = Seeder.seedVideos(VideoController)
  const videoStat = Seeder.seedVideoStats(VideoStatsController)
  return Promise.all([browsers, videos, videoStat])
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err))
}

const saveDataPoint = input => {
  return new Promise((resolve, reject) => {
    BrowserController.getBrowserId({
        name: input.user_agent
      })
      .then(data => {
        let record = {
          user_ip: input.user_ip,
          play_start: input.play_start,
          play_end: input.play_end,
          browser_id: data,
          video_id: input.video_id
        }
        return RecordController.create(record)
      })
      .then(recordCreated => VideoStatsController.getStatById(input.video_id))
      .then(videoStat => doVideoStatCalculation(videoStat, input))
      .then(theNewStat => VideoStatsController.updateStatById(input.video_id, theNewStat))
      .then(success => resolve(success))
      .catch(err => reject(err))
  });
}

const doVideoStatCalculation = (currentStat, datapoint) => {
  const watchStat = currentStat
  const start = Math.round(datapoint.play_start)
  const end = Math.round(datapoint.play_end)
  const arrayOfWatchedSeconds = getArrayFromStartToEnd(start, end)
  arrayOfWatchedSeconds.map(SpecificSecond => watchStat.video_watch_data[SpecificSecond] = watchStat.video_watch_data[SpecificSecond] + 1)
  delete watchStat.id;
  return watchStat
}


const getArrayFromStartToEnd = (start, end) => {
  var list = [];
  for (var i = start; i <= end; i++) {
    list.push(i);
  }
  return list
}
const createRecordEveryXSecound = seconds => {
  setTimeout(() => {
    saveDataPoint(datapoint.getDataPoint())
      .then(data => console.log('there should be a new record'))
      .catch(err => console.log('err: ', err))
    createRecordEveryXSecound(seconds);
  }, seconds * 1000);
}

module.exports = {
  createRecordEveryXSecound,
  feedData
}