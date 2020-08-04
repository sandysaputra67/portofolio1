const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = async (req, res, next) => {
  try {
    const sign_token = {
      issuer: 'contoh.com',
      subject: 'contoh.com',
      algorithm: 'HS256', // algoritma encryption
      expiresIn: '1d', // token expired 1 hari
      audience: 'http://contoh.com',
    }
    const data = await jwt.verify(req.headers.authorization, process.env.JWT_SECRET, sign_token);
    return next();
  } catch (err) {
    return res.status(400).send({
      message: err.message
    })
  }
}
