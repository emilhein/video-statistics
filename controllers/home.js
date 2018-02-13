const RecordController = require('../server/controllers/record')
const datapoints = require('../helpers/datapoint')

exports.index = (req, res) => { 
  const getData = []
  datapoints.videos
  .map(videoId => {
    
    getData.push(RecordController.getAllIps(videoId))

    // getData.push(RecordController.totalRecordsById(videoId))
  })

  Promise.all(getData)
  .then(data => {
    data.map(videoIps => {
      videoIps.map(ip => {
        console.log(ip.user_ip);
      })
    })
    res.render('home', {
      title: 'Home',
      data: data
    });
  })
};