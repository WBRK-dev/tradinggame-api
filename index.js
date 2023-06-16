const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const postParser = require("./parsePostBody");

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(require('./asignDatabase.js'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.post('/user/signup', postParser, require('./user/signup.js'));
app.post('/user/signin', postParser, require('./user/signin.js'));
app.get('/user/signout', require('./user/signout.js'));
app.get('/user', require('./user/get.js'));

app.get('/user/freereward', require('./user/getfreereward.js'));
app.get('/user/freereward/claim', require('./user/claimfreereward.js'));

app.get('/user/credits', require('./user/credits.js'));
app.get('/user/collection', require('./user/collection.js'));


app.post('/boxes/buy', postParser, require('./boxes/buy.js'));
app.post('/boxes/open', postParser, require('./boxes/open.js'));





app.get('/test', (req, res) => {
    res.send({users: req.localdatabase.users.get(), sessionids: req.localdatabase.sessionids.get()})
})


module.exports = app;
// app.listen(8088, () =>
//     console.log(`Trading Game API listening on port 8088!`),
// );