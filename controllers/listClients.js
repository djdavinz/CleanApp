const Client = require('../database/models/Client')

module.exports = async(req, res) => {
    const clients = await Client.find({})
        // console.log(clients)
    res.render('client', { clients })
}