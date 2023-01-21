const bcrypt = require('bcryptjs');
const userSignModel = require('../../model/user_sign_model/user_sign.model');
const jwt = require('jsonwebtoken');


class userSignController {
  async signup(req, res) {
    res.render('user_sign/register', { err: 0, success: 0 })
  }
  async signin(req, res) {
    res.render('user_sign/login', { err: 0, success: 0 })
  }

  async signup_post(req, res) {
    new userSignModel({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: bcrypt.hashSync(req.body.password, 10)
    }).save().then(registerData => {
      // console.log('data register SuccessFully', registerData);
      req.flash('success', 'Register Successfull')

      res.redirect('/signin')

    }).catch(err => {
      console.log('data register Faild', err);
    })
  }

  async signin_post(req, res) {
    const { email, password } = req.body;

    userSignModel.findOne({ email: email, isDeleted: false }, (err, data) => {
      if (data) {
        const hashpass = data.password
        const compare = bcrypt.compareSync(password, hashpass);
        if (compare) {
          const token = jwt.sign({
            id: data._id,
            username: data.username,
            email: data.email
          }, 'USER_TOKEN_KEY', { expiresIn: '60m' })
          res.cookie('userToken', token);
          console.log('password compare success');
          res.redirect('/')
        } else {
          req.flash('error', 'Possword Doesn\'t Match');
          console.log('Possword Doesn\'t Match');
          res.redirect('/signin')
        }
      } else {
        req.flash('error', 'User not found');
        console.log('User not found', err);
        res.redirect('/signin')
      }
    })
  }

  async logout(req, res) {
    res.clearCookie('userToken')
    res.redirect('/')
  }
}

// EXPORTS SECTION
module.exports = new userSignController();