const express = require('express');
const LabourWorkModel = require('../models/labourWorkModel');
const releseLabour = require('../helpers/releaseLabour');
module.exports = {
    acceptWork,
    updateWorkHistory,
    deleteLabourWorkHistory,
    getLabourWorkHistory,
};

async function acceptWork(req, res, next) {

    const dataObj = await LabourWorkModel.find({ workId: req.body.workId, labourId: req.body.labourId });
    if (dataObj.length != 0) {
        res.status(409).json({ message: "Work Already Accepted" });
    } else {
        console.log(req.body);
        let LabourWork = new LabourWorkModel(req.body);
        LabourWork.save(function (err, data) {
            if (err) {
                res.json({ error: err });
            } else {
                res.json({ message: 'Work Accepted Successfully' });
                releseLabour.EngageLabour(req.body.labourId);   //update User(Labour) isAvailable = false
            }
        });
    }
}

async function updateWorkHistory(req, res, next) {
    await LabourWorkModel.findByIdAndUpdate(req.params.historyId, req.body, function (err) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ message: "Work History Updated Successfully" });
            if (req.body.isDone) {
                releseLabour.AvailLabour(req.body.workId, req.body.labourId);
            }
        }
    });
}

async function deleteLabourWorkHistory(req,res,next) {
    const workObj = await LabourWorkModel.findById(req.params.historyId);
    if (!workObj.isDone) {
        releseLabour.AvailLabour(workObj.workId, workObj.labourId);
    }
    await LabourWorkModel.findByIdAndDelete(req.params.historyId, function (err) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json({ message: "Work Deletd Successfully" });
        }
    });
}

async function getLabourWorkHistory(req, res, next) {
    await LabourWorkModel.find({ labourId: req.params.labourId }, function (err, work) {
        if (err) {
            res.json({ message: "work Not Found" });
        } else {
            res.json(work);
        }
    })
}