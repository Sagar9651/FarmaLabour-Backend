const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String },
    emailId: { type: String },
    password: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: Number },
    country: { type: String },
    isLabour: { type: Boolean },
    rating: { type: String },
    review: { type: String },
    isAvailable: { type: Boolean },
    phoneNumber: { type: Number },
    address: { type: String },
}, {
    timestamps: true
});

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false
});

module.exports = mongoose.model('Users', userSchema);