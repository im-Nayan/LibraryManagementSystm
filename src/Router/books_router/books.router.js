const express = require('express');
const bookController = require('../../Controller/books_controller/books.controller');
const Auth = require('../../middileware/Dashboard_middilware/Auth.middilware');
const multer = require('multer');
const response_post = multer().any();
const bookRoute = express.Router();




// GET METHODS
bookRoute.get('/bookstable',Auth.checkAuth,bookController.bookstable)
bookRoute.get('/books_add',Auth.checkAuth,bookController.books_add)
bookRoute.get('/book_edit/:id',Auth.checkAuth,bookController.book_edit)
bookRoute.get('/book_delete/:id',Auth.checkAuth,bookController.book_delete)


//POST METHODS 
bookRoute.post('/book_add_post',response_post,Auth.checkAuth,bookController.book_add_post)
bookRoute.post('/book_edit_post',response_post,Auth.checkAuth,bookController.book_edit_post)




// EXPORTS SECTION
module.exports = bookRoute;