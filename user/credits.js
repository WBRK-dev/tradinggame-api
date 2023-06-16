module.exports = (req, res) => {
    credits = req.localdatabase.users.find(req.localdatabase.sessionids.find(req.cookies.sessionid).username).game.credits;
    res.send({credits: credits});
}