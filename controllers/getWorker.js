const Worker = require('../database/models/Worker')

module.exports = async(req, res) => {
    // console.log(req.params)
    const worker = await Worker.findById(req.params.id).populate('createdby')
    res.render('detailWorker', { worker })
}