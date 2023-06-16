module.exports = (req, res, next) => {
    req.localdatabase = require('./database.js');
    next();
}