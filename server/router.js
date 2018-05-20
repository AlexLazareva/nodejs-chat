'use strict';

const UsersModel = require('./models/users.model');
const _ = require('lodash');

function checkAuth(req, res, next) {
    passport.authenticate('jwt', {session: false}, (err, decryptToken, jwtError) => {
        if(jwtError != void(0) || err != void(0)) return res.render('index.html', {error: err || jwtError});
        req.user = decryptToken;
        next();
    })(req, res, next);
}

module.exports = app => {
    app.use('/assets', express.static('./client/public'));

    app.get('/', checkAuth, (req, res) => {
        res.render('index.html', {date: new Date()});
    });

    app.post('/login', (req, res) => {

    });

    app.post('/register', async (req, res) => {
        try {
            let user = await UsersModel.findOne({username: {$regex: _.escapeRegExp(req.body.name), $options: "i"}}).lean().exec();
            if(user != void(0)) return res.status(400).send({message: "User already exist"});

            user = await UsersModel.create({
                username: req.body.username,
                password: req.body.password
            });

            res.status(200).send({message: "User create!"});

        } catch (e) {
            console.error("Error, register", e);
        }
    });
};


