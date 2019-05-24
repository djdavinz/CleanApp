const request = require('request')

module.exports = {
    make_API_call: function(surl) {
        return new Promise((resolve, reject) => {
            var options = {
                url: surl,
                headers: {
                    'Authorization': 'org_test_sk_f12d68ca6a9f2293c7364dfba9cf8c127a2705aa',
                    'json': 'true'
                }
            };
            request(options, (err, res, body) => {
                if (err) reject(err)
                resolve(body)
            });
        })
    }
}