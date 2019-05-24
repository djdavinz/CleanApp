const Worker = require("../database/models/Worker");

module.exports = (req, res) => {
    // console.log(req.body)
    Worker.create({
        ...req.body,
        createdby: req.session.userId
    }, (error, worker) => {
        res.redirect('/')
    })
}