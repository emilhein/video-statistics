'use strict'
const testData = require('../../helpers/datapoint')
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


module.exports = {
    seedBrowsers,
    seedVideos
}