'use strict'

const datapoint = require('./datapoint')
const VideoController = require('../server/controllers/video')
const BrowserController = require('../server/controllers/browser')
const RecordController = require('../server/controllers/record')

const Seeder = require('../server/seed/seed')
Seeder.seedBrowsers(BrowserController)
Seeder.seedVideos(VideoController)


const createRecord = input => {
  return new Promise((resolve, reject) => {
    BrowserController.getBrowserId({name: input.user_agent})
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
    .then(success => resolve(success))
    .catch(err => reject(err))
  });
}

const createRecordEveryXSecound = seconds => {
  setTimeout(() => {
    createRecord(datapoint.getDataPoint())
    .then(data => console.log('there should be a new record'))
    .catch(err => console.log('err: ', err))
    createRecordEveryXSecound(seconds);
  }, seconds*1000);
}

module.exports = {
    createRecordEveryXSecound
}