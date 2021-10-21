var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const config = require("../config");
const db = require("../models");
const User = db.user;


exports.signup = (req, res) => {
    const user = new User({
        email: req.body.email,
        name: req.body.name,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        res.status(200).send({
            success: true
        });
    });
};

exports.signin = (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user._id,
                email: user.email,
                name: user.name,
                lastName: user.lastName,
                accessToken: token
            });
        });
};