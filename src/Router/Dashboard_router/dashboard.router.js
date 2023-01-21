const express = require('express');
const multer = require('multer');
const response_post =  multer().any();
const dashboardController = require('../../Controller/Dashboard_controller/dashboard.controller')
const Auth = require('../../middileware/Dashboard_middilware/Auth.middilware');
const dashboardRoute = express.Router();




// GET METHODS
dashboardRoute.get('/dashboard',Auth.checkAuth,dashboardController.dashboard);
dashboardRoute.get('/allTransaction',Auth.checkAuth,dashboardController.allTransaction);
dashboardRoute.get('/userDelete/:id',Auth.checkAuth,dashboardController.userDelete);


//POST METHODS 




// EXPORTS SECTION
module.exports = dashboardRoute;