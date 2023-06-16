const crypto = require("crypto")

module.exports = (req, res) => {
    body = {error: true, message: "Username or password does not exist."}

    if (req.localdatabase.users.find(req.body.username) && req.localdatabase.users.find(req.body.username).password === req.body.password) {
        sessionid = crypto.randomUUID();

        req.localdatabase.users.addSession(req.body.username, sessionid);
        req.localdatabase.sessionids.push(sessionid, {username: req.body.username, sessionid: sessionid});

        res.cookie("sessionid", sessionid, {httpOnly: true, secure: true, sameSite: "none"});
        res.cookie("loggedin", JSON.stringify({username: req.body.username}), {httpOnly: false, secure: true, sameSite: "none"});

        body = {error: false, message: "Signed in succesfully.", signedin: true};
    }

    res.send(body);
}