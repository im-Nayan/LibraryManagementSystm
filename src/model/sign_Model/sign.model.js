const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const signSchema = new Schema({
    username: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phone: { type: String, require: true, },
    password: { type: String, require: true, },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    isDeleted: { type: Boolean, default: false },
})

const signModel = mongoose.model('admin', signSchema);

// EXPORTS SECTION
module.exports = signModel;