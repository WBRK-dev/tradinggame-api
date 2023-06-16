module.exports = async (req, res) => {
    req.localdatabase.users.currency(req.localdatabase.sessionids.find(req.cookies.sessionid).username, 100);
    req.localdatabase.users.resetFreeReward(req.localdatabase.sessionids.find(req.cookies.sessionid).username);
    res.send({error: false});
}