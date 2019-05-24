const Client = require("../database/models/Client");

module.exports = (req, res) => {
    // console.log(req.body)
    Client.create({
        ...req.body,
        createdby: req.session.userId
    }, (error, client) => {
        res.redirect('/')
    })
}