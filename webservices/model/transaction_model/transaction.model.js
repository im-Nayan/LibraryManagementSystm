const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bookingSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId,ref:'user', require: true },
    book_id: { type: Schema.Types.ObjectId,ref:'books', require: true },
    bookDate: { type: Date, require: true, default: new Date },
    book_submit_Date: { type: Date, require: true ,default:null },
    isDeleted: { type: Boolean, default: false },
})


const bookingModel = mongoose.model('transaction', bookingSchema);


// EXPORTS SECTION
module.exports = bookingModel;