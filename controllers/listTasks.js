const Task = require('../database/models/Task')

module.exports = async(req, res) => {
    const tasks = await Task.find({})
        // console.log(tasks)
    res.render('task', { tasks })
}