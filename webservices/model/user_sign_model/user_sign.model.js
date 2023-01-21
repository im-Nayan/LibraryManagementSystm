const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: true, },
    password: { type: String, require: true, },
    role: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false, enum: [true, false] },

})


const userModel = mongoose.model('user', userSchema);


// EXPORTS SECTION
module.exports = userModel;