module.exports = (req, res) => {
    type = req.body.type;
    rarity = req.body.rarity;

    rolls = 0; chance = 1;
    cards = []; chances = {first: 0.1, second: 0.15, silver: 0.02, gold: 0.01};
    if (req.localdatabase.users.removeBoxVault(req.localdatabase.sessionids.find(req.cookies.sessionid).username, type, rarity)) {
        if (type === "box" && rarity === "common") {
            rolls = Math.round(Math.random() * 2) + 1;
        } else if (type === "box" && rarity === "uncommon") {
            rolls = Math.round(Math.random() * 2) + 2;
            chance = 1.4;
        } else if (type === "box" && rarity === "rare") {
            rolls = Math.round(Math.random() * 4) + 2;
            chance = 1.8;
        } else if (type === "box" && rarity === "very_rare") {
            rolls = Math.round(Math.random() * 4) + 5;
            chance = 2.2;
        } else if (type === "box" && rarity === "epic") {
            rolls = Math.round(Math.random() * 5) + 7;
            chance = 2.8;
        } else if (type === "box" && rarity === "ultra_epic") {
            rolls = Math.round(Math.random() * 7) + 10;
            chance = 3.4;
        } else if (type === "box" && rarity === "legendary") {
            rolls = Math.round(Math.random() * 15) + 10;
            chance = 4;
        } else if (type === "box" && rarity === "omega") {
            rolls = Math.round(Math.random() * 15) + 15;
            chance = 4.6;
        } else if (type === "box" && rarity === "omega_ultra") {
            rolls = Math.round(Math.random() * 20) + 20;
            chance = 5;
        } else if (type === "vault") {
            rolls = Math.round(Math.random() * 50) + 50;
            chance = 7.5;
        }


        for (let i = 0; i < rolls; i++) {
            generatedCard = {first: 0, second: 0, silver: false, gold: false}
            generatedCard.silver = (Math.random() < chances.silver * chance) ? true : false;
            generatedCard.gold = (Math.random() < chances.gold * chance) ? true : false;

            rollingFirst = true;
            while (rollingFirst) {
                if (Math.random() < chances.first * chance) {
                    generatedCard.first += 1;
                } else {
                    rollingFirst = false;
                }
                if (generatedCard.first === 3) {rollingFirst = false}
            }

            rollingSecond = true;
            while (rollingSecond) {
                if (Math.random() < chances.second * chance) {
                    generatedCard.second += 1;
                } else {
                    rollingSecond = false;
                }
                if (generatedCard.second === 12) {rollingSecond = false}
            }

            cards.push(generatedCard);

            req.localdatabase.users.cards(req.localdatabase.sessionids.find(req.cookies.sessionid).username, generatedCard, "add");
        }
    }
    res.send({error:false, cards: cards});
}