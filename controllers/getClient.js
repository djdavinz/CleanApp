const Client = require('../database/models/Client')

module.exports = async(req, res) => {
    // console.log(req.params)
    const client = await Client.findById(req.params.id).populate('createdby')
    res.render('detailClient', { client })
}