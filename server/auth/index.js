const { sign, verify } = require('jsonwebtoken');
const User = require('../models/User');

async function createToken(user_id) {
  try {

    const token = await sign({ user_id }, process.env.JWT_SECRET);

    return token;
  } catch (err) {
    console.log(err.message);
  }

}

async function authenticate({ req, res }) {
  const token = req.cookies.token;

  if (!token) return { res: res } // will be our context
  // if (!token) return { res } 

  try {
    const data = await verify(token, process.env.JWT_SECRET, {
      maxAge: '1hr'
    });

    const user = await User.findById(data.user_id).populate('orders');

    return { user: user, res: res }

  } catch (err) {
    console.log(err.message);
    return { res: res }
  }

}

module.exports = { createToken, authenticate };