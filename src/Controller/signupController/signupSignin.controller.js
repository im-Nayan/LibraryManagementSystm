const signModel = require('../../model/sign_Model/sign.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class Signcontroller {
    async signin(req, res) {
        try {
            // res.send('hellow world')
            res.render('signupAndSignin/signin')
        } catch (error) {
            console.log('signin render error', error);
        }
    }
    async signUp(req, res) {
        try {
            // res.send('hellow world')
            res.render('signupAndSignin/signup')
        } catch (error) {
            console.log('signup render error', error);

        }
    }
    async signup_post(req, res) {
        try {
            new signModel({
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: bcrypt.hashSync(req.body.password, 10)
            }).save().then(registerData => {
                // console.log('data register SuccessFully', registerData);
                req.flash('success', 'Register Successfull')

                res.redirect('/admin')

            }).catch(err => {
                console.log('data register Faild', err);
            })

        } catch (error) {
            console.log('signup_post error :', error);
        }
    }
    async signin_post(req, res) {
        try {
            const { email, password } = req.body;
            // console.log(req.body);

            signModel.findOne({ email, isDeleted: false }, (err, data) => {
                if (data) {
                    if (data.role === 'admin') {
                        const hashpass = data.password
                        const compare = bcrypt.compareSync(password, hashpass);
                        if (compare) {
                            const token = jwt.sign({ adminData: data }, 'ADMIN_TOKEN_KEY', { expiresIn: '60m' });
                            res.cookie('adminToken', token);
                            console.log('password compare success');
                            res.redirect('/admin/dashboard')
                        } else {
                            console.log('Password Doesn\'t Match');
                            req.flash('failed', 'Password Doesn\'t Match')

                            res.redirect('/admin/')
                        }
                    } else {
                        console.log('You are not Admin', err);
                        req.flash('failed', 'You are not Admin')
                        res.redirect('/admin')
                    }



                } else {
                    console.log('Email invallid', err);
                    req.flash('failed', 'Email invallid')
                    res.redirect('/admin')
                }
            })
        } catch (error) {
            console.log('signin_post error :', error);
        }
    }

    async logout(req, res) {
        res.clearCookie('adminToken')
        res.redirect('/admin')
    }
}

// EXPORTS CONTROLLER SECTION
module.exports = new Signcontroller();