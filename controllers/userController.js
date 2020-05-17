const express = require('express');
const router = express.Router();
const config = require('../helpers/config.json');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = {
    authenticate,
    getUserData,
    register,
    updateProfile,
    getAllLabours,
    getAllFarmer
};

// --Authentication Using Async await--//
// async function authenticate(req, res, next) {
//     const user = await userModel.findOne({ emailId: req.body.emailId });
//     if (!user) {
//         res.status(404).json({ message: 'User Not Found' });
//     } else {
//         const match = await bcrypt.compare(req.body.password, user.password);
//         if (match) {
//             const token = jwt.sign({ sub: user.id, email: user.emailId }, config.secret);
//             // const { password, ...userWithoutPassword } = user;
//             // res.json(...userWithoutPassword);
//             res.json({ user, token });
//         } else {
//             res.json({ message: 'Password Incorrect' });
//         }
//     }
// }

//-- Authentication--//
function authenticate(req, res, next) {
    userModel.findOne({ emailId: req.body.emailId })
        .then(user => {
            if (!user) {
                res.status(404).send({ message: 'User Not Found' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(match => {
                        if (match) {
                            const token = jwt.sign({ userId: user.id, email: user.emailId }, config.secret);
                            // const { password, ...userWithoutPassword } = user;
                            // res.json(...userWithoutPassword);
                            res.send({ user, token });
                        } else {
                            res.status(401).send({ message: 'Password Incorrect' });
                        }
                    })
                    .catch(err => { res.status(500).send(err) });
            }
        })
        .catch(err => { res.status(500).send(err) });
}

//--Get Users async await--//
// async function getUserData(req, res, next) {
//     await userModel.findById(req.params.userId, function (err, user) {
//         if (err) {
//             res.json({ message: "User Not Found" });
//         } else {
//             res.json(user);
//         }
//     }).select('-password')
// }

//--get users--//
function getUserData(req, res, next) {
    userModel.findById(req.params.userId).select('-password')
        .then(result => {
            if (!result) {
                res.json({ message: 'User Not Found' });
            } else {
                res.json(result);
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        })
}

//-- Register user--//
// async function register(req, res, next) {
//     console.log(req.body);
//     let profileRes = new userModel(req.body);
//     bcrypt.hash(req.body.password, 10).then(hash => {
//         profileRes.password = hash;
//         profileRes.save(function (err, data) {
//             if (err) {
//                 res.json({ error: err });
//             } else {
//                 res.json({ message: 'User Registered Successfully' });
//             }
//         });
//     });
// }

//---Register User--//
function register(req, res, next) {
    let profileRes = new userModel(req.body);
    bcrypt.hash(req.body.password, 10).then(hash => {
        profileRes.password = hash;
        profileRes.save()
            .then(result => {
                res.status(200).send({
                    status: "Success",
                    message: "User registered successfully!!!",
                    data: {
                        User: result
                    }
                });
            })
            .catch(err => {
                res.status(500).json(err);
            })
    });
}

// async function updateProfile(req, res, next) {
//     await userModel.findByIdAndUpdate(req.params.userId, req.body, function (err) {
//         if (err) {
//             res.json({ error: err });
//         } else {
//             res.json({ message: "Profile Updated Successfully" });
//         }
//     });
// }

//---Update User --//
function updateProfile(req, res, next) {
    if (!req.body) {
        res.json({ message: 'Data to update can not be empty!' })
    }
    userModel.findByIdAndUpdate(req.params.userId, req.body)
        .then(result => {
            if (!result) {
                res.status(404).send({
                    message: `Cannot update Profile with id=${req.params.userId}. Maybe Profile was not found!`
                });
            } else {
                res.json({ message: "Profile Updated successfully" });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

// async function getAllLabours(req, res, next) {
//     await userModel.find({ isLabour: true, isAvailable: true }, function (err, user) {
//         if (err) {
//             res.json({ message: "User Not Found" });
//         } else {
//             res.json(user);
//         }
//     }).select('-password')
// }

//---Get all Labours---//
function getAllLabours(req, res, next) {
    userModel.find({ isLabour: true, isAvailable: true }).select('-password')
        .then(result => {
            if (result.length != 0) {
                res.json(result);
            } else {
                res.json({ message: "Labour Not Found" });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

// async function getAllFarmer(req, res, next) {
//     await userModel.find({ isLabour: false }, function (err, user) {
//         if (err) {
//             res.json({ message: "User Not Found" });
//         } else {
//             res.json(user);
//         }
//     }).select('-password')
// }

//----Get All Farmers ---//
function getAllFarmer(req, res, next) {
    userModel.find({ isLabour: false }).select('-password')
        .then(result => {
            if (result.length != 0) {
                res.json(result)
            }
            else {
                res.json({ message: 'Farmers Not Found' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        });
}