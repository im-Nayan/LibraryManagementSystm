const signModel = require('../../model/sign_Model/sign.model');


exports.check = (req, res, next) => {
    const { username, name, email, phone, password, confirmpass } = req.body;
    // console.log(req.body);
    signModel.findOne({ email }, (err, data) => {
        if (data) {
            if (data.email == email && data.phone == phone) {

                console.log('This email and Phone Number are Already Exist');
                req.flash('failed', 'This email and Phone are Already Exist');

                return (res.redirect('/admin/signUp'));
            } else {
                console.log('This email is Already Exist');
                req.flash('failed', 'This email is Already Exist');

                return (res.redirect('/admin/signUp'));
            }
        }
    })
    signModel.findOne({ phone }, (err, data) => {
        if (data) {
            if (data.email == email && data.phone == phone) {

                console.log('This email and Phone Number are Already Exist');
                req.flash('failed', 'This email and Phone are Already Exist');

                return (res.redirect('/admin/signUp'));
            } else {
                console.log('Phone No is Already Exist');
                req.flash('failed', 'Phone No is Already Exist');

                return (res.redirect('/admin/signUp'));
            }
        }
    })

    if (!username) {
        console.log("Please Enter First Name");
        req.flash('failed', "Please Enter First Name");
        res.redirect('/admin/signUp');
        return;
    }
    if (!name) {
        console.log("Please Enter Name");
        req.flash('failed', "Please Enter Name");
        res.redirect('/admin/signUp');
        return;

    }
    if (!email) {
        console.log("Please Enter email");
        req.flash('failed', "Please Enter email");
        res.redirect('/admin/signUp');
        return;
    }
    if (!phone) {
        console.log("Please Enter phone");
        req.flash('failed', "Please Enter phone");
        res.redirect('/admin/signUp');
        return;
    }
    if (!password) {
        console.log("Please Enter Password");
        req.flash('failed', "Please Enter Password");
        res.redirect('/admin/signUp');
        return;
    }
    if (!confirmpass) {
        console.log("Please Enter Re_password");
        req.flash('failed', "Please Enter Re_password");
        res.redirect('/admin/signUp');
        return;
    }
    if (password != confirmpass) {
        console.log("Password or Confirm Password Doesn\'t Match");
        req.flash('failed', "Password or Confirm Password Doesn\'t Match");
        res.redirect('/admin/signUp');
        return;
    }
    next();
}


exports.signInCheck = (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        console.log("Please Enter email");
        req.flash('failed', "Please Enter email");
        res.redirect('/admin');
        return;
    }
    if (!password) {
        console.log("Please Enter Password");
        req.flash('failed', "Please Enter Password");
        res.redirect('/admin');
        return;
    }
    next();
}