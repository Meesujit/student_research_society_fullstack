const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


require('dotenv').config();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const JWT_SECRET_KEY = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate a JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET_KEY, 
      { expiresIn: '7d' });

    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);    
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the login is for the admin
    if (email === ADMIN_EMAIL) {
      if (password !== ADMIN_PASSWORD) {
        return res.status(400).json({ message: 'Invalid Admin credentials' });
      }

      // Create token for the admin
      const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET_KEY, { expiresIn: '7d' });

      return res.json({
        user: { email: ADMIN_EMAIL, role: 'admin' },
        token,
      });
    }

    // Check for regular user login
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      id: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '7d' });

    return res.json({
      user: { id: user._id, email: user.email, role: 'user' },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};



exports.getProfile = async (req, res) => {
  try {
    // console.log('User info from req:', req.user); // Log the user information
    
    if (!req.user) {
      return res.status(401).json({ message: 'No user information found' });
    }
    const { role, id } = req.user;


    if (role === 'admin') {
      return res.json({
        profile: {
          name: 'Admin',
          email: process.env.ADMIN_EMAIL,
          role: 'admin',
        },
      });
    }

    // Fetch regular user profile
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ profile: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

