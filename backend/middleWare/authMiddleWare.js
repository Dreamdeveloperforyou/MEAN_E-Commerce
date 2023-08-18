const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Add the decoded user object to the request object
        req.user = decoded;

        // Call the next middleware function
        return next();
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = authMiddleware; 