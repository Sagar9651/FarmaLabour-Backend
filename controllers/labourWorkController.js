const express = require('express');
const LabourWorkModel = require('../models/labourWorkModel');
const releseLabour = require('../helpers/releaseLabour');
module.exports = {
    acceptWork,
    updateWorkHistory,
    deleteLabourWorkHistory,
    getLabourWorkHistory,
};

// async function acceptWork(req, res, next) {

//     const dataObj = await LabourWorkModel.find({ workId: req.body.workId, labourId: req.body.labourId });
//     if (dataObj.length != 0) {
//         res.status(409).json({ message: "Work Already Accepted" });
//     } else {
//         console.log(req.body);
//         let LabourWork = new LabourWorkModel(req.body);
//         LabourWork.save(function (err, data) {
//             if (err) {
//                 res.json({ error: err });
//             } else {
//                 res.json({ message: 'Work Accepted Successfully' });
//                 releseLabour.EngageLabour(req.body.labourId);   //update User(Labour) isAvailable = false
//             }
//         });
//     }
// }

function acceptWork(req, res, next) {
    LabourWorkModel.find({ workId: req.body.workId, labourId: req.body.labourId })
        .then(dataObj => {
            if (dataObj.length != 0) {
                res.status(409).json({ message: "Work Already Accepted" });
            } else {
                let LabourWork = new LabourWorkModel(req.body);
                LabourWork.save()
                    .then(result => {
                        res.json({ message: 'Work Accepted Successfully', work: result });
                        releseLabour.EngageLabour(req.body.labourId);   //update User(Labour) isAvailable = false
                    })
                    .catch(error => { res.send(error) });
            }
        })
        .catch(err => { res.status(500).send(err) });
}

// async function updateWorkHistory(req, res, next) {
//     await LabourWorkModel.findByIdAndUpdate(req.params.historyId, req.body, function (err) {
//         if (err) {
//             res.json({ error: err });
//         } else {
//             res.json({ message: "Work History Updated Successfully" });
//             if (req.body.isDone) {
//                 releseLabour.AvailLabour(req.body.workId, req.body.labourId);
//             }
//         }
//     });
// }

function updateWorkHistory(req, res, next) {
    LabourWorkModel.findByIdAndUpdate(req.params.historyId, req.body)
        .then(result => {
            res.json({ message: "Work History Updated Successfully" });
            if (req.body.isDone) {
                releseLabour.AvailLabour(req.body.workId, req.body.labourId);
            }
        })
        .catch(err => res.status(500).send(err))
}

// async function deleteLabourWorkHistory(req,res,next) {
//     const workObj = await LabourWorkModel.findById(req.params.historyId);
//     if (!workObj.isDone) {
//         releseLabour.AvailLabour(workObj.workId, workObj.labourId);
//     }
//     await LabourWorkModel.findByIdAndDelete(req.params.historyId, function (err) {
//         if (err) {
//             res.json({ error: err });
//         } else {
//             res.json({ message: "Work Deletd Successfully" });
//         }
//     });
// }

function deleteLabourWorkHistory(req, res, next) {
    LabourWorkModel.findById(req.params.historyId)
        .then(workObj => {
            if(workObj != null) {
            if (!workObj.isDone) {
                releseLabour.AvailLabour(workObj.workId, workObj.labourId);
            }
            LabourWorkModel.findByIdAndRemove(req.params.historyId)
                .then(result => {
                    if (!result) {
                        res.send({ message: "Work Can not be deleted" });
                    } else {
                        res.send({ message: "Work Deletd Successfully" });
                    }
                })
                .catch(err => { res.send(err || { message: 'Record Not Available' }) });
            } else {
                res.send({ message: "There is no similar record found,Work Can not be deleted" });
            }
        })
        .catch(error => {
            res.status(500).send({ message: error })
        });
}

// async function getLabourWorkHistory(req, res, next) {
//     await LabourWorkModel.find({ labourId: req.params.labourId }, function (err, work) {
//         if (err) {
//             res.json({ message: "work Not Found" });
//         } else {
//             res.json(work);
//         }
//     })
// }

function getLabourWorkHistory(req, res, next) {
    LabourWorkModel.find({ labourId: req.params.labourId })
        .then(result => {
            if (result.length != 0) {
                res.send(result);
            } else {
                res.json({ message: 'History not found' });
            }
        })
        .catch(err => { res.status(500).send(err) });
}