const jwt = require('jsonwebtoken');

const generateToken = (aid = '') => {

    return new Promise((resolve, reject) => {

        jwt.sign({ aid }, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '1h'
        }, (err, token) => {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    })
}

module.exports = {
    generateToken
}