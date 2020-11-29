const start = require('../src')

start({
    startData: {
        "pictures": [{
            "name": "name1",
            "author": "author1",
            "description": "description1",
            "cost": 99999,
            "img": "img2.jpg"
        }]
    }
})
    .then(() => require('./allTests')())
    .then(() => run())
