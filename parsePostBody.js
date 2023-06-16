module.exports = (req, res, next) => {
    if (req.body) {
        req.body = JSON.parse(Object.keys(req.body)[0]);
    }
    next();
}