const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const booksSchema = new Schema({
name :{type:String,require:true},
author :{type:String,require:true},
quantity :{type:Number,require:true},
status :{type:Boolean,default:true},
isDeleted :{type:Boolean,default:false},

}) 


const booksModel = mongoose.model('books',booksSchema);


// EXPORTS SECTION
module.exports = booksModel;