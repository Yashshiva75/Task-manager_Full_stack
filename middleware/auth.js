const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // 1. Get the token from the header
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ error: 'Access denied. No token provided.' });

    const token = authHeader.split(' ')[1]; // Removes the word "Bearer"

    try {
        // 2. Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Add the user's ID to the request
        next(); // Move on to the next function
    } catch (err) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;