const express = require('express');
const userBookscontroller = require('../../controller/user_Books_controller/user_books.controller');
const { checkAuth } = require('../../middleware/auth/auth');

const userBookroute = express.Router();




// GET METHODS
userBookroute.get('/',userBookscontroller.index);
userBookroute.get('/collected_books',checkAuth,userBookscontroller.collected_books);


//POST METHODS 
userBookroute.post('/bookNow_post',checkAuth,userBookscontroller.bookNow_post);
userBookroute.post('/submit-book', checkAuth, userBookscontroller.submitBooks)




// EXPORTS SECTION
module.exports = userBookroute;