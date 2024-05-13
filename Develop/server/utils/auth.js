const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function (req, res, next) {
    // Check for the Authorization header in GraphQL requests
    let token = req.body.variables.token || req.headers.authorization;

    // Extract the token value if it's in the Authorization header format
    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trim();
    }

    // Verify if token exists
    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // Verify token and extract user data from it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.log('Invalid token:', err.message);
      return res.status(400).json({ message: 'Invalid token!' });
    }

    // Proceed to the next middleware or endpoint
    next();
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
