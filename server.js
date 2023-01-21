const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const mongoose = require('mongoose');


const PORT = process.env.PORT || 3000
const app = express();

// SESSION SECTION
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'SESSION_SECRET_KEY',
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}))
app.use(cookieParser());
app.use(flash());

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', [__dirname + '/src/views',__dirname+'/webservices/views'])

global.moment = require('moment');


// ADMIN ROUTER SECTION
const signRouter = require('./src/Router/signRouter/signupSignin.router');
app.use('/admin', signRouter);

const dashboardRoute = require('./src/Router/Dashboard_router/dashboard.router');
app.use('/admin',dashboardRoute);

const bookRouter = require('./src/Router/books_router/books.router');
app.use('/admin',bookRouter);

// USER ROUTER SECTION
const user_sign_router = require('./webservices/router/user_sign_router/user_sign.route');
app.use(user_sign_router);

const user_books_router =require('./webservices/router/user_Books_router/user_Books.router');
app.use(user_books_router);


const DBdata = 'mongodb+srv://nayan:nayan123@cluster0.o2qoh.mongodb.net/library'
mongoose.set('strictQuery', false);
mongoose.connect(DBdata, { useNewUrlParser: true, useUnifiedTopology: true }).then(connectData => {
    console.log('Connect with Database');
    app.listen(PORT, function () {
        console.log('Express app running on port ' + PORT)
        console.log(`http://127.0.0.1:${PORT}/admin`)
    });
})