const User = require('../models/User');
const { verify } = require('jsonwebtoken');

const { createToken } = require('./helpers');

module.exports = {
  async register(req, res) {
    try {
      console.log(req.body)
      const user = await User.create(req.body);

      const token = await createToken(user._id);

      // Authenticate/Log In User
      res.cookie('token', token, {
        maxAge: 60 * 60 * 1000,     // 1 hour
        httpOnly: true,
        secure: process.env.PORT ? true : false
      });

      res.json(user);
    } catch (err) {
      let message;

      if (err.code === 11000) {
        message = 'That email address is already in use.'
      } else {
        message = err.message;
      }

      console.log(err.message);
      res.status(403).json({
        code: err.code,
        message
      })

    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(403).json({
      message: 'User with that email address not found.'
    })

    const pass_is_valid = await user.validatePass(password);

    if (!pass_is_valid) return res.status(403).json({
      message: 'Password is invalid.'
    })

    const token = await createToken(user._id);
    res.cookie('token', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true
    })

    res.json(user);
  },

  async protected(req, res) {
    console.log('user', req.user)
    res.json({
      user: req.user,
      authenticated: true
    });
  },

  async authenticate(req, res) {
    const token = req.cookies.token;

    if (!token) return res.json({ user: null })

    try {
      const data = await verify(token, process.env.JWT_SECRET, {
        maxAge: '1hr'
      });

      const user = await User.findById(data.user_id);

      res.json({ user });

    } catch (err) {
      console.log(err.message);
      res.status(401).json({
        user: null
      })
    }
  },

  async logout(req, res) {
    res.clearCookie('token');

    res.json({
      message: 'Logged out successfully!'
    });
  }
}