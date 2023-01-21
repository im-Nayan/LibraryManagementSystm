const express = require('express');
const signController = require('../../Controller/signupController/signupSignin.controller');
const sign_middileware = require('../../middileware/signMiddilware/signUp_signIn.middilware');
const multer = require('multer');
const response_post = multer().any()
const signRoute = express.Router();




// GET METHODS
signRoute.get('/', signController.signin);
signRoute.get('/signUp', signController.signUp);
signRoute.get('/logout', signController.logout);


//POST METHODS 
signRoute.post('/signup_post',response_post,sign_middileware.check,signController.signup_post);
signRoute.post('/signin_post',response_post,sign_middileware.signInCheck,signController.signin_post);




// EXPORTS SECTION
module.exports = signRoute;