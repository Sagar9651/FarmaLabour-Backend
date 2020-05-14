const mongoose = require('mongoose');

const LabourWorkSchema = mongoose.Schema({
    workId: { type: String },
    isDone: { type: Boolean },
    farmerId: { type: String },
    labourId: { type: String },
}, {
    timestamps: true
});

LabourWorkSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

module.exports = mongoose.model('labourWorkHistories', LabourWorkSchema);