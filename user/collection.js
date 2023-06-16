module.exports = (req, res) => {
    user = req.localdatabase.users.find(req.localdatabase.sessionids.find(req.cookies.sessionid).username);
    res.send({boxes: user.game.inventory.boxes, vaults: user.game.inventory.vaults, cards: user.game.inventory.cards});
}