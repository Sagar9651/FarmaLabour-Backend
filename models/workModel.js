const mongoose = require('mongoose');

const workSchema = mongoose.Schema({
    typeOfWork: {type: String},
    noOfLabour: {type: Number},
    workingDays: {type: Number},
    address: { type: String },
    fromDate: {type: Date},
    toDate: {type: Date},
    city: { type: String },
    state: {type: String},
    country: { type: String },
    zipCode: { type: Number },
    phoneNumber: { type: Number },
    pickUpService: {type: Boolean},
    pickUpLocation: {type: String},
    workingTime: {type: String},
    salary: {type: Number},
    isComplete: {type: Boolean},
    userId: {type: String},
    labourList: Array()
}, {
    timestamps: true
});

workSchema.set('toJSON',{
    virtuals: true,
    versionKey: false
});

module.exports =  mongoose.model('farmWork',workSchema);