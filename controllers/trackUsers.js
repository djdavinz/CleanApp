const api_helper = require("../public/jss/apiHelper");

module.exports = (req, res) => {
    api_helper.make_API_call('https://api.radar.io/v1/users')
        .then(response => {
            res.json(response)
        })
        .catch(error => {
            res.send(error)
        })
};