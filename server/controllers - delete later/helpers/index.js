const { sign, verify } = require('jsonwebtoken');
const User = require('../../models/User');

async function createToken(user_id) {
  try {
    const token = await sign({ user_id }, process.env.JWT_SECRET);

    return token;
  } catch (err) {
    console.log(err.message);
  }

}

async function isAuthenticate(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({
    message: 'Not Authorized!'
  })

  try {
    const data = await verify(token, process.env.JWT_SECRET, {
      maxAge: '1hr'
    });

    req.user = await User.findById(data.user_id);

    next();

  } catch (err) {
    console.log(err.message);
    res.status(401).json({
      message: 'Your token is invalid'
    })
  }

}

module.exports = { createToken, isAuthenticate };