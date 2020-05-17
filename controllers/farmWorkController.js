const express = require('express');
const WorkModel = require('../models/workModel');
const releseLabour = require('../helpers/releaseLabour');
// const userModel = require('../models/userModel');
module.exports = {
    addWork,
    updateWork,
    deleteWork,
    getWorkHistory,
    getWorkHistoryById
};

// async function addWork(req, res, next) {
//     console.log(req.body);
//     let farmaWork = new WorkModel(req.body);
//     farmaWork.save(function (err, data) {
//         if (err) {
//             res.json({ error: err });
//         } else {
//             res.json({ message: 'Work Registered Successfully' });
//         }
//     });
// }

function addWork(req, res, next) {
    let farmaWork = new WorkModel(req.body);
    farmaWork.save()
        .then(result => {
            res.json({
                message: 'Work Added Successfully',
                status: 'Success',
                Work: result
            });
        })
        .catch(err => { res.status(500).send(err) });
}

// async function updateWork(req, res, next) {
//     await WorkModel.findByIdAndUpdate(req.params.workId, req.body, function (err) {
//         if (err) {
//             res.json({ error: err });
//         } else {
//             res.json({ message: "Work Updated Successfully" });
//             if (req.body.isComplete) {
//                 req.body.labourList.forEach(element => {
//                     releseLabour.AvailLabour(workObj.id, element);
//                 });
//             }
//         }
//     });
// }

function updateWork(req, res, next) {
    WorkModel.findByIdAndUpdate(req.params.workId, req.body)
        .then(result => {
            if (result) {
                res.json({ message: "Work Updated Successfully" });
                if (req.body.isComplete) {
                    req.body.labourList.forEach(element => {
                        releseLabour.AvailLabour(workObj.id, element);
                    });
                }
            } else {
                res.send({ message: "Work Can not be Updated" });
            }
        })
        .catch(err => { res.status(500).send(err) });
}

// async function deleteWork(req, res, next) {
//     const workObj = await WorkModel.findById(req.params.workId);
//     if (!workObj.isComplete) {
//         workObj.labourList.forEach(element => {
//             releseLabour.AvailLabour(workObj.id, element);
//         });
//     }
//     await WorkModel.findByIdAndDelete(req.params.workId, function (err) {
//         if (err) {
//             res.json({ error: err });
//         } else {
//             res.json({ message: "Work Deletd Successfully" });
//         }
//     })
// }

function deleteWork(req, res, next) {
    WorkModel.findById(req.params.workId)
        .then(workObj => {
            if (workObj != null) {
                if (!workObj.isComplete) {
                    workObj.labourList.forEach(element => {
                        releseLabour.AvailLabour(workObj.id, element);
                    });
                }
                WorkModel.findByIdAndDelete(req.params.workId)
                    .then(result => {
                        res.send({ message: 'Work Deleted Successfully' });
                    })
                    .catch(err => { res.status(500).send(err) });
            } else {
                res.send({ message: 'Work can not be delted' });
            }
        })
        .catch(error => { res.status(500).send(error) });
}

// async function getWorkHistory(req, res, next) {
//     await WorkModel.find({ userId: req.params.userId }, function (err, work) {
//         if (err) {
//             res.json({ message: "work Not Found" });
//         } else {
//             res.json(work);
//         }
//     })
// }

function getWorkHistory(req, res, next) {
    WorkModel.find({ userId: req.params.userId })
        .then(result => {
            if (result.length != 0) {
                res.send(result);
            } else {
                res.send({ message: 'Work Not Found' });
            }
        })
        .catch(err => { res.status(500).send(err) });
}

// async function getWorkHistoryById(req, res, next) {
//     await WorkModel.findById(req.body.workId, function (err, work) {
//         if (err) {
//             res.json({ message: "work Not Found" });
//         } else {
//             res.json(work);
//         }
//     })
// }

function getWorkHistoryById(req, res, next) {
    WorkModel.findById(req.body.workId)
        .then(result => {
            if (result) {
                res.send(result);
            } else {
                res.send({ message: 'Work Not Found' });
            }
        })
        .catch(err => { res.status(500).send(err) });
}

// async function getWorkHistory(req, res, next) {
//     const workData = await WorkModel.find({ userId: req.params.userId });
//     const listoflabours = [];
//     if (workData.length != 0) {
//         workData.every(x => {
//             x.labourList.forEach(res => {
//                 listoflabours.push({ id: res });
//             });
//         })
//     }
//     getUserData(listoflabours, workData).then(re => {
//         res.json(re);
//     })
// }

// function getUserData(listoflabours, workData) {
//     const userData = [];
//     return new Promise(function (resolve, reject) {
//         userModel.findById(listoflabours[0].id, function (err, data) {
//             userData.push(data);
//             console.log("usersdata", userData);
//             console.log(listoflabours);
//             workData[0].labourList = userData;
//             resolve(workData);
//         }).select('-password');
//     })
// }