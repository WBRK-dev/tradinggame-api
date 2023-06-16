const crypto = require("crypto")

module.exports = (req, res) => {
    body = {error: true, message: "Username already exists."}

    if (!req.localdatabase.users.find(req.body.username)) {
        if (req.body.username.length >= 4 && req.body.password.length >= 8 && req.body.username.length <= 12 && req.body.password.length <= 16) {
            body = {error: false, message: "Created user succesfully.", createduser: true}

            newsessionid = {sessionid: crypto.randomUUID(), username: req.body.username};
            req.localdatabase.sessionids.push(newsessionid.sessionid, newsessionid);
            
            newuser = {username: req.body.username, password: req.body.password, game: {credits: 748395723489570345, inventory: {boxes: [], vaults: [], cards: []}, free: 0}, sessionids: [newsessionid.sessionid]};
            req.localdatabase.users.push(req.body.username, newuser);
            
            res.cookie("sessionid", newsessionid.sessionid, {httpOnly: true, secure: true, sameSite: "none"});
            res.cookie("loggedin", JSON.stringify({username: req.body.username}), {httpOnly: false, secure: true, sameSite: "none"});
        } else {
            if (req.body.username.length < 4 || req.body.username.length > 12) {
                body = {error: true, message: "Username must be between 4 and 12 characters."};
            } else if (req.body.password.length < 8 || req.body.password.length > 16) {
                body = {error: true, message: "Password must be between 8 and 16 characters."};
            }
        }
    }

    res.send(body);
}