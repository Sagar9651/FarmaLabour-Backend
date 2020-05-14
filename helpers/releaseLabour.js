const WorkModel = require('../models/workModel');
const userModel = require('../models/userModel');

module.exports = {
    AvailLabour,
    EngageLabour
}

async function AvailLabour( workId, LabourId) {

    const work = await WorkModel.findById(workId);
    let labour = [];
    if (work.labourList.length != 0) {
        labour = work.labourList.filter(x => x != LabourId);
    }
    work.labourList = labour;

    await WorkModel.findByIdAndUpdate(workId, work);

    const userObj = await userModel.findById(LabourId);

    userObj.isAvailable = true;

    await userModel.findByIdAndUpdate(LabourId, userObj);
}

async function EngageLabour(LabourId) {

    const userObj = await userModel.findById(LabourId);

    userObj.isAvailable = false;

    await userModel.findByIdAndUpdate(LabourId, userObj);
}