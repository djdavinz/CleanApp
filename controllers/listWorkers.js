const Worker = require('../database/models/Worker')

module.exports = async(req, res) => {
    const workers = await Worker.find({})
        // console.log(workers)
    res.render('worker', { workers })
}