const Task = require("../database/models/Task");

module.exports = (req, res) => {
    // console.log(req.body);
    Task.create({
        ...req.body,
        createdby: req.session.userId
    }, (error, task) => {
        res.redirect('/')
    })
};