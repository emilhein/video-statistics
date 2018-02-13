'use strict'
const testData = require('../../helpers/datapoint')
const _ = require('lodash')

const fillArrayWithNumbers = n => {
    var arr = Array.apply(null, Array(n));
    return arr.map((x, i) => i);
}

const secondsArray = fillArrayWithNumbers(361)

const seedBrowsers = Controller => {
    const seedPromise = []
    testData.browsers.map(browser => {
        seedPromise.push(Controller.create({name: browser}))
    })
    return Promise.all(seedPromise)
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err))
}


const seedVideos = Controller => {
    const seedPromise = []
    testData.videos.map(video => {
        seedPromise.push(Controller.create({id: video, length: 360}))
    })

    return Promise.all(seedPromise)
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err))
}


const seedVideoStats = Controller => {
    const seedPromise = []
    let data = {}
    secondsArray.map(number => data[number] = 0)   
    testData.videos.map((video, no) => {
        seedPromise.push(Controller.create({
            id: no,
            video_id: video, 
            views: 0,
            data: data
        }))
    })

    return Promise.all(seedPromise)
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err))
}



module.exports = {
    seedBrowsers,
    seedVideos,
    seedVideoStats
}