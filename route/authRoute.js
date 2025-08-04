const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Basic input validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Mock user validation (replace with real database logic)
  let user = { username, role: 'user' }; // Default role is 'user'

  // Example: Hardcoded admin check (replace with your logic)
  if (username === 'admin' && password === 'admin123') {
    user = { username, role: 'admin' }; // Assign admin role
  } else {
    // Simulate a failed login for non-admin users (replace with database check)
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;