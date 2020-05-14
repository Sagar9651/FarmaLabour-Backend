const mongoose = require('mongoose');

/**
 * @swagger
 * definitions:
 *   Users:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       emailId:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       city:
 *         type: string
 *       state:
 *         type: string
 *       zipCode:
 *         type: integer
 *       country:
 *          type: string
 *      isLabour:
 *          type: boolean
 *      rating: 
 *          type: string
 *      review:
 *          type: string
 *      isAvailable:
 *          type: boolean
 *      phoneNumber:
 *          type: integer
 *      address:
 *          type: string
 *       required:
 *         - emailId
 *         - password
 */

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