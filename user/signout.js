module.exports = (req, res) => {
    try {
        req.localdatabase.users.remove(JSON.parse(req.cookies.loggedin).username, req.cookies.sessionid);
        req.localdatabase.sessionids.remove(req.cookies.sessionid);
        body = {error: false, message: "Logged out."};
    } catch (error) {
        body = {error: true, message: error};
    }
    res.clearCookie("loggedin");
    res.clearCookie("sessionid");
    res.send(body)
}