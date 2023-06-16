module.exports = async (req, res) => {
    time = req.localdatabase.users.find(await req.localdatabase.sessionids.find(req.cookies.sessionid).username).game.free;
    timeLeft = 86400000 - (Date.now() - time);
    if (timeLeft / 86400000 > 1 || timeLeft / 86400000 < 0) {
        body = {freereward: true}
    } else {
        hoursremaining = Math.floor(timeLeft / 3600000);
        if (hoursremaining >= 1) {
            timeleftLabel = `${hoursremaining} hours`;
        } else {
            minutesremaining = Math.floor(timeLeft / 60000);
            timeleftLabel = `${minutesremaining} minutes`;
        }
        body = {freereward: false, timeleft: timeleftLabel};
    }
    res.send(body);
}