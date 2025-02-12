const jwt = require('jsonwebtoken');
const User = require('../model/User');

// Login controller function
const login = async (req, res) => {
    const { username, password } = req.query; // Use req.query to get parameters

    try {
        // Find user by username
        const user = await User.findOne({ username });

        // If no user found
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Check if passwords match (plain text comparison - not secure)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, 'yourSecretKey', { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Login successful',
            token, // Now token is defined and sent in the response
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



const user = async (req, res) => {
    try {
        const users = await User.find();  // Fetch all users from the database
        res.status(200).json(users);  // Return the users as a JSON response
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err });
    }
};

module.exports = { login,user };
