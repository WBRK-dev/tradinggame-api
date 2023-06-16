module.exports = (req, res) => {
    boxcost = {box: {common: 100, uncommon: 300, rare: 500, very_rare: 1000, epic: 2000, ultra_epic: 5000, legendary: 50000, omega: 500000, omega_ultra: 1000000}, vault: {vault: 2000000}};
    credits = req.localdatabase.users.find(req.localdatabase.sessionids.find(req.cookies.sessionid).username).game.credits;
    if (credits >= boxcost[req.body.type][req.body.rarity]) {
        req.localdatabase.users.currency(req.localdatabase.sessionids.find(req.cookies.sessionid).username, boxcost[req.body.type][req.body.rarity], 1);
        req.localdatabase.users.addBoxVault(req.localdatabase.sessionids.find(req.cookies.sessionid).username, req.body.type, req.body.rarity);
        body = {error: false}
    } else {body = {error: true, message: "Insufficient amount of credits."}}
    res.send(body);
}