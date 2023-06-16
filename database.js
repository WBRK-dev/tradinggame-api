let users = {};
let sessionids = {};
let trades = [];

module.exports = {
    users: {
        get: function() {
            return users;
        },
        push: function(key_value, value) {
            users[key_value] = value;
        }, 
        find: function(username) {
            return users[username];
        },
        remove: function(username, sessionid) {
            for (let i = 0; i < users[username].sessionids.length; i++) {
                if (users[username].sessionids[i] === sessionid) {
                    users[username].sessionids.splice(i, 1);
                }
            }
        },
        addSession: function(username, sessionid) {
            users[username].sessionids.push(sessionid);
        },
        currency: function(username, amount, action) {
            if (action === 1) {
                if (users[username].game.credits >= amount) {
                    users[username].game.credits -= amount;
                    return true;
                } else {return false;}
            } else {
                users[username].game.credits += amount;
                return true;
            }
        },
        resetFreeReward: function(username) {
            users[username].game.free = Date.now();
        },
        addBoxVault: function(username, type, rarity) {
            if (type === "box") {
                users[username].game.inventory.boxes.push({type: type, rarity: rarity});
            } else if (type === "vault") {
                users[username].game.inventory.vaults.push({type: type, rarity: rarity});
            }
        },
        removeBoxVault: function(username, type, rarity) {
            if (type === "box") {
                for (let i = 0; i < users[username].game.inventory.boxes.length; i++) {
                    if (users[username].game.inventory.boxes[i].rarity === rarity) {
                        users[username].game.inventory.boxes.splice(i, 1);
                        return true;
                    }
                }
            } else if (type === "vault") {
                if (users[username].game.inventory.vaults.length > 0) {
                    users[username].game.inventory.vaults.splice(0,1);
                    return true;
                }
            }
            return false;
        },
        cards: function(username, card, action) {
            if (action === "add") {
                users[username].game.inventory.cards.push(card);
            } else if (action === "remove") {
                for (let i = 0; i < users[username].game.inventory.cards.length; i++) {
                    activeCard = users[username].game.inventory.cards[i];
                    if (activeCard.first === card.first && activeCard.second === card.second && activeCard.silver === card.silver && activeCard.gold === card.gold) {
                        users[username].game.inventory.cards.splice(i, 1);
                        return true;
                    }
                }
                return false;
            }
        }
    },
    sessionids: {
        get: function() {
            return sessionids;
        },
        push: function(key_value, value) {
            sessionids[key_value] = value;
        }, 
        find: function(sessionid) {
            return sessionids[sessionid];
        },
        remove: function(sessionid) {
            delete sessionids[sessionid];
        }
    },
    trades: {
        get: function() {
            return trades;
        },
        push: function(value) {
            trades.push(value);
        }, 
        find: function() {

        }
    }
}