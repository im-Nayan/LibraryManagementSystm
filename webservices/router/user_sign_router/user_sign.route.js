const express = require('express');
const userSigcontroller = require('../../controller/user_sing_condroller/user_sign.controller');
const multer = require('multer');
const response_post = multer().any();
const userSignroute = express.Router();




// GET METHODS
userSignroute.get('/signup',userSigcontroller.signup)
userSignroute.get('/signin',userSigcontroller.signin)
userSignroute.get('/logout',userSigcontroller.logout)


//POST METHODS 
userSignroute.post('/signup_post',response_post,userSigcontroller.signup_post)
userSignroute.post('/signin_post',response_post,userSigcontroller.signin_post)





// EXPORTS SECTION
module.exports = userSignroute;