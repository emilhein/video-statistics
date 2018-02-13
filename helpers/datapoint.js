'use strict'
const Faker = require('faker')
const _ = require('lodash')
const browsers = ['Google Chrome', 'Firefox', 'Internet explorer', 'Safari']
const videos = [234, 1, 23, 432, 235, 55, 34]
const getBrowsers = number => browsers[number]
const getVideos = number => videos[number]

const getRandomArbitrary = max => Math.floor(Math.random() * max);
const getRandomTime = () => (Math.random() * 360).toFixed(3)


const getRandomBrowser = _.flowRight(getBrowsers, getRandomArbitrary);
const getRandomVideo = _.flowRight(getVideos, getRandomArbitrary);
const sortNumber = (a, b) => a - b;

const getSortedTimes = () => {
    const randomTimes = [getRandomTime(), getRandomTime()];
    randomTimes.sort(sortNumber)
    const values = {
        play_start: randomTimes[0],
        play_end: randomTimes[1]
    }
    return values
}


const getDataPoint = () => {
    const sortedTimes = getSortedTimes()
    let datapoint = {
        user_ip: Faker.internet.ip(),
        user_agent: getRandomBrowser(browsers.length),
        video_id: getRandomVideo(videos.length)
    }
    Object.assign(datapoint, sortedTimes)
    return datapoint
}

module.exports = {
    getDataPoint,
    browsers,
    videos
}